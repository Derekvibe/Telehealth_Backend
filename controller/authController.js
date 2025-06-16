const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const generateOtp = require("../utils/generateOtp");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email")


const { StreamChat } = require("stream-chat");
const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

// Helper function to sign JWT
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};


//create token and cookies

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

//function to create the token
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  //function to generate the cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httponly: true,
    secure: process.env.NODE_ENV === "production", //only secure in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
  user.passwordConfirm = undefined;
  user.otp = undefined;

  //Stream Token Generation
  const streamToken = streamClient.createToken(user._id.toString());

  //structure of the cookie response when sent to the user
  res.status(statusCode).json({
    status: "success",
    message,
    token,
    streamToken,
    data: {
      user: {
        id: user._id.toString(),
        name: user.username,
      },
    },
  });
};


//signup functionality

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, username } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return next(new AppError("Email already registered", 400));

  const otp = generateOtp();

  const otpExpires = Date.now() + 24 * 60 * 60 * 1000; //when thhe otp will expire (1 day)

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    otp,
    otpExpires,
  });

  //configure email sending functionality

  try {
    await sendEmail({
      email: newUser.email,
      subject: "OTP for email Verification",
      html: `<h1>Your OTP is : ${otp}</h1>`,
    });

    createSendToken(newUser, 200, res, "Registration successful");
  } catch (error) {
    console.error("Email send error:", error);
    await User.findByIdAndDelete(newUser.id);
    return next(
      new AppError("There is an error sending the email. Try again", 500)
    );
  }
});

//To verify the OTP sent to the email
exports.verifyAccount = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new AppError("Email and OTP are required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found with this email", 404));
  }

  if (user.otp !== otp) {
    return next(new AppError("Invalid OTP", 400));
  }

  if (Date.now() > user.otpExpires) {
    return next(
      new AppError("OTP has expired. Please request a new OTP.", 400)
    );
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save({ validateBeforeSave: false });

  // ✅ Optionally return a response without logging in
  res.status(200).json({
    status: "success",
    message: "Email has been verified",
  });
});



//Creating a resend OTP functionality
exports.resendOTP = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required to resend OTP", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("This account is already verified", 400));
  }

  const newOtp = generateOtp();
  user.otp = newOtp;
  user.otpExpires = Date.now() + 24 * 60 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Resend OTP for email verification",
      html: `<h1>Your new OTP is: ${newOtp}</h1>`,
    });

    res.status(200).json({
      status: "success",
      message: "A new OTP has been sent successfully to your email",
    });
  } catch (error) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Please try again later.",
        500
      )
    );
  }
});

//Creating a Login function

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Validate email & password presence
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2. Check if user exists and include password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3. Create JWT token
  const token = signToken(user._id);

  // 4. Configure cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) || 90) *
          24 *
          60 *
          60 *
          1000
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: process.env.NODE_ENV === "production" ?
    //  "None" : "Lax",

    //set to false during or for local HTTP and cross-origin
    secure: false,
    sameSite: "Lax",
  };

  // 5. Send cookie
  res.cookie("token", token, cookieOptions);

  // 6. Generate Stream token
  await streamClient.upsertUser({
    id: user._id.toString(),
    name: user.username,
  });
  const streamToken = streamClient.createToken(user._id.toString());

  // 7. Remove sensitive fields
  user.password = undefined;

  // 8. Return response
  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
    user: {
      id: user._id.toString(),
      name: user.username,
    },
    streamToken,
  });
});



//creating a log out function
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});



//forgetpassword function
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });


  if (!user) {
    return next(new AppError('No user found', 404));
  }

  const otp = generateOtp();

  user.resetPasswordOTP = otp;
  user.resetPasswordOTPExpires = Date.now() + 300000; // 5mins


  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password Reset Otp (valid for 5min)",
      html: `<h1>Your password reset Otp : ${otp}</h1>`
    });
    
    res.status(200).json({
      status: 'success',
      message: "Password reset otp has been sent to your email",
    });
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(
      "There was an error sending the email. Please try again later"
    ));
  }


});


//reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password, passwordConfirm } = req.body;

  const users = await User.find({ email });
  // console.log("Users with that email:", users);

  const user = await User.findOne({
    email,
    resetPasswordOTP: otp,
    resetPasswordOTPExpires: { $gt: Date.now() },
  });
  
  // console.log({ email, otp });
  // console.log(("User found?", user))

  if (!user) return next(new AppError("No user found", 400));

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpires = undefined;


  await user.save();

  createSendToken(user, 200, res, "Password reset Successfully");
})