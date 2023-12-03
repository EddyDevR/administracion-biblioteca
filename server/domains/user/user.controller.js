import log from '../../config/winston';
import User from './user.model';

// Actions methods
// GET "/user/login"
const login = (req, res) => {
  // Sirve el formulario de login
  log.info('Se entrega formulario de login');
  res.render('user/login');
};

// GET "/user/logout"
const logout = (req, res) => {
  res.send('⚠️ UNDER CONSTRUCTION: GET /user/logout ⚠️');
};

// GET "/user/register"
const register = (req, res) => {
  log.info('Se entrega formulario de registro');
  res.render('user/register');
};

// POST '/user/register'
const registerPost = async (req, res) => {
  const { validData: userFormData, errorData } = req;
  log.info('Se procesa formulario de registro');
  // Verificando si hay errores
  if (errorData) {
    return res.json(errorData);
  }
  // En caso de no haber errores, se crea el usuario
  try {
    // 1. Se crea una instancia del modelo User
    // mendiante la funcion create del modelo
    const user = await User.create(userFormData);
    log.info(`Usuario creado: ${JSON.stringify(user)}`);
    // 3. Se contesta al cliente con el usuario creado
    return res.render('user/register');
  } catch (error) {
    log.error(error.message);
    return res.json({
      message: error.message,
      name: error.name,
      errors: error.errors,
    });
  }
};

const showUsers = async (req, res) => {
  const { nombre } = req.query;
  const usuarios = await User.find({ nombre: nombre })
    .select('nombre matricula grado seccion correo')
    .lean()
    .exec();
  // Se entrega la vista dashboardView con el viewmodel projects
  res.render('user/showUsers', { users: usuarios });
};

// Controlador user
export default {
  // Action Methods
  login,
  logout,
  register,
  registerPost,
  showUsers,
};
