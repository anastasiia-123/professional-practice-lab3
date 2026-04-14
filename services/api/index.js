const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());


const pool = new Pool({
  host: 'db',
  user: 'ivan',
  password: 'password123',
  database: 'notes_db',
  port: 5432,
});


const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        tags TEXT[]
      );
    `);
    console.log("Database table is ready");
  } catch (err) {
    console.error("DB Init Error:", err);
  }
};

initDb();


app.get('/health', (req, res) => res.status(200).json({ status: "ok" }));


app.get('/notes', async (req, res) => {
  const result = await pool.query('SELECT * FROM notes');
  res.json(result.rows);
});


app.post('/notes', async (req, res) => {
  const { title, content, tags } = req.body;
  const result = await pool.query(
    'INSERT INTO notes (title, content, tags) VALUES ($1, $2, $3) RETURNING *',
    [title, content, tags]
  );
  res.status(201).json(result.rows[0]);
});

app.listen(3000, () => console.log('API listening on port 3000'));