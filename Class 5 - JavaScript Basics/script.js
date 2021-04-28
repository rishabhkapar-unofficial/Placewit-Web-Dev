// for(let i = 0; i < 10; i++)
//     console.log(i);
// marks = 70;
// if(marks >= 85)
//     console.log("A");
// else
//     console.log("F");

// let i = 1;
// let output = "";
// while(i <= 10)
//     output += " " + i++;

// console.log(output);

// let arr = [1, "two", 3, false, 4.324, [2, "three"]];
// console.log(arr);

// conso
// console.log(typeof arr);

// let obj = {
//     a: 20,
//     pi: 3.14,
//     name: "placewit"
// }

// function greet(name) {
//     console.log("Hello, " + name +"!");
// }

// function add(a, b) {
//     return a + b;
// }

// greet("Placewit");
// console.log(add(4, 5));

// function calculator(a, b, operation) {
//     let add = function(a, b) {
//         console.log(a + b);
//     }

//     let subtract = function(a, b) {
//         console.log(a - b);
//     }

//     if(operation === "add")
//         add(a, b);
//     else
//         subtract(a, b);
// }

// function calculator(operation) {
//     let add = function(a, b) {
//         return a+b;
//     }

//     let subtract = function(a, b) {
//         return a-b;
//     }

//     if(operation === "add")
//         return add;
//     else
//         return subtract;
// }

// let func = calculator("subtract");
// let func2 = calculator("add")
// console.log(func);
// console.log(func2);
// console.log(func(3, 4));
// console.log(func2(3, 4));

function getFirstName(name) {
    return name.split(" ")[0];
}

function getLastName(name) {
    return name.split(" ")[1];
}

function greet(crap, name) {
    console.log(crap);
    console.log("Hello, " + crap(name) + "!");
}

greet(getLastName, "John Doe");