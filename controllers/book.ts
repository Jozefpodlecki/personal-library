import Book from '../models/book'
import { Types } from 'mongoose';

const getBooks = (req, res) => {
  
  
  Book.find({}, (err, docs) => {
    
    const result = docs.map(({_id, title}) => ({
      _id,
      title
    }))
    
    res.json(result);
  });
}

const getBook = (req, res, next) => {
  const { id } = req.params;
  let _id = null;
  
  try {
    _id = Types.ObjectId(id);
    
  } catch(error) {
    return res.json(error);
  }
  
  Book.findById(_id, (err, book) => {
    
    if(err) {
      res.send('no book exists');
    }
    
    res.json(book)
  });
}

const createBook = (req, res, next) => {
  const { title } = req.body;
  
  if(!title) {
    return res.send('missing title');
  }
  
  const book = new Book({
    title
  })
  
  book.save((err, doc) => {
    if(err) {
      return next(err)
    }
    
    return res.json(book);
  })
}

const addComment = (req, res) => {
  const { id } = req.params;
  const _id = Types.ObjectId(id);
  const { comment } = req.body;
  
  Book.findByIdAndUpdate(_id, {
    $push: {
      comments: comment 
    }
  }, {
    safe: true
  },  (err, result) => {
    res.json(result.value);
  });
}

const deleteBook = (req, res) => {
  const { id } = req.params;
  const _id = Types.ObjectId(id);
  
  Book.findOneAndDelete({
    _id
  }, (err, result) => {
          
    res.send("delete successful");
  });  
}

const deleteBooks = (req, res) => {
  Book.collection.drop();
  res.send("complete delete successful");
}

export default {
  getBooks,
  getBook,
  addComment,
  createBook,
  deleteBook,
  deleteBooks
}