const path = require("path");
const { execSync, execFileSync } = require("child_process");
const { createReadStream, writeFile } = require("fs");
const { generateFileName } = require("../utils/misc");

function compile(sourceCodeFile, expectedOutputFile) {
  try {
    const command =
      'g++ "' + sourceCodeFile + '" -o "' + expectedOutputFile + '"';
    const output = execSync(command, { timeout: 30000 });
    return { error: null, output: output.toString() };
  } catch (e) {
    return { error: true, output: e.stderr.toString() };
  }
}

function run(executableFile, fileDescriptor) {
  try {
    console.log(fileDescriptor);
    const output = execFileSync(executableFile, {
      timeout: 5000,
      stdio: [fileDescriptor],
    });
    return { error: null, output: output.toString() };
  } catch (e) {
    return { error: true, output: e.stderr.toString() };
  }
}

// const sourceCodeFile = path.join(__dirname, '../source_codes/helloworld.cpp');
// const ouputFile = path.join(__dirname, '../executables/helloworld.exe');
// const inputFile = path.join(__dirname, '../std_inputs/helloworld.txt');

// const compileOutput = compile(sourceCodeFile, ouputFile);

// if(compileOutput.error)
//     console.error(compileOutput.output);

// else {

//     const std_input = createReadStream(inputFile);

//     std_input.on('open', (fd) => {
//         const expectedOutput = '5';
//         const runOutput = run(ouputFile, fd);
//         console.log(expectedOutput === runOutput.output.trim());
//         console.log(runOutput.output);

//     });

// }

// testcase - input, output
async function runAllTestcases(username, question_title, code, testcases) {
  const fileName = generateFileName(username, question_title);
  const sourceFilePath = path.join(
    __dirname,
    "../source_codes/" + fileName + ".cpp"
  );
  // const sourceFilePath = path.join(__dirname, '../source_codes/helloworld.cpp');
  const executableFilePath = path.join(
    __dirname,
    "../executables/" + fileName + ".exe"
  );
  const stdInputFilePath = path.join(
    __dirname,
    "../std_inputs/" + fileName + ".txt"
  );

  writeFile(sourceFilePath, code, (err) => {
    if (err) return console.error(err);

    const compileOutput = compile(sourceFilePath, executableFilePath);

    if (compileOutput.error)
      return {
        verdict: "COMPILATION_ERROR",
        description: compileOutput.output,
      };

    for (let i = 0; i < testcases.length; i++) {
      writeFile(stdInputFilePath, testcases[i].input, (err) => {
        const inputFile = createReadStream(stdInputFilePath);
        inputFile.on("open", (fd) => {
          const runOutput = run(executableFilePath, fd);
          console.log(runOutput.output);
          console.log(testcases[i].output.trim() === runOutput.output.trim());
        });
      });
    }
  });
}

const testcases = [
  {
    input: "2 3",
    output: "5",
  },
  {
    input: "7 8",
    output: "15",
  },
];

const code = `
#include<iostream>

using namespace std;

int main(void) {

    int a, b;
    cin >> a >> b;
    cout << a << " " << b << endl;
    cout << a + b << endl;
    return 0;
    
}
`;

runAllTestcases("rishabh", "sum", code, testcases);



// compile(sourceCodeFile, executableOutputFile).then((res) => console.log(res)).catch((e) => {
//   console.log(e);
// });

// run(executableOutputFile).then((res) => console.log(res));

// let code = `
// #include<bits/stdc++.h>

// using namespace std;

// int main(void) {
//   cout << "Hello, World!" << endl;
//   return 0;
// }
// `;

// writeSourceCode(sourceCodeFile, code).then(() => {
//   console.log("Code written to", sourceCodeFile);
// });

// const testcases = [
//   {
//     input: "2 3",
//     output: "5",
//   },
//   {
//     input: "7 8",
//     output: "15",
//   },
// ];

// writeTestcase(inputFilePath, testcases[1].input).then(() => {
//   console.log('testcase is written.');
// })

// openInputFile(inputFilePath).then((fd) => console.log(fd)).catch((err) => {
//   console.error("Couldn't open the file");
// });
