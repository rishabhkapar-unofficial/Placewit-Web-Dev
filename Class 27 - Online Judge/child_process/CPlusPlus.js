const path = require("path");
const { execSync, execFileSync } = require("child_process");
const { writeFile, openSync, unlinkSync, existsSync } = require("fs");

function compile(sourceCodeFile, expectedOutputFile) {
  return new Promise((resolve, reject) => {
    const command =
      'g++ "' + sourceCodeFile + '" -o "' + expectedOutputFile + '"';

    try {
      const output = execSync(command, { timeout: 30000 });
      resolve(output.toString());
    } catch (e) {
      reject(e.toString());
    }
  });
}

function runTestcase(executableFile, inputFilePath) {
  return new Promise((resolve, reject) => {
    try {
      const output = execFileSync(executableFile, {
        timeout: 5000,
        stdio: [openSync(inputFilePath, "r"), "pipe", "pipe"],
      });
      resolve(output.toString());
    } catch (e) {
      reject(e.toString());
    }
  });
}

function writeToFile(filePath, content) {
  return new Promise((resolve, reject) => {
    writeFile(filePath, content, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function runTestcases(testcases, testcaseIdx, execFile, inputFile) {
  return new Promise((resolve, reject) => {
    if (testcaseIdx >= testcases.length) {
      resolve("AC");
    }

    writeToFile(inputFile, testcases[testcaseIdx].input)
      .then(() => {
        runTestcase(execFile, inputFile)
          .then((output) => {
            if (testcases[testcaseIdx].output.trim() !== output.trim()) {
              resolve(
                "WA\nTestcase: " +
                  (testcaseIdx + 1) +
                  " failed.\nExpected Output: " +
                  testcases[testcaseIdx].output.trim() +
                  "\nActual Output: " +
                  output.trim()
              );
            } else {
              runTestcases(testcases, testcaseIdx + 1, execFile, inputFile)
                .then((data) => resolve(data))
                .catch((e) => reject(e));
            }
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function run(testcases, code, username) {
  return new Promise((resolve, reject) => {
    const fileName = username + "-" + new Date().getTime();
    const srcCodeFile = "../source_codes/" + fileName + ".cpp";
    const execFile = "../executables/" + fileName + ".exe";
    const inputFile = "../std_inputs/" + fileName + ".txt";

    writeToFile(srcCodeFile, code)
      .then(() => {
        compile(srcCodeFile, execFile)
          .then((warnings) => {
            runTestcases(testcases, 0, execFile, inputFile)
              .then((outcome) => {
                if (existsSync(inputFile)) unlinkSync(inputFile);
                if (existsSync(execFile)) unlinkSync(execFile);
                if (existsSync(srcCodeFile)) unlinkSync(srcCodeFile);
                resolve(
                  "warnings: " + (warnings ? warnings : "none") + "\n" + outcome
                );
              })
              .catch((e) =>
                reject("warnings: " + (warnings ? warnings : "none") + "\n" + e)
              );
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}


const code = `
#include<iostream>

using namespace std;

int main(void) {

    int a, b;
    cin >> a >> b;
    
    cout << a + b << endl;
    return 0;
    
}
`;

const testcases = [
  {
    input: '2 3',
    output: '5'
  },
  {
    input: '7 8',
    output: '15'
  },
  {
    input: '3 -4',
    output: '-1'
  }
];

run(testcases, code, "rk").then((msg) => console.log(msg));
