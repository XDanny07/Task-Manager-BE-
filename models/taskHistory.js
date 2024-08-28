const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskHistorySchema = new Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  history: [
    {
      action: {
        type: String,
        enum: ["created", "updated"],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      updatedFields: [
        {
          fieldName: String,
          oldValue: Schema.Types.Mixed,
          newValue: Schema.Types.Mixed,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("TaskHistory", TaskHistorySchema);
