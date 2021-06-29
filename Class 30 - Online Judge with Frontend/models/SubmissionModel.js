const mongoose = require('mongoose');

const model_name = "submission";
const SubmissionSchema = new mongoose.Schema({

  question_id: {
    type: String,
    required: true
  },

  code: {
    type: String,
    required: true
  },

  verdict: {
    type: String,
    required: true,
    default: 'running'
  }

});

mongoose.model(model_name, SubmissionSchema);
module.exports = { SubmissionSchema, model_name };
