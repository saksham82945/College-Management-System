import { Response, Request } from 'express';
import { Book } from '../models/Book';
import { AppError } from '../utils/errors';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 25;
    const skip = (page - 1) * size;

    const books = await Book.find()
      .skip(skip)
      .limit(size)
      .lean();

    const total = await Book.countDocuments();

    res.json({
      data: {
        total,
        page,
        size,
        books: books.map((b: any) => ({
          id: b._id,
          isbn: b.isbn,
          title: b.title,
          author: b.author,
          publisher: b.publisher,
          copiesTotal: b.copiesTotal,
          copiesAvailable: b.copiesAvailable,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).lean();

    if (!book) {
      throw new AppError('Book not found', 404, 'BOOK_NOT_FOUND');
    }

    res.json({ data: book });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { isbn, title, author, publisher, copiesTotal, category } = req.body;

    const book = await Book.create({
      isbn,
      title,
      author,
      publisher,
      copiesTotal,
      copiesAvailable: copiesTotal,
      category,
    });

    res.status(201).json({
      message: 'Book created successfully',
      data: { id: book._id, isbn: book.isbn },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'ISBN already exists', errorCode: 'ISBN_EXISTS' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const book = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new AppError('Book not found', 404, 'BOOK_NOT_FOUND');
    }

    res.json({
      message: 'Book updated successfully',
      data: { id: book._id },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      throw new AppError('Book not found', 404, 'BOOK_NOT_FOUND');
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
