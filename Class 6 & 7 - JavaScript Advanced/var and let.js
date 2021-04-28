var a = 20;
const b = 20; // Block level scope
function fun() {
    var a = 30;
    {
        var a = 40;
        console.log(a);
    }
    // fun1();
    console.log(a);
}

fun();
console.log(a); // 20

// let a = 20;

// function fun() {
//     let a = 30;
//     {   
//         let a = 40;
//         console.log(a); // 40
//     }
//     console.log(a); // 30
// }

// fun();
// console.log(a); // 20