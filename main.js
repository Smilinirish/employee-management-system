const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  start()
);

function start() {
  inquirer
    .prompt({
      type: "list",
      message: "Main Menu",
      choices: [
        "Add department",
        "Add employee",
        "Add role",
        "Update employee role",
        "View all departments",
        "View all employees",
        "View all roles",
        "Exit",
      ],
      name: "choices",
    })
    .then((data) => {
      switch (data.choices) {
        case "View all departments":
          viewDept();
          break;
        case "View all roles":
          viewRole();
          break;
        case "View all employees":
          viewEmp();
          break;
        case "Add a department":
          addDept();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmp();
          break;
        case "Update an employee role":
          updateEmpRole();
          break;
      }
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the name of the department",
        name: "name",
      },
    ])
    .then(function (answer) {
      const depName = answer.name;
      const sql = `INSERT INTO department (name) VALUES(?);`;
      db.query(sql, depName, function (err, res) {
        if (err) throw err;
        console.log(cTable.getTable(res));
        viewDept();
      });
    });
}

function addEmp() {
  const roleSql = `SELECT role.id, role.title FROM role`;
  db.query(roleSql, function (err, data) {
    if (err) throw err;
    const role = data.map(({ id, title }) => ({ name: title, value: id }));
    const managerSql = `SELECT * FROM employee`;
    db.query(managerSql, function (err, res) {
      if (err) throw err;
      console.log(res);
      const manager = res.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
      console.log(manager);

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: role,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: manager,
          },
        ])
        .then(function (response) {
          const firstName = response.firstName;
          const lastName = response.lastName;
          const empRole = response.role;
          const empManager = response.manager;
          const parameter = [firstName, lastName, empRole, empManager];
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
       VALUES (?, ?, ?, ?)`;
          db.query(sql, parameter, function (err, res) {
            if (err) throw err;
            console.log("Employee added!");
            viewEmp();
          });
        });
    });
  });
}

function addRole() {
  const sqlDept = `SELECT * FROM department;`;
  db.query(sqlDept, function (err, data) {
    if (err) throw err;
    let newData = data.map(({ name, id }) => ({ name: name, value: id }));
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name of the new role",
          name: "roleName",
        },
        {
          type: "input",
          message: "Salary of the new role",
          name: "salary",
        },
        {
          type: "list",
          message: "department",
          choices: newData,
          name: "deptName",
        },
      ])
      .then(function (response) {
        const role = response.roleName;
        const salary = response.salary;
        const dept = response.deptName;
        const parameters = [role, salary, dept];
        const sql = `INSERT INTO role(title, salary, department_id)
      VALUES(?, ?, ?)`;
        db.query(sql, parameters, function (err) {
          if (err) throw err;
          console.log("Added " + role + " to Roles!");
          viewRole();
        });
      });
  });
}

function updateEmpRole() {
  const empSql = `SELECT * From employee`;
  db.query(empSql, (err, res) => {
    if (err) throw err;
    const empUpdate = res.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt(console.log(empUpdate), [
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

                viewEmployees();
              });
            });
        });
      });
  });
}

function viewDept() {
  db.query("SELECT * FROM department;", function (err, res) {
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
  });
}

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

function viewRole() {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;",
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
