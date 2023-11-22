//cargando dependencias 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('app-dwpcii:server');

// cargando la instacion de express
var app = express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Setting Webpack Modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importing webpack configuration
import webpackConfig from '../webpack.dev.config';

const nodeEnviroment = process.env.NODE_ENV || 'production'

// Deciding if we add webpack middleware or not
if (nodeEnviroment === 'development') {
  // Start Webpack dev server
  console.log("🛠️  Ejecutando en modo desarrollo");
  // Adding the key "mode" with its value "development"
  webpackConfig.mode = nodeEnviroment;
  // Setting the dev server port to the same value as the express server
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ];
  // Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // Enabling the webpack middleware
  app.use(WebpackDevMiddleware(bundle, {
    publicPath: webpackConfig.output.publicPath
  }));
  //  Enabling the webpack HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log("🏭 Ejecutando en modo producción 🏭");
}


// configurando el motor de plantillas 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// se establecen los middlewares 
// es una funcion que recibe un res y req 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
//activa users router cuando se solicita el recurso '/users'
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
