const carritoBtn = document.getElementById('btn-carrito-flotante');
const cantidadDiv = carritoBtn?.querySelector('.carrito-cantidad');

function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if(cantidadDiv) cantidadDiv.textContent = carrito.length;
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existe = carrito.find(p => p.id === producto.id);
  if(existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({...producto, cantidad:1});
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  alert(`${producto.nombre} agregado al carrito`);
}

function renderCarritoPage() {
  const carritoList = document.getElementById('carrito-list');
  if(!carritoList) return;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carritoList.innerHTML = '';
  let total = 0;

  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    const div = document.createElement('div');
    div.className = 'col-12 mb-2';
    div.innerHTML = `
      <div class="d-flex align-items-center border rounded p-2">
        <img src="${p.imagen}" width="30" height="30" class="me-2">
        <span class="fw-bold me-2 textodark">${p.nombre}</span>
        <span class="badge bg-secondary textodark">${p.cantidad}</span>
        <span class="ms-auto fw-bold textodark">$${p.precio * p.cantidad}</span>
      </div>`;
    carritoList.appendChild(div);
  });

  const totalSpan = document.getElementById('total');
  if(totalSpan) totalSpan.textContent = total;
}

// Inicializar
document.addEventListener('DOMContentLoaded', actualizarCarrito);
