const express = require("express");
const bookController = require("../controllers/bookController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

const bookMiddleware = (req, res, next) => {
  req.body.author = req.user.id;
  next();
};

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(
    protect,
    restrictTo("admin"),
    bookMiddleware,
    bookController.createBook
  );

router.route("/:id").get(bookController.getBook);

module.exports = router;
