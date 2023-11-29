// Actions methods

// GET /project/projects
//  GET /project/dashboard

const showDashboard = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/project/projects' '/project/dashboar'  🚧");
};

// GET /project/add-form
// GET /project/add

const addForm = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/project/add-form' '/project/add'  🚧");
};

// GET /project/about

const about = (req, res) => {
  res.render('home/aboutView', { appVersion: '1.0.0' });
};

// Controlador Home
export default {
  showDashboard,
  addForm,
  about,
};
