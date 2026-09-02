import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
const app = express();
const PORT = 5000;


app.use(express.json());
app.use('/students',studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
