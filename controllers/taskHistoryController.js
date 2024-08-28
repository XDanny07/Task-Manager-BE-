const TaskHistory = require("../models/taskHistory");

exports.getTaskHistory = async (req, res) => {
  try {
    const history = await TaskHistory.find({ taskId: req.params.taskId });

    if (!history) {
      return res
        .status(404)
        .json({ message: "No history found for this task" });
    }

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
};

exports.deleteTaskHistory = async (req, res) => {
  try {
    await TaskHistory.deleteMany({ taskId: req.params.taskId });
    res.status(200).json({ message: "Task history deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting history", error });
  }
};
