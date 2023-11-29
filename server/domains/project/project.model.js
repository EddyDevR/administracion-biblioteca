// Importando mongoose
import mongoose from 'mongoose';
// Desestructurando la fn Schema
const { Schema } = mongoose;

// Construir un Schema = elemento que describe la forma de mis datos
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Compilando el Schema para generar un modelo
export default mongoose.model('project', ProjectSchema);
