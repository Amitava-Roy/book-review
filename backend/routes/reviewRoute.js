const express = require("express");
const reviewController = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(reviewController.getBookReview)
  .post(protect, reviewController.createReview);

module.exports = router;
