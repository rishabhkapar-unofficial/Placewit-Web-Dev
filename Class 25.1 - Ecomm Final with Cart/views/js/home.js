const url = "http://localhost:5555/products";
// Add to cart url
const addToCartUrl = 'http://localhost:5555/products/cart/';
$(() => {
    $.get(url).done((data) => { populateData(data) });
});

function createCard(data) {
    if(!data.image_url)
        data.image_url = "#";

    let div = $('<div class="card" style="width: 18rem;"></div>');
    let image = $(`<img class="card-img-top" src="${data.image_url}" alt="Card image cap">`);
    let cardBody = $('<div class="card-body"></div>');
    let cardTitle = $(`<h5 class="card-title">${data.name}<span>Rs. ${data.price}</span></h5>`);
    let addCartBtn = $(`<a class="btn btn-primary">Add To Cart</a>`);
    
    cardBody.append(cardTitle);
    cardBody.append(addCartBtn);
    div.append(image);
    div.append(cardBody);

    addCartBtn.click((e) => {
        e.preventDefault();
        $.post(addToCartUrl + data._id);
    });

    return div;
}

function populateData(data) {
    let main = $("main");
    main.empty();
    for(let i = 0; i < data.length; i++) {
        main.append(createCard(data[i]));
    }
}
