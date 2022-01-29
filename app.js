const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

// This function i used to prompt the user to choose from a list of options.

const adminOption = () => {
  inquirer
    .prompt({
      type: "list",
      message:
        "Please select an action to perform from the Employee Database.\n",
      name: "Admin",
      choices: [
        "View all employees",
        "Add an employee",
        "Update a employee role",
        "View all roles",
        "Add a role",
        "View all departments",
        "Add a department",
        //"View all employees by manager",
        //"Update an employee managers",
        //"view all employees by department",
        //"Delete a department",
        //"Department budget",
        //"Delete a role",
        "Exit",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.Admin) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employees role":
          updateEmployeeRole();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add a role":
          addRole();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "Add a department":
          addDepartment();
          break;

        // case "View all employees by manager":
        //   viewAllEmpbyManager();
        //   break;

        // case "View all employees by department":
        //   viewAllEmpByDepartment();
        //   break;

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

// This will display all the departments with the there id;
function viewAllDepartments() {
  const query = "SELECT * FROM employeesdb.department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    adminOption();
  });
}
// This query will display all the Id, Roles, Salary and department ID.
function viewAllRoles() {
  const query = `SELECT role.id, role.title, role.salary, department.name AS department
                    FROM role AS role
                    INNER JOIN department AS department
                    ON role.department_id = department.id`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    adminOption();
  });
}
// This query returns all employee, role, department and manager information together.
function viewAllEmployees() {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department,  
                    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                    FROM employee
                    LEFT JOIN role 
                    ON employee.role_id = role.id
                    LEFT JOIN department 
                    ON role.department_id = department.id 
                    LEFT JOIN employee manager 
                    ON manager.id = employee.manager_id;
            `;

  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    adminOption();
  });
}

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
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err; 

    
    let roleList = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });

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
          type: "list",
          message: "What is your role for this job?",
          name: "role_id",
          choices: roleList,
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
  });
}

function exitApp() {
  db.close();
}
// Add update managers / employee role
// Add delete / role / employee / department
// Add budget for departments
adminOption();
