USE company_db

INSERT INTO department (id, dep_name) VALUES (1, "Engineering");
INSERT INTO department (id, dep_name) VALUES (2, "Sales");
INSERT INTO department (id, dep_name) VALUES (3, "Finance");
INSERT INTO department (id, dep_name) VALUES (4, "Marketing");
INSERT INTO department (id, dep_name) VALUES (5, "Design");

INSERT INTO roles (title, salary, department_id)
VALUES ("Campaign Manager", 110,000, 1),
       ("Digital Content Creator", 100,000, 1),
       ("Accountant", 100,000, 2 ),
       ("Sales Manager", 100,000, 3);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES ('Sam', 'Smith', 1, 2),
       ('Sunny', 'Jones', 1, null),
       ('Christos', 'Sokolis', 1, 2),
       ('George', 'Kapa', 1, null);
