//dependencies required
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//require("console.table");

//mysql2 connection
const connection = mysql.createConnection({
    host: 'localhost',
    // local host
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'FijiWater2022!',
    database: 'company_db'
});

connection.connect(function(err) {
    if (err) throw err;
   
    console.log("Connected as ID " + connection.threadId);
    console.log(`
    ░█▀▀▀ █▀▄▀█ █▀▀█ █── █▀▀█ █──█ █▀▀ █▀▀ 　 ▀▀█▀▀ █▀▀█ █▀▀█ █▀▀ █─█ █▀▀ █▀▀█ 
    ░█▀▀▀ █─▀─█ █──█ █── █──█ █▄▄█ █▀▀ █▀▀ 　 ─░█── █▄▄▀ █▄▄█ █── █▀▄ █▀▀ █▄▄▀ 
    ░█▄▄▄ ▀───▀ █▀▀▀ ▀▀▀ ▀▀▀▀ ▄▄▄█ ▀▀▀ ▀▀▀ 　 ─░█── ▀─▀▀ ▀──▀ ▀▀▀ ▀─▀ ▀▀▀ ▀─▀▀`)
    // runs the app
    runCompanyDB();
  });

// LIST OF CHOICES FOR USER ___________________________

function runCompanyDB() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do today?",
    name: "action",
    choices: [
            "View All Employees", 
            "View All Departments",
            "View All Roles",
            "View All Employees by Department",
            "View All Employees by Role",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
            ]
    }
]).then(function(answers) {
        switch (answers.action) {

            // VIEW ALL EMPLOYEES ___________________
            case "View All Employees":
                viewAllEmployees();
            break;

            // VIEW ALL DEPARTMENTS _________________
            case "View All Departments":
                viewAllDepts();
            break;

             // VIEW ALL ROLES ______________________
            case "View All Roles":
                viewAllRoles();
            break;
                
            // VIEW ALL EMPLOYES BY DEPT ____________
            case "View All Employees by Department":
                viewEmployeesByDept();
            break;

            // VIEW EMPLOYEES BY ROLE ______________
            case "View All Employees by Role":
                viewEmployeesByRole();
            break;

            // ADD A DEPARTMENT ____________________
            case "Add Department":
                addDept();
            break;

            // ADD A ROLE ___________________________
            case "Add Role":
                addRole();
            break;

            // ADD EMPLOYEE _________________________
            case "Add Employee":
                addEmployee();
            break;

            // UPDATE EMPLOYEE ROLE _________________
            case "Update Employee Role":
                updateEmployeeRole();
            break;

            //EXIT ________________________
            case "Exit":
                console.log ("===============================================");
                console.log ("");
                console.log ("   THANK YOU FOR USING THE EMPLOYEE DATABASE   ");
                console.log ("");
                console.log ("===============================================");
                connection.end();
            break;
            }
    })
};

// VIEW EMPLOYEES ________________________
function viewAllEmployees() {
    
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title, role.salary AS Salary, department.dep_name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employees INNER JOIN role on role.id = employees.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employees on employees.managerID = e.id;", 
    function(err, res) {
      if (err) throw err
      console.log ("");
      console.log("*** EMPLOYEES LIST ***");
      console.log ("");
      console.table(res)
      runCompanyDB();
  })
}

// VIEW DEPARTMENTS ______________________
function viewAllDepts() {
    connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** DEPARTMENT LIST ***")
      console.log("")
      console.table(res)
      runCompanyDB();
  })
}

// VIEW ROLES ______________________
function viewAllRoles() {
    connection.query("SELECT roles.id AS Dept_ID, roles.title AS Title FROM roles",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** ROLE LIST ***")
      console.log("")
      console.table(res)
      runCompanyDB()
  })
}

// VIEW EMPLOYEES BY DEPARTMENT --------------
function viewEmployeesByDept() {
  connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, department.name AS Department FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;", 
  function(err, res) {
    if (err) throw err
    console.log ("");
    console.log("*** EMPLOYEES LIST BY DEPARTMENT ***")
    console.log ("");
    console.table(res)
    runCompanyDB();
  })
}

// VIEW EMPLOYES BY ROLE ____________________
function viewEmployeesByRole() {
  connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, roles.title AS Title FROM employees JOIN roles ON employees.role_id = role.id ORDER BY role.id", 
  function(err, res) {
  if (err) throw err
  console.log ("");
  console.log("*** EMPLOYEES LIST BY ROLE ***")
  console.log ("");
  console.table(res)
  runCompanyDB();
  })
}

// ROLE ARRAY SET UP FOR EMPLOYEE ADDITION _____________________
let roleArr = [];                                            
function selectRole() {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

// MANAGER ARRAY SET UP FOR EMPLOYEE ADDITION ____________________
let managersArr = [];
function selectManager() {
  connection.query("SELECT firstName, lastName FROM employees", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].firstName);
    }
  })
  return managersArr;
}

// DEPARTMENT ARRAY SET UP FOR ROLE ADDITION __________________
var deptArr = [];
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      deptArr.push(res[i].name);
    }
})
return deptArr;
}


// ADD NEW EMPLOYEE -------------------
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "First Name: "
        },
        {
          name: "lastName",
          type: "input",
          message: "Last Name: "
        },
        {
          name: "roles",
          type: "list",
          message: "What is the new employee's title? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Who is managing the new employee? ",
            choices: selectManager()
        }

    ]).then(function (answers) {
      var role_id = selectRole().indexOf(answers.role) + 1
      var manager_id = selectManager().indexOf(answers.choice) + 1
      connection.query("INSERT INTO employees SET ?", 
      {
          firstName: answers.firstName,
          lastName: answers.lastName,
          managerID: manager_id,
          role_id: role_id
          
      }, 
      function(err){
          if (err) throw err
          console.table(answers)
          runCompanyDB()
      })

  })
 }
// UPDATE EMPLOYEE ROLE _______________________
function updateEmployeeRole() {
    connection.query("SELECT employees.lastName, role.title FROM employees JOIN role ON employees.role_id = role.id;", 
    (err, res) => {
            if (err) throw err;
 
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "rawlist",
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].lastName);
                        }
                        return lastName;
                    },
                    message: "What is the employee's last name? ",
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the employee's new title? ",
                    choices: selectRole()
                },
            ]).then(function (answers) {
                var role_id = selectRole().indexOf(answers.role) + 1;
                connection.query("UPDATE employees SET WHERE ?",
                    {
                        lastName: answers.lastName,
                        role_id: role_id
                    },
        
                    function (err) {
                        if (err)
                            throw err;
                        console.table(answers);
                        runCompanyDB();
                    });
            });
        });
  }

// ADD DEPARTMENT _________________________
function addDept() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add? "
        },
        {
            name: "id",
            type: "input",
            message: "What is the new Department ID number? "
          }

    ]).then(function(answers) {
        connection.query("INSERT INTO department SET ? ",
            {
              name: answers.name,
              id: answers.id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runCompanyDB();
            }
        )
    })
  }

  // ADD ROLE __________________________________
  function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is name of the new role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
          } ,
          {
            name: "department",
            type: "rawlist",
            message: "Under which department does this new role fall?",
            choices: selectDepartment()
          }
      ]).then(function(answers) {
          var deptId = selectDepartment().indexOf(answers.choice) + 1
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                department_id: department_id
              },
              function(err) {
                  if (err) throw err
                  console.table(answers);
                  runCompanyDB();
              }
          )     
      });
    });
};