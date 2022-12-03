// Packages needed for this application
// Inquirer
// mySQL
// console table package
import('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const connection = require('./config/connection');

// ? needed?
const PORT = process.env.PORT || 3001;

// Connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'password goes here',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// First prompt shows user array options to choose from
const firstPrompt = () => {
    return inquirer
      .prompt([
        {type: "choice",
         name: "options",
         message: "Please select one of the following",
         choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"],
        },
     ])
    .then((answer) => {
      const {firstPrompt} = answers;

      if (firstPrompt === "View all departments") {
        viewAllDepartments();
      }

    if (firstPrompt === 'View All Employees By Department') {
      viewEmployeesByDepartment();
  }

  if (firstPrompt === 'Add Employee') {
      addEmployee();
  }

  if (firstPrompt === 'Remove Employee') {
      removeEmployee();
  }

  if (firstPrompt === 'Update Employee Role') {
      updateEmployeeRole();
  }

  if (firstPrompt === 'Update Employee Manager') {
      updateEmployeeManager();
  }

  if (firstPrompt === 'View All Roles') {
      viewAllRoles();
  }

  if (firstPrompt === 'Add Role') {
      addRole();
  }

  if (firstPrompt === 'Remove Role') {
      removeRole();
  }

  if (firstPrompt === 'Add Department') {
      addDepartment();
  }

  if (firstPrompt === 'View Department Budgets') {
      viewDepartmentBudget();
  }

  if (firstPrompt === 'Remove Department') {
      removeDepartment();
  }

  if (firstPrompt === 'Exit') {
      connection.end();
  }
});
};

const viewAllDepartments = () => {
    'SELECT * FROM department', function (err, results) {
        console.log(results);
      };
    }


  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
