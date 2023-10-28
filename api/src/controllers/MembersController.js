import Book from "../model/BooksModel.js";
import Member from "../model/MembersModel.js";

export const getMember = async (req, res) => {
  try {
    const response = await Member.findAll({
      include: {
        model: Book,
        required: false,
        as: "books",
      },
      attributes: ["code", "name"],
    });

    res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

export const borrowBooks = async (req, res) => {
  const { memberCode, bookCode } = req.params;

  try {
    const member = await Member.findByPk(memberCode);
    const book = await Book.findByPk(bookCode);

    if (!member && !book)
      return res.status(404).json({ message: "Member or book not found" });
    if (book.stock == 0) return res.status(404).json({ message: "Stock out" });

    const borrowedBooks = await member.getBooks();
    if (borrowedBooks.length < 2 && member.penalty === 0) {
      let stock = book.stock - 1;
      await book.update({ memberCode: memberCode, stock: stock });
      res.status(200).json({ message: "Book borrowed successfully." });
    } else {
      res
        .status(400)
        .json({ message: "Members may not borrow more than 2 books" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const returnBooks = async (req, res) => {
  const { memberCode, bookCode } = req.params;

  try {
    const member = await Member.findByPk(memberCode);
    const book = await Book.findByPk(bookCode);

    if (!member && !book)
      return res.status(404).json({ message: "Member or book not found" });

    const borrowedBooks = await member.getBooks();
    for (const borrowedBook of borrowedBooks) {
      if (borrowedBook.code === book.code) {
        let stock = book.stock + 1;
        await book.update({ memberCode: null, stock: stock });
        const currentDate = new Date();
        if (currentDate - borrowedBook.createdAt > 7 * 24 * 60 * 60 * 1000) {
          member.penalty = 3;
        }
        await member.save();
        res.status(200).json({ message: "Book returned successfully." });
        return;
      }
    }
    res
      .status(400)
      .json({ message: "Book not found in member's borrowed books." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
