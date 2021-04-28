async function FirstTask(callback) {
    await setTimeout(function (){   
        console.log("First Task");            
        callback();
    }, 2000);
}

async function SecondTask() {
    await setTimeout(function (){   
        console.log("Second Task");            
    }, 2000);

    callback();
}

// async function ThirdTask(callback) {
//     await setTimeout(function (){   
//         console.log("Third Task");            
//     }, 2000);

//     callback();
// }


FirstTask(SecondTask);


