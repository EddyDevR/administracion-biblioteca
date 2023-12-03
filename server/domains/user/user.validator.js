import * as Yup from 'yup';

// Crear un esquema de validación
const signUpSchema = Yup.object().shape({
  nombre: Yup.string().required('Se requiere ingresar nombre'),
  matricula: Yup.number().required('Se requiere ingresar matricula'),
  grado: Yup.string().required('Se requiere ingresar semestre'),
  seccion: Yup.string().required('Se requiere ingresar carrera'),
  correo: Yup.string()
    .email()
    .required('Se requiere ingresar un correo valido'),
  contrasena: Yup.string()
    .min(6)
    .required('Se requiere ingresar password de al menos 6 caracteres'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'El password de confirmación no coincide',
  ),
});

const signUpGetter = (req) => {
  // Desestructuramos la informacion
  const { nombre, matricula, grado, seccion, correo, contrasena, cpassword } =
    req.body;
  // Se regresa el objeto signup
  return {
    nombre,
    matricula,
    grado,
    seccion,
    correo,
    contrasena,
    cpassword,
  };
};

const signUp = {
  schema: signUpSchema,
  getObject: signUpGetter,
};

export default { signUp };
