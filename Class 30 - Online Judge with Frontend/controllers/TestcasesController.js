const mongoose = require("mongoose");

const TestcaseSchema = mongoose.model(
  require("../models/TestcaseModel").model_name
);

const TestcasesSchema = mongoose.model(
  require("../models/TestcasesModel").model_name
);

async function getTestcases(question_id) {
  return (await TestcasesSchema.findOne({ question_id }).exec()).testcases;
}

async function createTestcasesEntry(question_id) {
  await new TestcasesSchema({ question_id }).save();
  return;
}

async function addTestcase(question_id, testcase) {
  const testcases = await TestcasesSchema.findOne({ question_id }).exec();
  console.log(testcases);
  testcases.testcases.push(new TestcaseSchema(testcase));
  return (await testcases.save()).testcases;
}

module.exports = { getTestcases, addTestcase, createTestcasesEntry };
