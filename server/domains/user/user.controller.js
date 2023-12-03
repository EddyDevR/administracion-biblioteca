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

// GET "/user/edit/:id"
const editUser = async (req, res) => {
  // Se extrae el id de los parámetros
  const { id } = req.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del usuario con el id: ${id}`);
    // Se busca el proyecto en la base de datos
    const user = await User.findOne({ _id: id }).lean().exec();
    if (user === null) {
      log.info(`No se encontro el usuario con el id: ${id}`);
      return res
        .status(404)
        .json({ fail: `No se encontro el usuario con el id: ${id}` });
    }
    log.info(`Usuario encontrado con el id: ${id}`);
    return res.render('user/editUsers', { user });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de user.controller');
    return res.status(500).json(error);
  }
};

// PUT "/user/edit/:id"
const editPutUser = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación de usuario con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: user } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('user/editUsers', { user, errorModel });
  }
  // Si no hay error
  const user = await User.findOne({ _id: id });
  if (user === null) {
    log.info(`No se encontro documento para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro documento para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newUser } = req;
  user.nombre = newUser.nombre;
  user.matricula = newUser.matricula;
  user.grado = newUser.grado;
  user.seccion = newUser.seccion;
  user.correo = newUser.correo;
  user.contrasena = newUser.contrasena;
  try {
    // Se salvan los cambios
    log.info(`Actualizando libro con id: ${id}`);
    await user.save();
    // Generando mensaje FLASH
    req.flash('successMessage', 'Libro editado con exito');
    return res.redirect(`/user/editUsers/${id}`);
  } catch (error) {
    log.error(`Error al actualizar libro con id: ${id}`);
    return res.status(500).json(error);
  }
};

// Controlador user
export default {
  // Action Methods
  login,
  logout,
  register,
  registerPost,
  showUsers,
  editUser,
  editPutUser,
};
