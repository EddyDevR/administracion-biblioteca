// Importando el paquete Dotenv
import dotenv from 'dotenv';

// Con esta función se cargan las variables
// de entorno, un aspecto importante es que en
// caso de no existir el archivo ".env" esta
// carga falla de manera silenciosa
dotenv.config();

console.log(process.env.PORT);

// Creando objetos de configuracion
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  IP: process.env.IP || '0.0.0.0',
};
// projnotes_dev
const devConfig = {
  MONGO_URL: process.env.DEV_DATABASE_URL,
};

const testConfig = {
  TEST_VALUE: 200,
};

const prodConfig = {
  MONGO_URL: process.env.PROD_DATABASE_URL,
};

// Creando una función selectora
function getEnvConfig(env) {
  switch (env) {
    case 'production':
      return prodConfig;
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return devConfig;
  }
}

// Exportar el Objeto de configuracion

export default {
  ...defaultConfig,
  ...getEnvConfig(process.env.NODE_ENV),
};
