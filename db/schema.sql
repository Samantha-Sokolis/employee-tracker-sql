
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company;


CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  SALARY DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  FOREIGN KEY (manager_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);
