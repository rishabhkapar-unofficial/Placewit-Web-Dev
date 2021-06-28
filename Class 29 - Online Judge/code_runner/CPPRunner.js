const path = require("path");
const { execSync, execFileSync } = require("child_process");
const fs = require("fs");

function compile(srcCodeFile, execFilePath) {
  return new Promise((resolve, reject) => {
    const command = 'g++ "' + srcCodeFile + '" -o' + ' "' + execFilePath + '"';

    try {
      const output = execSync(command, { timeout: 30000 });
      resolve(output.toString());
    } catch (e) {
      reject(e.toString());
    }
  });
}

function runTestcase(execFile, inputFile) {
  return new Promise((resolve, reject) => {
    try {
      const output = execFileSync(execFile, {
        timeout: 5000,
        stdio: [fs.openSync(inputFile, "r"), "pipe", "pipe"],
      });

      resolve(output.toString());
    } catch (e) {
      reject(e.toString());
    }
  });
}

function writeToFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function runTestcases(testcases, testcaseIdx, execFile, inputFilePath) {
  return new Promise((resolve, reject) => {
    if (testcaseIdx >= testcases.length) {
      return resolve("AC");
    }

    const tc = testcases[testcaseIdx];
    writeToFile(inputFilePath, tc.input)
      .then(() => {
        runTestcase(execFile, inputFilePath)
          .then((output) => {
            if (tc.output.trim() !== output.trim()) {
              const wrongVerdict =
                "WA\nTestcase: " +
                (testcaseIdx + 1) +
                " failed.\nExpected Output: " +
                tc.output.trim() +
                "\nActual Output: " +
                output.trim();

              return resolve(wrongVerdict);
            } else {
              runTestcases(testcases, testcaseIdx + 1, execFile, inputFilePath)
                .then((data) => resolve(data))
                .catch((e) => reject(e));
            }
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

function run(testcases, code, username) {
  return new Promise((resolve, reject) => {
    const fileName = username + "-" + new Date().getTime();
    const srcCodeFilePath = path.join(__dirname, "temp", fileName + ".cpp");
    const execFilePath = path.join(__dirname, "temp", fileName + ".exe");
    const inputFilePath = path.join(__dirname, "temp", fileName + ".txt");

    writeToFile(srcCodeFilePath, code)
      .then(() => {
        compile(srcCodeFilePath, execFilePath)
          .then((warnings) => {
            runTestcases(testcases, 0, execFilePath, inputFilePath)
              .then((verdict) => {

                if (fs.existsSync(srcCodeFilePath)) fs.unlinkSync(srcCodeFilePath);
                if (fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);
                if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);

                resolve(
                  "warnings: " + (warnings ? warnings : "none") + "\n" + verdict
                );
              })
              .catch((e) =>
                reject("warnings" + (warnings ? warnings : "none") + "\n" + e)
              );
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

module.exports = { run };