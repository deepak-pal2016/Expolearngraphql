const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authore: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  coverimage: {
    type: String,
    default: "",
  },
  genre: [
    {
      type: String,
    },
  ],
  language: {
    type: String,
    default: "English",
  },
  isbn: {
    type: String,
    default: "",
  },
  publisher: {
    type: String,
    default: "",
  },
  publishedDate: {
    type: String,
    default: "",
  },
  pages: {
    type: Number,
    default: "",
  },
  pages: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalreviews: {
    type: Number,
    default: 0,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
},
{timestamps:true});

module.exports = mongoose.model('Book',bookSchema)
