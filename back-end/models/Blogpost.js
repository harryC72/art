import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let blogpostSchema = new Schema({
  title: String,
  ingress: String,
  text: String,
  date: { type: Date, default: Date.now },
});

const blogpost = mongoose.model('Blogpost', blogpostSchema);

export default blogpost;
