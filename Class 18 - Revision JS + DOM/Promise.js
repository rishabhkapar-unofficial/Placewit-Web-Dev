function startDownload() {
    return new Promise((res, rej) => {
        console.log("Download has started...");
        // res(); 
        rej();
    });
}

startDownload().then(() => {
    console.log("Download is complete.");
}).catch(() => {
    console.log("There's an error.");
});

// startDownload().catch(() => {
//     console.log("There's an error.");
// }).then(() => {
//     console.log("Download is complete.");
// });