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
  inquirer
    .prompt({
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
        "Add an employee",
        "Update a employee role",
        //"Update an employee managers",
        //"Delete a department",
        //"Delete a role",
        //"Delete a employee",
        //"Department budget",
        "Exit",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.Admin) {
        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all employees":
          viewAllEmpEmployees();
          break;

        // case "View all employees by manager":
        //   viewAllEmpbyManager();
        //   break;

        // case "View all employees by department":
        //   viewAllEmpByDepartment();
        //   break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee's role":
          updateEmployeeRole();
          break;

        // case "Update an employee managers":
        //   updateEmpManager();
        //   break;

        // case "Delete a department":
        //   deleteDepartment();
        //   break;

        // case "Delete an role":
        //   deleteRole();
        //   break;

        // case "Delete an employee":
        //   deleteEmployee();
        //   break;

        // case "Department budget":
        //   departmentBudget();
        //   break;

        case "Exit":
          exitApp();
          break;

        default:
          break;
      }
    });
};

async function viewAllDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments: ", res);
    adminOption();
  });
}


adminOption();
