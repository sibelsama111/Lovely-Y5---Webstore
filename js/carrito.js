// js/carrito.js
// Centraliza lógica del carrito y actualización visual

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoFlotante();
}

// agregarAlCarrito acepta item {id,nombre,precio,imagen,stock,cantidad}
function agregarAlCarrito(item) {
  const carrito = obtenerCarrito();
  const idx = carrito.findIndex(it => String(it.id) === String(item.id));
  const cantidadAgregar = item.cantidad ? parseInt(item.cantidad,10) : 1;

  if (idx > -1) {
    // sumar cantidades
    carrito[idx].cantidad = (carrito[idx].cantidad || 1) + cantidadAgregar;
    // validar stock si existe
    if (item.stock && carrito[idx].cantidad > item.stock) {
      carrito[idx].cantidad = item.stock;
      alert('Se alcanzó el stock máximo disponible.');
    }
  } else {
    const nuevo = Object.assign({cantidad: cantidadAgregar}, item);
    // validar stock
    if (nuevo.stock && nuevo.cantidad > nuevo.stock) {
      nuevo.cantidad = nuevo.stock;
      alert('Se ajustó la cantidad al stock disponible.');
    }
    carrito.push(nuevo);
  }
  guardarCarrito(carrito);
  alert(`${item.nombre} agregado al carrito`);
}

function actualizarCarritoFlotante() {
  const carrito = obtenerCarrito();
  const cantidad = carrito.reduce((acc, item) => acc + (parseInt(item.cantidad,10) || 1), 0);
  const span = document.querySelector('#btn-carrito-flotante .carrito-cantidad') || document.querySelector('.carrito-cantidad');
  if (span) span.textContent = cantidad > 0 ? cantidad : '';
}

function renderCarritoPage() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById('carrito-list');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const precioUnitario = parseFloat(item.precio) || 0;
    const cantidad = parseInt(item.cantidad,10) || 1;
    total += precioUnitario * cantidad;
    const div = document.createElement('div');
    div.className = 'col-12';
    div.innerHTML = `
      <div class="card d-flex flex-row align-items-center p-2">
        <img src="${item.imagen || 'img/default.png'}" class="card-img-top me-3" alt="${item.nombre}" style="max-width:100px;">
        <div class="flex-grow-1">
          <h5>${item.nombre}</h5>
          <p>${item.descripcion || ''}</p>
          <p><strong>$${precioUnitario}</strong></p>
          <div>
            <label>Cantidad:</label>
            <input type="number" min="1" value="${cantidad}" class="form-control d-inline-block" style="width:70px;" onchange="actualizarCantidad(${index}, this.value)">
          </div>
        </div>
        <button class="btn btn-sm btn-danger ms-2" onclick="eliminar(${index})">Eliminar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  document.getElementById('total').textContent = total;
  actualizarCarritoFlotante();
}

function eliminar(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderCarritoPage();
}

function actualizarCantidad(index, value) {
  const carrito = obtenerCarrito();
  const cantidad = Math.max(1, parseInt(value,10) || 1);
  carrito[index].cantidad = cantidad;
  // validar stock si existe
  if (carrito[index].stock && carrito[index].cantidad > carrito[index].stock) {
    carrito[index].cantidad = carrito[index].stock;
    alert('Se alcanzó el stock máximo disponible.');
  }
  guardarCarrito(carrito);
  renderCarritoPage();
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  actualizarCarritoFlotante();
}
document.addEventListener('DOMContentLoaded', actualizarCarritoFlotante);
window.addEventListener('storage', actualizarCarritoFlotante);
setInterval(actualizarCarritoFlotante, 1200);
