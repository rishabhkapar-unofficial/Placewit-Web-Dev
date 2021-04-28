let img = document.getElementById("img");
let url = 'https://dog.ceo/api/breeds/image/random';
let btn = document.getElementById("btn");

function getImage() {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function (response) {
        let imageurl = JSON.parse(response.target.response).message;
        img.src = imageurl;
    }
    request.send();
}

btn.onclick = getImage;