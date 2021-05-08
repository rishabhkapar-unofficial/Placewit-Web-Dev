const url = "http://localhost:5555/products";

$(() => {
    $.get(url).done((data) => { populateData(data) });
});

function createCard(data) {
    if(!data.image_url)
        data.image_url = "#";
    let card = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${data.image_url}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${data.name}<span>Rs. ${data.price}</span></h5>
              <p class="card-text">${data.manufactured_by}</p>
              <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
        </div>
    `;

    return card;
}

function populateData(data) {
    let main = $("main");
    main.empty();
    for(let i = 0; i < data.length; i++) {
        main.append(createCard(data[i]));
    }
}
