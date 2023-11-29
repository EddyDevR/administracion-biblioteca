// Importando el DotEnv
import dotenv from 'dotenv';

// Invocación a la función config de la instancia dotenv
dotenv.config();

console.log(process.env.PORT);

// Creando objetos de configuración
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  IP: process.env.IP || '0.0.0.0',
};

const devConfig = {
  DEV_VALUE: 100,
};

const testConfig = {
  TEST_VALUE: 200,
};

const prodConfig = {
  PROD_VALUE: 300,
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
      break;
  }
  return {};
}

// Exportar el objeto de configuración
export default {
  ...defaultConfig,
  ...getEnvConfig(process.env.NODE_ENV),
};
