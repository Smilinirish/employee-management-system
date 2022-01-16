const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const start = require("./start");
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
function viewEmp() {
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
      if (err) throw err;

      console.log(cTable.getTable(res));
      inquirer
        .prompt({
          type: "list",
          message: "return to menu or exit",
          choices: ["yes", "exit"],
          name: "choice",
        })
        .then((data) => {
          switch (data.choice) {
            case "yes":
              start();
              break;
          }
        });
    }
  );
}

module.exports = viewEmp;
