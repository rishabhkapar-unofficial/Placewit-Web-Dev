function incrementer(initVal, inc) {
    let currVal = initVal;

    function increment() {
        currVal += inc;
        return currVal;
    }

    return increment;
}


let incrementerBy5 = incrementer(3, 3);
console.log(incrementerBy5());
console.log(incrementerBy5());

incrementerBy5 = incrementer(4, 10);

console.log(incrementerBy5());
console.log(incrementerBy5());
