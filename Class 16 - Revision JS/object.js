var obj = {
    model: {
        company: "Ferrari",
        year: "2020"
    },
    34: "random",
    true: "yes",
    null: "this is null",
    helloworld: function hello() {
        console.log("Hello World!");
    }
};


console.log(obj);
// var keys = Object.keys(obj);
// for(var i = 0; i < keys.length; i++) {
//     var value = obj[keys[i]];
//     if(typeof value == "object") {
//         console.log("Key (", keys[i], ") -> ");
//         var innerkeys = Object.keys(value);
//         for(var j = 0; j < innerkeys.length; j++) {
//             console.log("\t", value[innerkeys[j]]);
//         }
//     } else {
//         console.log("Key (", keys[i], ") -> ", obj[keys[i]]);
//     }
// }

// console.log(obj.model);
// console.log(obj.year);
// console.log(obj.null);
// // console.log(obj.true);
// console.log(obj[34]);
// console.log(obj["model"]);


// console.log(typeof obj);

// console.log(obj.model);
// console.log(typeof obj.model);
// console.log(Object.keys(obj));