let a = {
    number: 10,
}

let b = Object.create(a);
b.c = 30;
console.log(b);
