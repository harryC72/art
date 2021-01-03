import mongoose from 'mongoose';
var Schema = mongoose.Schema;

let artPieceSchema = new Schema({
  title: String,
  alt: String,
  technique: String,
  file: String,
});

const artPiece = mongoose.model('ArtPiece', artPieceSchema);

export default artPiece;
