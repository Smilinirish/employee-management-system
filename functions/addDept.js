const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();
const viewDept = require("./viewDept");
const start = require("./start");
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const addDept = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the name of the department\n",
        name: "name",
      },
    ])
    .then((answer) => {
      const newName = answer.name;
      const sql = `INSERT INTO department (name) VALUES(?);`;
      db.query(sql, newName, function (err, res) {
        if (err) throw err;
      });
    });
};

module.exports = addDept;
