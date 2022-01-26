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
      type: "list",
      message:
        "Please select an action to perform from the Employee Database.\n",
      name: "Admin",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        //"View all employees by manager",
        //"view all employees by department",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update a employee role",
        //"Update an employee managers",
        //"Delete a department",
        //"Delete a role",
        "Delete a employee",
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
          viewAllEmployees();
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

// View section departmetns / roles / employees

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    adminOption();
  });
}

function viewAllRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    adminOption();
  });
}

function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    adminOption();
  });
}

// Add new department / role / employee

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the new department name?",
      name: "department",
    })
    .then((res) => {
      const query = "REPLACE INTO department (name) VALUE (?)";
      db.query(query, [res.department], (err, res) => {
        if (err) throw err;
        console.table("All Department:", res);
        adminOption();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the job title you would like to add?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary for this position?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department ID for this job role?",
        name: "department_ID",
      },
    ])
    .then((res) => {
      const query =
        "INSERT INTO role (title, salary, department_id) VALUE(?, ?, ?)";
      db.query(
        query,
        [res.title, res.salary, res.department_ID],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          adminOption();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is your last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the role_id for this job?",
        name: "role_id",
      },
      {
        type: "input",
        message: "What is the manager_id for this job?",
        name: "manager_id",
      },
    ])
    .then((res) => {
      const query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE(?, ?, ?, ?)";
      db.query(
        query,
        [res.first_name, res.last_name, res.role_id, res.manager_id],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          adminOption();
        }
      );
    });
}

function exitApp() {
  db.close();
}
// Add update managers / employee role
// Add delete / role / employee / department
// Add budget for departments
adminOption();
