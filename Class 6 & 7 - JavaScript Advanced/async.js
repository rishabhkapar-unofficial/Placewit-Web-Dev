function anotherAsyncTask() {
    console.log("Another async task was done.");
    setTimeout(() => {console.log("This is third async function.")}, 2000);
}

setTimeout(function () {
    console.log("Async work was done.");
    setTimeout(anotherAsyncTask, 2000);
}, 3000);



