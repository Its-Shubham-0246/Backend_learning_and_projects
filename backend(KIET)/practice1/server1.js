import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

const students = [
  { id: 1, name: 'Amit', course: 'NodeJS', age: 21 },
  { id: 2, name: 'Neha', course: 'React', age: 22 },
  { id: 3, name: 'Rohit', course: 'NodeJS', age: 20 },
  { id: 4, name: 'Pooja', course: 'Java', age: 23 },
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
  const { name, course, age } = req.body;

  if (!name || !course || age === undefined) {
    return res.status(400).json({ message: 'Name, course, and age are required' });
  }

  const newStudent = {
    id: Date.now(),
    name,
    course,
    age,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, course, age } = req.body;
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  if (!name || !course || age === undefined) {
    return res.status(400).json({ message: 'Name, course, and age are required for update' });
  }

  students[studentIndex] = {
    ...students[studentIndex],
    id,
    name,
    course,
    age,
  };

  res.json(students[studentIndex]);
});
app.get('/search', (req, res) => {
  const course = req.query.course ? req.query.course.toString().toLowerCase() : null;
  const age = req.query.age ? Number(req.query.age) : null;

  let result = students;

  if (course) {
    result = result.filter((st) => st.course.toLowerCase() === course);
  }

  if (age !== null && !isNaN(age)) {
    result = result.filter((st) => st.age === age);
  }

  res.status(200).json(result);
});

app.patch('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const { name, course, age } = req.body;

  if (name !== undefined) {
    students[studentIndex].name = name;
  }

  if (course !== undefined) {
    students[studentIndex].course = course;
  }

  if (age !== undefined) {
    students[studentIndex].age = age;
  }

  res.json(students[studentIndex]);
});

app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const oldLength = students.length;

  const filteredStudents = students.filter((student) => student.id !== id);

  if (filteredStudents.length === oldLength) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students.length = 0;
  students.push(...filteredStudents);

  res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
