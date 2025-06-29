const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../model/userModel");
const promisify = require("util");

const isAuthenticated = catchAsync(async (req, res, next) => {
  let token;

  // 1. Retrieve token from cookies or Authorization header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in. Please log in to access this resource.",
        401
      )
    );
  }

  // 3. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      new AppError("Invalid or expired token. Please log in again.", 401)
    );
  }

  // 4. Check token payload integrity
  if (!decoded._id || !decoded.name) {
    return next(
      new AppError("Invalid token payload. Missing user information.", 401)
    );
  }

  // 5. Confirm user still exists in database
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError("User linked to this token no longer exists.", 401)
    );
  }

  // 6. Attach user info to request
  req.user = currentUser;
  req.user = {
    _id: currentUser._id,
    name: currentUser.name,
  };

  next();
});

module.exports = isAuthenticated;
