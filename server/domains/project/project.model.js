// Importando Mongoose
import mongoose from 'mongoose';
// Desestructurando un generador de Schemas de mongoose
const { Schema } = mongoose;

// Creando el esquema
const ProjectSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  categoria: {
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

// Exportando la compilacon de ProjectSchema
// en un modelo de mongoose
export default mongoose.model('libros', ProjectSchema);
