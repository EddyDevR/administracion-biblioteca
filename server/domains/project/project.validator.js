// Importando biblioteca de validacion
import * as Yup from 'yup';

// Creando un esquema de validación para el proyecto
const projectSchema = Yup.object().shape({
  titulo: Yup.string().required('Se requiere un titulo'),
  autor: Yup.string().required('Se requiere un autor'),
  categoria: Yup.string().required('Se requiere una categoria'),
  isbn: Yup.string().required('Se requiere un ISBN'),
  copias_disponibles: Yup.string().required('Se requiere copias disponibles'),
});

// Middleware de extracción
// Creando el extractor de datos de la petición
const getProject = (req) => {
  // Extrayendo datos de la petición
  const { titulo, autor, categoria, isbn, copias_disponibles } = req.body;
  // Regresando el objeto proyecto
  return {
    titulo,
    autor,
    categoria,
    isbn,
    copias_disponibles,
  };
};

export default {
  projectSchema,
  getProject,
};
