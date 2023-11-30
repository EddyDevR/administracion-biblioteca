// cargando los estilos
/* eslint-disable no-console */
import './styles/style.css';
/* eslint-disable */
// Importandoe Estilos de Materialize CSS
import 'materialize-css/dist/css/materialize.css';
// Importando scripts de Materialize
import 'materialize-css/dist/js/materialize';
/* eslint-enable */

// Script para borrar proyecto
import deleteProject from './domains/project.dashboard';

// Inicializando Scripts de Materialize para interactividad
M.AutoInit();

// Cargando script en caso de que la URL sea '/project/dashboard'
if (window.location.pathname === '/project/showDashboard') {
  window.deleteProject = deleteProject;
}

console.log('Webpack Working Middleware!!! 📦');
