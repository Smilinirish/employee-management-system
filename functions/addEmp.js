const db = require('../server');

function addEmp() {
  //let's grab the roles from role table
  const roleSql = `SELECT role.id, role.title FROM role`;
  db.query(roleSql, function (err, data) {
    if (err)
      throw err;
    // console.log(data)
    const myRole = data.map(({ id, title }) => ({ name: title, value: id }));
    // console.log(myRole)
    //lets grab the manager first and last name from the employee table
    const managerSql = `SELECT * FROM employee`;
    db.query(managerSql, function (err, res) {
      if (err)
        throw err;
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
            choices: myRole,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: myManager,
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
            if (err)
              throw err;
            console.log("Employee has been added!");
            // console.log(res)
            viewEmp();
          });
        });
    });
  });
}

module.exports = addEmp
