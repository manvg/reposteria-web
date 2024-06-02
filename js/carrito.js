// Variables
let contenidoCarrito = document.querySelector('.container .row');
let itemsCarrito = document.querySelector('.card-items');
let precioTotalCarrito = document.querySelector('.price-total');
let contadorCarrito = document.querySelector('.contador-carrito');

let arrayCompras = [];
let precioTotalProductos = 0;
let contadorProductos = 0;

// Event Listeners
document.getElementById('cart-icon').addEventListener('click', function() {
    document.getElementById('products-id').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('products-id').style.display = 'none';
});

loadEventListeners();

function loadEventListeners() {
    contenidoCarrito.addEventListener('click', agregarProducto);
    itemsCarrito.addEventListener('click', eliminarProducto);
}

// Functions
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const productoSeleccionado = e.target.parentElement.parentElement; 
        obtenerContenidoSeleccion(productoSeleccionado);
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const idProducto = e.target.getAttribute('data-id');
        arrayCompras.forEach(value => {
            if (value.id == idProducto) {
                let priceReduce = parseFloat(value.precio) * parseFloat(value.cantidad);
                precioTotalProductos = precioTotalProductos - priceReduce;
                precioTotalProductos = precioTotalProductos;
            }
        });
        arrayCompras = arrayCompras.filter(producto => producto.id !== idProducto);
        contadorProductos--;
    }
    if (arrayCompras.length === 0) {
        precioTotalCarrito.innerHTML = 0;
        contadorCarrito.innerHTML = 0;
    }
    cargarHtml();
}

function obtenerContenidoSeleccion(producto) {
    const infoProducto = {
        imagen: producto.querySelector('.card-img-top').src,
        titulo: producto.querySelector('.card-title').textContent,
        precio: producto.querySelector('.card-text').textContent.replace('$', '').replace(/\./g,''),
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    precioTotalProductos = parseFloat(precioTotalProductos) + parseFloat(infoProducto.precio);
    precioTotalProductos = precioTotalProductos;

    const existe = arrayCompras.some(producto => producto.id === infoProducto.id);
    if (existe) {
        const pro = arrayCompras.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        arrayCompras = [...pro];
    } else {
        arrayCompras = [...arrayCompras, infoProducto];
        contadorProductos++;
    }
    cargarHtml();
}

function cargarHtml() {
    limpiarHtml();
    arrayCompras.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id } = producto;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="item-content">
                <h5>${titulo}</h5>
                <h5 class="cart-price">$${formatearNumero(precio)}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        itemsCarrito.appendChild(row);
        precioTotalCarrito.innerHTML = formatearNumero(precioTotalProductos);
        contadorCarrito.innerHTML = contadorProductos;
    });
}

function limpiarHtml() {
    itemsCarrito.innerHTML = '';
}

function formatearNumero(numero){
    return new Intl.NumberFormat("es-CL").format(numero);
}