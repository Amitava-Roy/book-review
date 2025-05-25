const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signUp", authController.signUP);
router.post("/signIn", authController.signIn);

router
  .route("/:id")
  .get(userController.getUser)
  .post(userController.updateUser);

module.exports = router;
