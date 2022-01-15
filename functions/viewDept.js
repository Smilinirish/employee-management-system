const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const start = require('./start');
const inquirer = require("inquirer");
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
);
function viewDept() {
  // Query database
  db.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;

    console.log(cTable.getTable(res));
    inquirer
      .prompt({
        type: 'list',
        message:'return to menu or exit',
        choices:[
          'yes',
          'exit'
        ],
        name:'choice'
      })
      .then((data)=>{
        switch (data.choice) {
          case 'yes':
            start();
            break;
        }
      })
  });
}

module.exports = viewDept