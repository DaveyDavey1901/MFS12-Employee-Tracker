const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env || 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "#",
  password: "#",
  database: "#",
});

db.connect();

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
