const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRouters");
const StreamRoutes = require("./routes/streamRoutes");

const app = express();

// Enable CORS for frontend + credentials (cookies)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://telehealth-frontend.vercel.app",
    ], // frontend origin
    credentials: true, // required to receive/set cookies
  })
);

// Body parser (limit helps prevent DOS attacks)
app.use(express.json({ limit: "10kb" }));

// Parse cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/stream", StreamRoutes);

//Catch unknown routes
app.all("/{*any}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // this will handle the error and send the error response to the user
});

app.use(globalErrorHandler); //this also handles the error and send the error response to the user

module.exports = app;
