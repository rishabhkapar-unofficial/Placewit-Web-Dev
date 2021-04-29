function startDownload() {
    return new Promise((res, rej) => {
        console.log("Download has started");
        setTimeout(res, 1000);
    });
}


function download() {
    return new Promise((res, rej) => {
        console.log("Downloading...");
        setTimeout(res, 1000);
    });
}

function complete() {
    return new Promise((res, rej) => {
        console.log("Download complete...");
        setTimeout(res, 1000);
    });
}

setTimeout(() => {
    startDownload().then(download).then(complete).then(() => {
        console.log("File saved...");
    });
}, 1000);

