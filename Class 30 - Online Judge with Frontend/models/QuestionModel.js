const mongoose = require('mongoose');

const model_name = 'question';
const QuestionSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  problem_statement: {
    type: String,
    required: true
  },

  input_format: String,

  output_format: String,

  author: {
    type: String,
    required: true
  }

});

mongoose.model(model_name, QuestionSchema);
module.exports = { model_name };