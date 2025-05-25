const express = require("express");

const userRouter = require("./routes/userRoute");
const bookRouter = require("./routes/bookRoute");
const reviewRouter = require("./routes/reviewRoute");

const cors = require("cors");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./golobalErrorHandler");

const app = express();

//Body parser
app.use(express.json());

//Cors middleware
app.use(cors());

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/reviews", reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
