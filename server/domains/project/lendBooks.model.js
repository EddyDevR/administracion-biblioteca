import mongoose from 'mongoose';

const { Schema } = mongoose;
const LendSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  copias_disponibles: {
    type: Number,
    required: true,
  },
});
export default mongoose.model('lends', LendSchema);
