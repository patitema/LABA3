window.onload = function() {
    let productList = document.getElementById('productList');
    let searchForm = document.getElementById('searchForm');
    let searchInput = document.getElementById('searchInput');

    function loadProducts(query = "") {
        if (!query) {
            query = '';
        }
        let url = 'https://dummyjson.com/products';
        if (query) {
            url = url + '/search?q=' + query;
        }
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                productList.innerHTML = '';
                
                if (data.products && data.products.length > 0) {
                    data.products.forEach((product) => {
                        let li = document.createElement('li');
                        li.className = 'product-card';
                        li.innerHTML = `
                            <a href="/product.html?id=${product.id}" alt="${product.title}">
                                <img src="${product.thumbnail}" class="product-image">
                                <h3 class="product-title" >${product.title}</h3>
                                <p class="product-price">Цена: ${product.price} $</p>
                            </a>
                        `;
                        productList.appendChild(li);
                    });
                } else {
                    productList.innerHTML = '<li class="no-products">Товаров не найдено</li>';
                }
            })
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let query = searchInput.value.trim();
        loadProducts(query);
    });

    loadProducts();
};