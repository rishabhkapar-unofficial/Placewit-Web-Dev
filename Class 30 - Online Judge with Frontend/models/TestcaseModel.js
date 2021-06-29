const mongoose = require('mongoose');

const model_name = 'testcase'
const TestcaseSchema = new mongoose.Schema({

  input: {
    type: String,
    default: ''
  },

  output: {
    type: String,
    default: ''
  }

}); 

mongoose.model(model_name, TestcaseSchema);
module.exports = { model_name, TestcaseSchema };