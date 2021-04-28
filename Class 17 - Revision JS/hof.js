function greeter(name, extractor) {
    console.log("Hello,", extractor(name));
}


function firstName(name) {
    return name.split(' ')[0];
}


function lastName(name) {
    return name.split(' ')[1];
}


// greeter('John Cena', firstName);
// let name = 'John-Cena-Brock-Lesnar';
greeter('John Cena', lastName);

// console.log(name.split('-'));