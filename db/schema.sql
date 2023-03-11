-- CREATE DATABASE AND TABLES ===========================
DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;
USE company_db;

-- DEPARTMENT TABLE ======================================
CREATE TABLE department (
  id INT(11) PRIMARY KEY,
  dep_name VARCHAR (30)
);

-- ROLE TABLE ======================================

CREATE TABLE roles (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
  salary DECIMAL(9,2),
  department_id INT, 
  FOREIGN KEY (department_id) 
);

-- EMPLOYEES TABLE ======================================
CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR (30),
  lastName VARCHAR (30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (manager_id)
);