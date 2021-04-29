let image = $('#image');
let button = $('#btn');

image.css({height: '400px', width: '400px', backgroundColor: 'cyan'});

button.click(() => {
    const url = 'https://dog.ceo/api/breeds/image/random';
    $.get(url, (response) => {
        image.css({'background-image': "url(" + response.message + ")" });
    });
});

