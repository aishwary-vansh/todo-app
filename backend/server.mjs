import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

// Helper to read DB
async function readDb() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(DB_FILE, JSON.stringify([]));
      return [];
    }
    throw err;
  }
}

// Helper to write DB
async function writeDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// GET /api/tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await readDb();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

// POST /api/tasks
app.post('/api/tasks', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Task name is required.' });
    }

    const tasks = await readDb();
    const newTask = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    tasks.unshift(newTask);
    await writeDb(tasks);
    
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
});

// PATCH /api/tasks/:id
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await readDb();
    const idx = tasks.findIndex((t) => t.id === id);
    
    if (idx === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    tasks[idx].completed = !tasks[idx].completed;
    await writeDb(tasks);
    
    res.status(200).json(tasks[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await readDb();
    const filtered = tasks.filter((t) => t.id !== id);
    
    if (filtered.length === tasks.length) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    await writeDb(filtered);
    res.status(200).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Todo API is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
