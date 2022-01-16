const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const viewEmp = require("./viewEmp");
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
function updateEmpRole() {
  const empSql = `SELECT * From employee`;
  db.query(empSql, (err, res) => {
    if (err) throw err;
    const empUpdate = res.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: empUpdate,
        },
      ])
      .then(function (response) {
        const empName = response.name;
        const roleSql = `SELECT * FROM role`;
        db.query(roleSql, (err, res) => {
          if (err) throw err;
          const roleUpdate = res.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roleUpdate,
              },
            ])
            .then(function (response1) {
              const empRole = response1.role;
              const parameter = [empRole, empName];
              console.log(parameter);
              const updateSql = `UPDATE employee SET role_id= ? WHERE id = ?`;
              db.query(updateSql, parameter, (err, res) => {
                if (err) throw err;
                console.log("Employee has been updated!");
                viewEmp();
              });
            });
        });
      });
  });
}

module.exports = updateEmpRole;
