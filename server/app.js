// Cargando dependencias
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Cargando la instancia de express
const app = express();

// Importando webpack y middleware relacionado
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
// Importando configuración de webpack
const webpackConfig = require('../webpack.dev.config');

const nodeEnvironment = process.env.NODE_ENV || 'production';

// Decidiendo si agregar el middleware de webpack o no
if (nodeEnvironment === 'development') {
  // Iniciar el servidor de desarrollo de Webpack
  console.log('🛠️ Ejecutando en modo desarrollo');
  // Agregando la clave "mode" con su valor "development"
  webpackConfig.mode = nodeEnvironment;
  // Estableciendo el puerto del servidor de desarrollo a la misma
  // valor que el servidor express
  webpackConfig.devServer.port = process.env.PORT;
  // Configurando el HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    ...webpackConfig.entry,
  ];
  // Agregando el plugin a la configuración de desarrollo de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creando el compilador de webpack
  const compiler = webpack(webpackConfig);
  // Habilitando el middleware de webpack
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  // Habilitando el HMR de webpack
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('🏭 Ejecutando en modo producción 🏭');
}

// Configurando el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Estableciendo middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
// Activa el enrutador de usuarios cuando se solicita el recurso '/users'
app.use('/users', usersRouter);

// Captura 404 y reenvía al controlador de errores
app.use((req, res, next) => {
  next(createError(404));
});

// Controlador de errores
app.use((err, req, res) => {
  // Estableciendo las variables locales, solo proporcionando errores en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
