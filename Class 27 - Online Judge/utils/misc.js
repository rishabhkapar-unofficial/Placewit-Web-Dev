function generateFileName(username, question_title) {
    return username + '-' + question_title + '-' + generateRandomString(10);
}


function generateRandomString(length) {
    let randomString = '';

    for(let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random()*26);
        randomString += String.fromCharCode(65+randomNumber);
    }

    return randomString;
}


module.exports = { generateFileName, generateRandomString };