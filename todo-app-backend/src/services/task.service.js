import Task from "../models/tasks.model.js";

const createTask = async (userId, title, description) => {
  const newTask = await Task.create({
    title,
    description,
    status: 0,
    user_id: userId,
  });
  return newTask;
};

const getTasksByUser = async (userId) => {
  const tasks = await Task.findAll({ where: { user_id: userId } });
  return tasks;
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ where: { id: taskId, user_id: userId } });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

const updateTaskStatus = async (userId, taskId, status) => {
  const task = await Task.findOne({ where: { id: taskId, user_id: userId } });
  if (!task) {
    throw new Error("Task not found");
  }
  task.status = status;
  await task.save();
  return task;
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOne({ where: { id: taskId, user_id: userId } });
  if (!task) {
    throw new Error("Task not found");
  }
  await task.destroy();
};

export default {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTaskStatus,
  deleteTask,
};