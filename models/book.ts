import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const books = new Schema ({
  title: {
    type: String,
    required: true,
    maxlength: [40, 'issue title too long']
  },
  comments: {
    type: [String],
  }
});

export default mongoose.model('books', books);