import express from "express";
import { db } from "../services/firebase.js"; // Ensure you're using Realtime Database

const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  const { title, description, assignedTo, dueDate, priority } = req.body;
  try {
    const taskRef = db.ref("tasks").push(); // Use push() to create a new task
    await taskRef.set({
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      status: "To Do",
      createdAt: new Date().toISOString(), // Store date as ISO string
    });
    res.status(201).json({ message: "Task created", taskId: taskRef.key });
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error: error.message });
  }
});

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("tasks").once("value"); // Use once() to get data once
    const tasks = snapshot.val(); // Get all tasks
    const formattedTasks = tasks ? Object.keys(tasks).map((key) => ({ id: key, ...tasks[key] })) : [];
    res.status(200).json(formattedTasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error: error.message });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await db.ref(`tasks/${id}`).update(updates); // Update task by ID
    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error: error.message });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`tasks/${id}`).remove(); // Remove task by ID
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error: error.message });
  }
});

// Get Task by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.ref(`tasks/${id}`).once("value"); // Fetch task by ID
    const task = snapshot.val(); // Get task data
    if (task) {
      res.status(200).json({ id, ...task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching task", error: error.message });
  }
});


export default router;
