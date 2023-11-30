import log from '../../config/winston';

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
const registerPost = (req, res) => {
  log.info('Se procesa formulario de registro');
  res.json({
    message: 'Se procesa formulario de registro',
    data: req.body,
  });
};

// Controlador user
export default {
  // Action Methods
  login,
  logout,
  register,
  registerPost,
};
