// let student = {
//     name: 'John',
//     age: '65'
// }

// let student1 = {

// }

function Student(_name, _age, _adhaar) {
    let adhaarno = _adhaar;

    let obj = {
        name: _name, 
        age: _age,

        describe: function() {
            console.log("My name is", this.name, " and my age is", this.age);
        },

        getAdhaar: function() {
            return adhaarno;
        }
    };

    return obj;
}

let obj = Student("John", "65", 12434);
let obj2 = Student("sldkfj", "3847", 84576);

// console.log(obj);
// console.log(obj2);
// obj.describe();
// obj2.describe();
console.log(obj);
console.log(obj.getAdhaar());