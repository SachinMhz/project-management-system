const express = require("express");
const config = require("../../config");
const pool = require("../models/connection");

const app = express();

app.use(express.json());

//get all todo
app.get("/todo", async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todo");
    res.json(todo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo - remaining
app.get("/todo/remaining", async (req, res) => {
  try {
    const remaining = await pool.query(
      "SELECT * FROM todo WHERE isComplete = $1",
      [false]
    );
    res.json(remaining.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo - completed
app.get("/todo/completed", async (req, res) => {
  try {
    const remaining = await pool.query(
      "SELECT * FROM todo WHERE isComplete = $1",
      [true]
    );
    res.json(remaining.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//create new todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    console.log("description", description);
    const newTodo = await pool.query(
      "INSERT INTO todo (description,isComplete) VALUES ($1, $2) RETURNING *",
      [description, false]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update todo

//delete todo

app.listen(config.port, config.host, () => {
  console.log("server listening on port:", config.port);
});
