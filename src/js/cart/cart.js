function addToCart(product) {
    const itemString = `
    <li class="has-sub cart-list" data-id="${product.name}"><a>
        <div class="cart-item" >
            <img src="/img${product.url}" class="cart-item-image"/>
            <h1 class="cart-item-title">${product.title}</h1>
            <h1 class="cart-item-price">${product.price} ${product.currency}</h1>
            <button class="itemboxes-buybutton remove-item" data-id="${product.name}">Remove item</button>
        </div>
    </a></li>`;
    document.getElementById('add-item').innerHTML += itemString;
    const buttonArray = document.querySelectorAll('.cart-item .remove-item');
    buttonArray.forEach((button) => {
        button.addEventListener('click', () => {
            let userObjectString = localStorage.getItem('user');
            const userObject = JSON.parse(userObjectString);
            const cartListArray = document.querySelectorAll('.cart-list');
            cartListArray.forEach((element) => {
                if (element.dataset.id == button.dataset.id) {
                    element.remove();
                    const itemIndex = userObject.user.basket.items.findIndex((item) => element.dataset.id == item.name);
                    userObject.user.basket.items.splice(itemIndex, 1);
                }
            });
            userObjectString = JSON.stringify(userObject);
            localStorage.setItem('user', userObjectString);
        });
    });
}

function init() {
    const userObjectString = localStorage.getItem('user');
    const userObject = JSON.parse(userObjectString);
    userObject.user.basket.items.forEach((item) => {
        addToCart(item);
    });
}

const basketManager = {
    addToCart: addToCart,
    init: init
};

module.exports = basketManager;



