INSERT INTO department (name)
VALUES ("Marketing"),
       ("Design"),
       ("Finance"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Campaign Manager", 110,000, 1),
       ("Digital Content Creator", 100,000, 1),
       ("Accountant", 100,000, 2 ),
       ("Sales Manager", 100,000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("English"),
       ("Art"),
       ("Science"),
       ("Technology");
