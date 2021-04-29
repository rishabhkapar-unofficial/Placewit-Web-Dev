function Student(_name, _age, _adhaar) {
    this.name = _name;
    this.age = _age;
    let adhaar = _adhaar;

    function privateFunc()  {
        console.log("Private function");
    }

    this.describe =  function() {
        console.log("My name is", this.name, " and my age is", this.age);
    },

    this.getAdhaar = function() {
        privateFunc();
        return adhaar;
    }

}

let obj = new Student("John", 65, 3497865);

// console.log(obj);
obj.describe();
console.log(obj.adhaar);
console.log(obj.getAdhaar());
// obj.privateFunc();