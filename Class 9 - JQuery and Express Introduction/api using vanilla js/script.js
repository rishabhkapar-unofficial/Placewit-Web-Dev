let image = $("#image");
let changeBtn = $("#btn");
const url = 'https://dog.ceo/api/breeds/image/random';


changeBtn.click(changeImage);


function changeImage() {
    $.get(url).done(function (response) {
        console.log(response.message);
        image.attr('src', response.message);
    })
}

