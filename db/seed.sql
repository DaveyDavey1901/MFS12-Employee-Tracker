INSERT INTO
  department (Name)
VALUES
  ('Management'),
  ('Development'),
  ('Support'),
  ('Sales');
INSERT INTO
  role (title, salary, department_id)
VALUES
  ('Frontend Engineer', 36000, 2),
  ('Sales Manager', 40000, 1),
  ('Project Manager', 60000, 1),
  ('Tech Support', 30000, 3),
  ('Cashier', 20000, 4);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Tom', 'Bottom', 1, 3),
  ('Lisa', 'Smith', 2, NULL),
  ('John', 'Wood', 3, NULL),
  ('Amy', 'Tooling', 4, 3),
  ('Frank', 'Butter', 5, 2);