const file = require('./getFirstName');

function greet(somefunc, name) {
    console.log("Hello, ", somefunc(name), "!");
}
console.log(file);
greet(file.getFirstName, 'John Cena');

// greet(file.getFirstName, 'John Cena');