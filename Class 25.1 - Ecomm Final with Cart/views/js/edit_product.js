const productInfoUrl = "http://localhost:5555/products/" + window.location.href.split('/').pop();

$(() => {
    $.get(productInfoUrl).done((product) => {
        $('#name').val(product.name);
        $('#image_url').val(product.image_url);
        $('#price').val(product.price);
    });

    $("#update-btn").click((e) => {
        e.preventDefault();
        let product = {};
        product.name = $('#name').val();
        product.image_url = $('#image_url').val();
        product.price = $('#price').val();
        $.post(productInfoUrl, product).done(() => window.location.replace("http://localhost:5555/user/myproducts"));
    })
});
