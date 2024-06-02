// Variables
let allContainerCart = document.querySelector('.container .row');
let itemsCarrito = document.querySelector('.card-items');
let precioTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.contador-carrito');

let arrayCompras = [];
let totalCard = 0;
let countProduct = 0;

// Event Listeners
document.getElementById('cart-icon').addEventListener('click', function() {
    document.getElementById('products-id').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('products-id').style.display = 'none';
});

loadEventListeners();

function loadEventListeners() {
    allContainerCart.addEventListener('click', addProduct);
    itemsCarrito.addEventListener('click', deleteProduct);
}

// Functions
function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        arrayCompras.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard = totalCard - priceReduce;
                totalCard = totalCard;
            }
        });
        arrayCompras = arrayCompras.filter(product => product.id !== deleteId);
        countProduct--;
    }
    if (arrayCompras.length === 0) {
        precioTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('.card-img-top').src,
        title: product.querySelector('.card-title').textContent,
        price: product.querySelector('.card-text').textContent.replace('$', '').replace(/\./g,''),
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    };

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard;

    const exist = arrayCompras.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = arrayCompras.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
        arrayCompras = [...pro];
    } else {
        arrayCompras = [...arrayCompras, infoProduct];
        countProduct++;
    }
    loadHtml();
}

function loadHtml() {
    clearHtml();
    arrayCompras.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">$${formatearNumero(price)}</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        itemsCarrito.appendChild(row);
        precioTotal.innerHTML = formatearNumero(totalCard);
        amountProduct.innerHTML = countProduct;
    });
}

function clearHtml() {
    itemsCarrito.innerHTML = '';
}

function formatearNumero(numero){
    return new Intl.NumberFormat("es-CL").format(numero);
}