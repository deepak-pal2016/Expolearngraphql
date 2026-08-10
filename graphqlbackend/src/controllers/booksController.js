const Book = require("../models/books");

const addbooks = async (req, res) => {
  try {
    const {
      title,
      author,
      descripion,
      coverimage,
      genre,
      language,
      isbn,
      publisher,
      publishedDate,
      pages,
      rating,
      totalreviews,
      isTrending,
      isPopular,
    } = req.body;
    if (!title || !title) {
      return res.status(400).json({
        success: false,
        message: "Title and author are required..",
      });
    }
    const book = await Book.crate({
      title,
      author,
      descripion,
      coverimage,
      genre,
      language,
      isbn,
      publisher,
      publishedDate,
      pages,
      rating,
      totalreviews,
      isTrending,
      isPopular,
    });

    return res.status(200).json({
      success: true,
      messsage: "Book added successfully...",
    });
  } catch (error) {
    console.error("Add Book Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
};

module.exports = {addbooks}
