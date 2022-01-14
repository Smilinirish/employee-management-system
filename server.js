const express = require("express");
// import express from "express";
const mysql = require("mysql2");
// import mysql from "mysql2";
const inquirer = require("inquirer");
// import inquirer from "inquirer";
const cTable = require("console.table");
// import cTable from "console.table";
// import dotevn from "dotenv";
// dotevn.config();
// require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// import { viewRole } from "./functions/viewRole.js";
const viewRole = require("./functions/viewRole");
// import { viewEmp } from "./functions/viewEmp.js";
const viewEmp = require("./functions/viewEmp");
const viewDept = require("./functions/viewDept");
// import { addDept } from "./functions/addDept.js";
const addDept = require("./functions/addDept");
// import { addEmp } from "./functions/addEmp.js";
const addEmp = require("./functions/addEmp");
// import { addRole } from "./functions/addRole.js";
const addRole = require("./functions/addRole");
// import { updateEmpRole } from "./functions/updateEmpRole.js";
const updateEmpRole = require("./functions/updateEmpRole");

function start() {
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

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  start()
);


module.exports = db