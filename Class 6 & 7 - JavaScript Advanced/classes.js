// this.a = 5;
// console.log(this);

function Car(doors, wheels) {
    this.doors = 4;
    this.wheels = 4; // public data member
    if(typeof doors != "undefined")
        this.doors = doors;
    if(typeof wheels != "undefined")
        this.wheels = wheels;

    let company = "TATA"; // private data member

    console.log(company);
    this.drive = function () { // public member function
        console.log("Driving...");
    }

    let fly = function() {  // private member function
        console.log("Flying....");
    }
}

let c1 = new Car(2, 3);
let c2 = new Car();
c1.drive();
c1.fly();
console.log(c1.doors);
console.log(c1.company);
console.log(c1);
console.log(c2);

