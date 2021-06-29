const mongoose = require("mongoose");

const SubmissionSchema = require("./SubmissionModel").SubmissionSchema;

const model_name = "user";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  questions: {
    type: [String],
    required: true,
    default: [],
  },

  submissions: [SubmissionSchema],
});

mongoose.model(model_name, UserSchema);
module.exports = { model_name };
