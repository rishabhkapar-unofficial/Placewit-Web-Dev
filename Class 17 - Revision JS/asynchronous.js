
// setTimeout(() => {
//     console.log("Download started...");

//     setTimeout(() => {
//         console.log("Download is almost complete...");

//         setTimeout(() => {
//             console.log("Download is complete");
//         }, 2000)

//     }, 1500);

// }, 2000)

function startDownload(callback) {
    console.log("Download has started...");
    setTimeout(callback, 2000);
}

function donwloadAlmostComplete(callback) {
    console.log("Donwload is almost complete...");
    setTimeout(callback, 2000);
}

function downloadComplete() {
    console.log("Download is complete...");
}

// setTimeout(() => {
//     startDownload(() => {
//         donwloadAlmostComplete(downloadComplete);
//     })
// }, 2000);

setTimeout(startDownload(donwloadAlmostComplete(downloadComplete)), 2000);