const inquirer = require('inquirer');
const sql = require('mysql2');

const PORT = process.env || 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "David",
  password: "123456",
  database: "#",
});

db.connect();


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});