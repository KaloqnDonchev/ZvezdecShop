const messageLib = require('../libraries/showMessage');
const init = () => {
    const buyButtons = document.querySelectorAll('.add-to-basket');
    if (buyButtons) {
        buyButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                if (localStorage.getItem('user')) {
                    const productId = button.dataset.id;
                    const bodyObj = {
                        name: productId
                    };
                    messageLib.showMessage(`${productId} was added to your cart`);

                    const options = {
                        method: 'POST',
                        body: JSON.stringify(bodyObj),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    fetch('/get-product', options).then((response) => {
                        return response.json();
                    }).then((product) => {
                        // Implementation
                        const userProperties = localStorage.getItem('user');
                        const userObject = JSON.parse(userProperties);
                        userObject.user.basket.items.push(product);
                        const objectAsString = JSON.stringify(userObject);
                        localStorage.setItem('user', objectAsString);
                    });
                } else {
                    messageLib.showMessage('You must be logged in to buy this product');
                }
            });
        });
    }
};

const buyButton = {
    init: init
};

module.exports = buyButton;