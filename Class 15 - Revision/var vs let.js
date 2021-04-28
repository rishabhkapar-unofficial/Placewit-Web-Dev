function helloworld() {
    var a = 5;
    {
       var b = 6;
       console.log(a);
       console.log(b);
    }

    console.log(a);
    console.log(b);
}

function helloworldwithlet() {
    let a = 5;
    {
       let b = 6;
       console.log(a);
       console.log(b);
    }

    console.log(a);
    console.log(b);
}

helloworldwithlet();