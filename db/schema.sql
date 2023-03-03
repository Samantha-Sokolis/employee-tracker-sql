-- CREATE DATABASE AND TABLES ===========================
DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;
USE company_db;

-- EMPLOYEES TABLE ======================================
CREATE TABLE employees (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR (30),
  lastName VARCHAR (30),
  roleID INT,
  managerID INT
);

-- DEPARTMENT TABLE ======================================
CREATE TABLE department (
  id INT(11) PRIMARY KEY,
  depName VARCHAR (30)
);

-- ROLE TABLE ======================================

CREATE TABLE role (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
  salary DECIMAL(9,2),
  departmentID INT
);