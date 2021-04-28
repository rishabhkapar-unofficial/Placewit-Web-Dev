function FirstTask() {
    return new Promise(function(resolve, reject) {
        setTimeout(function ()
            {   
                console.log("First Task") 
                // resolve();
                reject();
            }, 2000);
    });
}

function SecondTask() {
    return new Promise(function(resolve, reject) {
        setTimeout(function ()
            {   
                console.log("Second Task") 
                resolve();
            }, 2000);
    });
}

function ThirdTask() {
    return new Promise(function(resolve, reject) {
        setTimeout(function ()
            {   
                console.log("Third Task") 
                resolve();
            }, 2000);
    });
}

// let promise = new Promise(function(resolve, reject) {
//     setTimeout(function () {   
//         console.log("First Task") 
//     }, 2000);

//     setTimeout(function() {
//         console.log("setTimeout");
//         resolve();
//     }, 4000);
// });

FirstTask().then(SecondTask).then(ThirdTask).catch(() => {});
// promise.then(SecondTask).then(ThirdTask);