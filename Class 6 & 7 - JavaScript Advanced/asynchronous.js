console.log("this is the first statement.");

while(1) {
    setTimeout(() => {console.log("this is the second statement.")}, 5000);
    break;
}

setTimeout(() => {console.log("this is the third statement.")}, 1000);

