// carrito.js
const carritoBtn = document.getElementById('btn-carrito-flotante');
const cantidadDiv = carritoBtn?.querySelector('.carrito-cantidad');

function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if(cantidadDiv) cantidadDiv.textContent = carrito.length;
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existe = carrito.find(p => p.codigo === producto.codigo);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({...producto, cantidad:1});
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Renderizar carrito en carrito.html
function renderCarritoPage() {
  const carritoList = document.getElementById('carrito-list');
  carritoList.innerHTML = '';

  if(!carritoList) return;
  
  carritoList.innerHTML = '';
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = 0;

  carrito.forEach(producto => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'col-12 d-flex align-items-center border p-2 rounded mb-2';
    div.innerHTML = `
      <img src="img/${producto.imagenes[0]}" alt="${producto.nombre}" width="30" height="30" class="me-2">
      <span class="me-auto">${producto.nombre}</span>
      <span class="me-2">x${producto.cantidad}</span>
      <span>$${subtotal}</span>
    `;
    carritoList.appendChild(div);
  });

  document.getElementById('total').textContent = total;
}

function vaciarCarrito(confirmar = true) {
  if(confirmar){
    if(!confirm("¿Estás seguro de vaciar tu carrito?\nEsta acción es irreversible y tendrás que añadir los productos otra vez :(")) return;
  }
  localStorage.removeItem('carrito');
  actualizarCarrito();
  renderCarritoPage();
}

actualizarCarrito();
