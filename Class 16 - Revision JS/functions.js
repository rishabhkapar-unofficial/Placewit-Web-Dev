function add(a, b) {
    if(typeof a != "number" || typeof b != "number")
        return "Not A Number";
    return a+b;
}

// console.log(typeof add("abc", "def"));
// console.log(add("abc", "def"));

console.log(typeof add(45, 5));
console.log(add(45, 5));

