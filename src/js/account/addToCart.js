const { response } = require("express");

const init = () => {
    const buyButtons = document.querySelectorAll('.add-to-basket');

    if (buyButtons) {
        buyButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const productId = button.dataset.id;

                const options = {
                    method: 'POST',
                    body: productId,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                fetch('/get-product', options).then((response) => {
                    return response.json();
                }).then((product) => {
                    // Implementation
                });
            });
        });
    }
};

const buyButton = {
    init: init
};

module.exports = buyButton;