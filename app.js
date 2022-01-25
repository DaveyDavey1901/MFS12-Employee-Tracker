const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table")


const db = mysql.createConnection({
  host: "localhost",
  user: "#",
  password: "#",
  database: "employeesDB",
});

db.connect((err) => {
  if (err) throw err;
    console.log('Welcome you are now connected to the Employee Database');
});
