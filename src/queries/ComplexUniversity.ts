export default {
  tableName: 'university.sqlite',
  keyName: 'test',
  queries: [
`CREATE TABLE IF NOT EXISTS Departments (
            department_id INTEGER PRIMARY KEY,
            department_name TEXT NOT NULL
          )`,
          `CREATE TABLE IF NOT EXISTS Students (
            student_id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            birth_date TEXT,
            gender TEXT,
            department_id INTEGER,
            FOREIGN KEY (department_id) REFERENCES Departments(department_id)
          )`,
          `CREATE TABLE IF NOT EXISTS Instructors (
            instructor_id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            hire_date TEXT,
            department_id INTEGER,
            FOREIGN KEY (department_id) REFERENCES Departments(department_id)
          )`,
          `CREATE TABLE IF NOT EXISTS Courses (
            course_id INTEGER PRIMARY KEY,
            course_name TEXT NOT NULL,
            credits INTEGER NOT NULL,
            department_id INTEGER,
            instructor_id INTEGER,
            FOREIGN KEY (department_id) REFERENCES Departments(department_id),
            FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
          )`,
          `CREATE TABLE IF NOT EXISTS Enrollments (
            enrollment_id INTEGER PRIMARY KEY,
            student_id INTEGER,
            course_id INTEGER,
            enrollment_date TEXT,
            FOREIGN KEY (student_id) REFERENCES Students(student_id),
            FOREIGN KEY (course_id) REFERENCES Courses(course_id)
          )`,
          `CREATE TABLE IF NOT EXISTS Grades (
            grade_id INTEGER PRIMARY KEY,
            enrollment_id INTEGER,
            grade TEXT NOT NULL,
            FOREIGN KEY (enrollment_id) REFERENCES Enrollments(enrollment_id)
          )`,

          // Insert sample data into Departments
          `INSERT INTO Departments (department_name) VALUES ('Computer Science')`,
          `INSERT INTO Departments (department_name) VALUES ('Mathematics')`,
          `INSERT INTO Departments (department_name) VALUES ('Physics')`,

          // Insert sample data into Students
          `INSERT INTO Students (first_name, last_name, birth_date, gender, department_id) VALUES ('John', 'Doe', '2000-01-15', 'M', 1)`,
          `INSERT INTO Students (first_name, last_name, birth_date, gender, department_id) VALUES ('Jane', 'Smith', '1999-03-22', 'F', 2)`,
          `INSERT INTO Students (first_name, last_name, birth_date, gender, department_id) VALUES ('Emily', 'Davis', '2001-05-12', 'F', 3)`,

          // Insert sample data into Instructors
          `INSERT INTO Instructors (first_name, last_name, hire_date, department_id) VALUES ('Dr. Alice', 'Johnson', '2010-08-15', 1)`,
          `INSERT INTO Instructors (first_name, last_name, hire_date, department_id) VALUES ('Dr. Bob', 'Brown', '2012-01-10', 2)`,
          `INSERT INTO Instructors (first_name, last_name, hire_date, department_id) VALUES ('Dr. Carol', 'White', '2015-07-25', 3)`,

          // Insert sample data into Courses
          `INSERT INTO Courses (course_name, credits, department_id, instructor_id) VALUES ('Algorithms', 3, 1, 1)`,
          `INSERT INTO Courses (course_name, credits, department_id, instructor_id) VALUES ('Linear Algebra', 4, 2, 2)`,
          `INSERT INTO Courses (course_name, credits, department_id, instructor_id) VALUES ('Quantum Mechanics', 5, 3, 3)`,

          // Insert sample data into Enrollments
          `INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES (1, 1, '2022-09-01')`,
          `INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES (2, 2, '2022-09-01')`,
          `INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES (3, 3, '2022-09-01')`,
          `INSERT INTO Enrollments (student_id, course_id, enrollment_date) VALUES (1, 3, '2023-01-15')`,

          // Insert sample data into Grades
          `INSERT INTO Grades (enrollment_id, grade) VALUES (1, 'A')`,
          `INSERT INTO Grades (enrollment_id, grade) VALUES (2, 'B')`,
          `INSERT INTO Grades (enrollment_id, grade) VALUES (3, 'A')`,
          `INSERT INTO Grades (enrollment_id, grade) VALUES (4, 'B')`,

          // Complex queries
          // Fetch students with their enrolled courses and grades
          `SELECT s.first_name, s.last_name, c.course_name, g.grade
           FROM Students s
           JOIN Enrollments e ON s.student_id = e.student_id
           JOIN Courses c ON e.course_id = c.course_id
           JOIN Grades g ON e.enrollment_id = g.enrollment_id`,

          // Fetch instructors and the courses they teach along with the department
          `SELECT i.first_name, i.last_name, c.course_name, d.department_name
           FROM Instructors i
           JOIN Courses c ON i.instructor_id = c.instructor_id
           JOIN Departments d ON c.department_id = d.department_id`,

          // Fetch average grade for each course
          `SELECT c.course_name, AVG(
              CASE g.grade
                WHEN 'A' THEN 4.0
                WHEN 'B' THEN 3.0
                WHEN 'C' THEN 2.0
                WHEN 'D' THEN 1.0
                ELSE 0.0
              END
            ) AS average_grade
            FROM Courses c
            JOIN Enrollments e ON c.course_id = e.course_id
            JOIN Grades g ON e.enrollment_id = g.enrollment_id
            GROUP BY c.course_name`,

          // Fetch students by department
          `SELECT s.first_name, s.last_name
           FROM Students s
           WHERE s.department_id = 1`, // Example for Computer Science department

          // Fetch courses by instructor
          `SELECT c.course_name
           FROM Courses c
           WHERE c.instructor_id = 1`, // Example for instructor with ID 1

          // Fetch top 5 students by GPA
          `SELECT s.first_name, s.last_name, AVG(
              CASE g.grade
                WHEN 'A' THEN 4.0
                WHEN 'B' THEN 3.0
                WHEN 'C' THEN 2.0
                WHEN 'D' THEN 1.0
                ELSE 0.0
              END
            ) AS gpa
            FROM Students s
            JOIN Enrollments e ON s.student_id = e.student_id
            JOIN Grades g ON e.enrollment_id = g.enrollment_id
            GROUP BY s.student_id
            ORDER BY gpa DESC
            LIMIT 5`
  ]
}