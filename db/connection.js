const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DPE//db1901**",
  database: "employeesDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Welcome you are now connected to the Employee Database");
});

module.exports = db;