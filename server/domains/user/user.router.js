// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import userController from './user.controller';

// Importando el factory de validación
import ValidateFactory from '../../services/validateFactory';

// Importando el validador del usuario
import userValidator from './user.validator';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET '/user/login'
router.get('/login', userController.login);

// GET '/user/logout'
router.get('/logout', userController.logout);

// GET '/user/register'
router.get('/register', userController.register);

// POST '/user/register'
router.post(
  '/register',
  ValidateFactory(userValidator.signUp),
  userController.registerPost,
);

// GET /user/author
router.get('/showUsers', userController.showUsers);

// GET "/user/edit/:id"
router.get('/editUsers/:id', userController.editUser);

// PUT "/user/edit/:id"
router.put(
  '/editUsers/:id',
  ValidateFactory({
    schema: userValidator.projectSchema,
    getObject: userValidator.getProject,
  }),
  userController.editPutUser,
);

// Exporto este tramo de ruta
export default router;
