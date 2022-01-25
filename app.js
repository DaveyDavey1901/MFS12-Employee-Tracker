const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "#",
  password: "#",
  database: "employeesDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Welcome you are now connected to the Employee Database");
});

// This function i used to prompt the user to choose from a list of options.

const adminOption = () => {
  inquirer.prompt({
    name: "Admin",
    type: "list",
    message: "Please select an action to perform from the Employee Database.",
    choices: [
      "View all departments",
      "View all roles",
      "View aLL employees",
      //"View all employees by manager",
      //"view all employees by department",
      "Add a department",
      "Add a role",
      "Add a employee",
      "Update a employee role",
      //"Update an employee managers",
      //"Delete a department",
      //"Delete a role",
      //"Delete a employee",
      //"Department budget",
    ],
  });
};

adminOption();
