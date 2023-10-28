import Book from "../model/BooksModel.js";

export const getBooks = async (req, res) => {
  try {
    const response = await Book.findAll({
      where: {
        stock: 1,
      },
      attributes: ["code", "title", "author", "stock"],
    });

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};
