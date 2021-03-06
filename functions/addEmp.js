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
const addEmp = async () => {
  const roleSql = `SELECT role.id, role.title FROM role`;
  db.query(roleSql, (err, data) => {
    if (err) throw err;
    const myRole = data.map(({ id, title }) => ({ name: title, value: id }));
    const managerSql = `SELECT * FROM employee`;
    db.query(managerSql, (err, res) => {
      if (err) throw err;
      console.log(res);
      const myManager = res.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
      console.log(myManager);

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?\n",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?\n",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's role?\n",
            choices: myRole,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?\n",
            choices: myManager,
          },
        ])
        .then((response) => {
          const firstName = response.firstName;
          const lastName = response.lastName;
          const empRole = response.role;
          const empManager = response.manager;
          const parameter = [firstName, lastName, empRole, empManager];
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
     VALUES (?, ?, ?, ?)`;
          db.query(sql, parameter, (err, res) => {
            if (err) throw err;
            console.log("Employee has been added!");
            viewEmp();
          });
        });
    });
  });
};

module.exports = addEmp;
