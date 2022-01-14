INSERT INTO department (name)
VALUES ("Sales Department"),
       ("Accounting Department"),
       ("Customer Service Department"),
       ("IT Department");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000.00, 1),
       ("Inside Sales", 50000.00, 1),
       ("Outside Sales", 48000.00, 1),
       ("Sales Intern", 37000.00, 1),
       ("Accounting Manager", 35000.00, 2),
       ("Accountant", 90000.00, 2),
       ("Customer Service Manager", 50000.00, 3),
       ("Customer Service", 32000.00, 3),
       ("IT Manager", 70000.00, 4),
       ("IT", 60000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elyse", "Cowan", 1, null),
       ("Brycen", "Dunn", 2, 1),
       ("Caroline", "Mcgee", 3, 1),
       ("Deandre", "Ray", 4, 1),
       ("Fernanda", "Khan", 5, null),
       ("Hassan", "Pennington", 6, 5),
       ("Thalia", "Cortez", 7, null),
       ("Elisabeth", "Rush", 8, 7),
       ("Francisco", "Rose", 9, null),
       ("Estrella", "Branch", 10, 9);