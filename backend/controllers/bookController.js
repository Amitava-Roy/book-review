const Book = require("../models/bookModel");
const factory = require("../utils/factory");

exports.createBook = factory.makeOne(Book);

exports.getAllBooks = factory.getAllDoc(Book);

exports.getBook = factory.getOneDoc(Book);
