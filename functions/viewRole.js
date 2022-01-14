const db = require('../server');

function viewRole() {
  // presented with the job title, role id, the department that role belongs to, and the salary for that role
  // Query database
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;",
    function (err, res) {
      if (err)
        throw err;

      console.log(cTable.getTable(res));
      start();
    }
  );
}

module.exports = viewRole
