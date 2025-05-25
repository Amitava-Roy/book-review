// const ResponseDto = require("../utils/ResponseDto");
const User = require("../models/userModel");
// const asyncHandler = require("../utils/createAsync");
// const jwt = require("jsonwebtoken");
// const AppError = require("../utils/AppError");

const factory = require("../utils/factory");

exports.getAllUsers = factory.getAllDoc(User);

exports.getUser = factory.getOneDoc(User);

exports.updateUser = factory.updateOne(User);
