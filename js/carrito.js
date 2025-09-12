const carritoBtn = document.getElementById('btn-carrito-flotante');
const cantidadDiv = carritoBtn?.querySelector('.carrito-cantidad');

function actualizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if(cantidadDiv) cantidadDiv.textContent = carrito.length;
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existe = carrito.find(p => p.id === producto.id);
  if(existe){
    existe.cantidad += 1;
  } else {
    carrito.push({...producto, cantidad:1});
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

actualizarCarrito();
