import express, { Request, Response } from "express";
import { Book } from "../../models/bookModel";

const router = express.Router();

interface RequestWithIdParam extends Request {
  params: {
    id: string;
  };
}
interface BookBody {
  title: string;
  author: string;
  publishYear: number;
}

// Route to add a new Book
router.post("/", async (req: Request<{}, {}, BookBody>, res: Response) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Required field is missing",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route to get all books
router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route to get a book by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route to update a book by id
router.put("/:id", async (req: RequestWithIdParam, res: Response) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Required field is missing",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Route to delete a book by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

export default router;
