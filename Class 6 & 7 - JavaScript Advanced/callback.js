function getFirstName(name) {
    return name.split(' ')[0];
}

function getLastName(name) {
    return name.split(' ')[1];
}

function greet(getName, name) {
    console.log("Hello, " + getName(name) + "!");
}

greet(getFirstName, "John Doe");

function counter(initialValue, jump) {
    let count = initialValue;
    function increment() {
        count += jump;
        return count;
    }

    return increment;
}

console.log(counter(5, 5));
console.log(counter(5, 5));
console.log(counter(5, 5));

let fiveCounter = counter(5, 5);
console.log(fiveCounter);
console.log(fiveCounter());
console.log(fiveCounter());
console.log(fiveCounter());

let threeCounter = counter(3, 1);
console.log(threeCounter);
console.log(threeCounter());
console.log(threeCounter());
console.log(threeCounter());