window.onload = function() {
    let productInfo = document.getElementById('productInfo');

    let urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id');

    if (!productId) {
        productInfo.innerHTML = '<p>Ошибка: ID товара не указан.</p>';
        return;
    }

    fetch(`https://dummyjson.com/products/${productId}`) 
        .then(res => res.json())
        .then(product => {
            document.title = product.title;
            productInfo.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" class="product-image-detail">
                <h2>${product.title}</h2>
                <div class="about-product">
                    <p><b>Описание:</b> ${product.description}</p>
                    <div class="product-sec-ditails">
                        <p><b>Цена:</b> ${product.price} $</p>
                        <div class="rating"><p><b>Рейтинг:</b> ${product.rating}</p> <img class="star" src="https://img.icons8.com/?size=100&id=19295&format=png&color=000000"></div>
                        <p><b>Категория:</b> ${product.category}</p>
                    </div>
                </div>
                <div class="buttons">
                    <button class="buy-btn">Купить сейчас</button>
                    <button class="basket-btn">Добавить в карзину</button>
                </div>
                
            `;
        })
};