const viewRole = require("./viewRole");
const viewEmp = require("./viewEmp");
const viewDept = require("./viewDept");
const addDept = require("./addDept");
const addEmp = require("./addEmp");
const addRole = require("./addRole");
const updateEmpRole = require("./updateEmpRole");
const inquirer = require("inquirer");
require("dotenv").config();

const start = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Main Menu",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
      name: "choices",
    })
    .then((data) => {
      switch (data.choices) {
        case "View all departments":
          viewDept().then(() => start());
          break;
        case "View all roles":
          viewRole().then(() => start());
          break;
        case "View all employees":
          viewEmp().then(() => start());
          break;
        case "Add a department":
          addDept().then(() => start());
          break;
        case "Add a role":
          addRole().then(() => start());
          break;
        case "Add an employee":
          addEmp().then(() => start());
          break;
        case "Update an employee role":
          updateEmpRole().then(() => start());
          break;
      }
    });
};

start();

module.exports = start;
