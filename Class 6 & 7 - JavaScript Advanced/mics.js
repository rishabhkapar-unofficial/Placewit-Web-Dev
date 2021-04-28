function getLastName(name) {
    return name.split(' ')[1];
}

function greet(getName, name) {
    console.log("Hello, " + getName(name) + "!");
}

greet((name) => name.split(' ')[0], "John Doe");



