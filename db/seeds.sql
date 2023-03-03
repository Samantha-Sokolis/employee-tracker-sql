USE company_db

INSERT INTO department (id, depName) VALUES (1, 'Engineering');
INSERT INTO department (id, depName) VALUES (2, 'Sales');
INSERT INTO department (id, depName) VALUES (3, 'Finance');
INSERT INTO department (id, depName) VALUES (4, 'Marketing');
INSERT INTO department (id, depName) VALUES (10, 'Design');

INSERT INTO role (title, salary, departmentID)
VALUES ("Campaign Manager", 110,000, 1),
       ("Digital Content Creator", 100,000, 1),
       ("Accountant", 100,000, 2 ),
       ("Sales Manager", 100,000, 3);

INSERT INTO employees (firstName, lastName, roleID, managerID)
VALUES ('Sam', 'Smith', 1, 2),
       ('Sunny', 'Jones', 1, null),
       ('Christos', 'Sokolis', 1, 2),
       ('George', 'Kapa', 1, null);
