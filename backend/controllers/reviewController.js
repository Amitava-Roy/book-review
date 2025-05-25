const Review = require("../models/reviewModel");
const AppError = require("../utils/AppError");
const ResponseDto = require("../utils/ResponseDto");
const asyncHandler = require("../utils/createAsync");

exports.createReview = asyncHandler(async (req, res, next) => {
  let resBody;
  req.body.user = req.user.id;

  resBody = await Review.create(req.body);

  if (!resBody) return next(new AppError("Could not make changes", 500));
  res.status(200).json(new ResponseDto("success", 1, resBody));
});

exports.getBookReview = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find().populate("user").sort("-createdAt");

  if (!reviews)
    return next(new AppError("Can't find book with the given id", 404));

  res.status(200).json(new ResponseDto("Review fetched", 1, reviews));
});
