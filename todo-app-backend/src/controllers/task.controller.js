import taskService from "../services/task.service.js";

const createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  try {
    const newTask = await taskService.createTask(userId, title, description);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await taskService.getTasksByUser(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  try {
    const task = await taskService.getTaskById(userId, taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await taskService.updateTaskStatus(userId, taskId, status);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  try {
    await taskService.deleteTask(userId, taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  getTaskById,
};