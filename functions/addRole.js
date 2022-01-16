const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const viewRole = require("./viewRole");
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
function addRole() {
  const sqlDept = `SELECT * FROM department;`;
  db.query(sqlDept, function (err, data) {
    if (err) throw err;
    var myData = data.map(({ name, id }) => ({ name: name, value: id }));
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter the name of the new role",
          name: "roleName",
        },
        {
          type: "input",
          message: "Please enter the salary of the new role",
          name: "salary",
        },
        {
          type: "list",
          message: "Please select which department the new role with be in",
          choices: myData,
          name: "deptName",
        },
      ])
      .then(function (response) {
        const roleTitle = response.roleName;
        const salaryName = response.salary;
        const departmentName = response.deptName;
        const parameters = [roleTitle, salaryName, departmentName];
        const sql = `INSERT INTO role(title, salary, department_id)
    VALUES(?, ?, ?)`;
        db.query(sql, parameters, function (err) {
          if (err) throw err;
          console.log("Added " + roleTitle + " to Roles!");
          viewRole();
        });
      });
  });
}

module.exports = addRole;
