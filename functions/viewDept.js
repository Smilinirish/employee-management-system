const db = require('../server');

function viewDept() {
  // Query database
  db.query("SELECT * FROM department;", function (err, res) {
    if (err)
      throw err;

    console.log(cTable.getTable(res));
    start();
  });
}

module.exports = viewDept
