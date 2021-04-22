import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: String,
  ingress: String,
  text: String,
  date: { type: Date, default: Date.now },
});

const article = mongoose.model('Article', articleSchema);

export default article;
