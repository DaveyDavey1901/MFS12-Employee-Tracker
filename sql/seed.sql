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
  ('Tom', 'Bottom', 2, 2),
  ('Lisa', 'Smith', 1, 4),
  ('John', 'Wood', 2, 2),
  ('Amy', 'Tooling', 3, 3),
  ('Frank', 'Butter', 4, 4);