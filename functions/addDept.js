const db = require('../server');

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
      const newName = answer.name;
      const sql = `INSERT INTO department (name) VALUES(?);`;
      db.query(sql, newName, function (err, res) {
        if (err)
          throw err;
        console.log(cTable.getTable(res));
        viewDept();
      });
    });
}

module.exports = addDept;
