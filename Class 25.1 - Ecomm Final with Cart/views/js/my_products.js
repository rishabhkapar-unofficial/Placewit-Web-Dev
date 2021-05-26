const url = "http://localhost:5555/products/myproducts";

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
    let editBtn = $(`<a href="/user/editproduct/${data._id}" class="btn btn-primary">Edit</a>`);
    let deleteBtn = $(`<button type="button" class="btn btn-danger">Delete</a>`);
    
    cardBody.append(cardTitle);
    cardBody.append(editBtn);
    cardBody.append(deleteBtn);
    div.append(image);
    div.append(cardBody);

    deleteBtn.click((e) => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:5555/products/' + data._id,
            method: 'DELETE'
        }).done(() => window.location.replace('http://localhost:5555/user/myproducts'));
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
