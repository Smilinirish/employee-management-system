const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const viewRole = async () => {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;",
    function (err, res) {
      if (err) throw err;

      console.log(cTable.getTable(res));
    }
  );
};

module.exports = viewRole;
