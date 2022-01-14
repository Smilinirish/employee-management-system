const db = require('../server');

function viewEmp() {
  // formatted table with employee info including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  db.query(
    `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
   FROM employee JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
    function (err, res) {
      if (err)
        throw err;

      console.log(cTable.getTable(res));
      start();
    }
  );
}

module.exports = viewEmp
