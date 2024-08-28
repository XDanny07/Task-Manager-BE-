const Task = require("../models/taskModel");
const TaskHistory = require("../models/taskHistory");
// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Add a new task
exports.addTask = async (req, res) => {
  const { name, priority, description, duedate, status } = req.body;

  try {
    const newTask = new Task({
      name,
      priority,
      description,
      duedate,
      status,
    });
    await newTask.save();

    try {
      const history = new TaskHistory({
        taskId: newTask._id,
        history: [
          {
            action: "created",
            timestamp: Date.now(),
          },
        ],
      });
      await history.save();
    } catch (error) {
      res.status(500).json({ message: "Error creating history", error });
    }

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

// Update a single task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedFields = [];
    for (const key in updatedData) {
      if (key !== "_id" && task[key] !== updatedData[key]) {
        updatedFields.push({
          fieldName: key,
          oldValue: task[key],
          newValue: updatedData[key],
        });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Return the updated document
    );
    try {
      let history = await TaskHistory.findOne({ taskId: id });

      // Append the update to the existing history
      if (updatedFields.length > 0) {
        history.history.push({
          action: "updated",
          updatedFields: updatedFields,
          timestamp: Date.now(),
        });
        await history.save();
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating history", error });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    try {
      await TaskHistory.findOneAndDelete({ taskId: id });
    } catch (error) {
      res.status(500).json({ message: "Error deleting history" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
