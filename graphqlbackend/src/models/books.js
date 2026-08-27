const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
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

    genre: {
      type: String,
      default: "",
    },

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

    // 👇 Chapters isi Book document ke andar
    chapters: [
      {
        chapterNumber: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
          trim: true,
        },

        content: {
          type: String,
          required: true,
          default: "",
        },

        pages: {
          type: Number,
          default: 0,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
