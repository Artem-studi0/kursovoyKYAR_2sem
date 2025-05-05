function loadProducts() {
    fetch('products.xml')
        .then(r => r.text())
        .then(xml => {
            const products = new DOMParser().parseFromString(xml, "text/xml").getElementsByTagName("product");
            const catalog = document.querySelector('#sales .catalog__list');
            catalog.innerHTML = '';
            
            for (let p of products) {
                const name = p.getElementsByTagName("name")[0].textContent;
                const price = p.getElementsByTagName("regular")[0].textContent;
                const sale = p.getElementsByTagName("sale")[0].textContent;
                const img = p.getElementsByTagName("image")[0].textContent;
                
                catalog.insertAdjacentHTML('beforeend', `
                    <li class="catalog_item">
                        <article class="product">
                            <img src="${img}" alt="${name}" class="product__image">
                            <h3 class="product__title">
                                <button class="product__detail">${name}</button>
                                <div class="produucts">
                                    <p class="product__price">${price}<span class="currency">bun</span></p>
                                    <p2 class="product__price1">${sale}<span class="currency1">bun</span></p2>
                                </div>
                            </h3>
                            <button class="product__add" type="button">заказать</button>
                        </article>
                    </li>
                `);
            }
            const orderButtons = document.querySelectorAll('#sales .product__add');
            orderButtons.forEach(button => {
                button.addEventListener('click', function() {
                    window.location.href = 'cart.html';
                });
            });
        })
        .catch(e => console.error('Ошибка загрузки товаров:', e));
}
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    const orderButtons = document.querySelectorAll('.product__add:not(#sales .product__add)');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    });
}); 