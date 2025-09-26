// Función para cargar productos desde JSON
async function cargarProductos() {
  try {
    const res = await fetch('data/ProductosDisponibles.json');
    const productos = await res.json();

    const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' , minimumFractionDigits: 0 });
    document.getElementById('p.precio').textContent = formatoCLP.format(p.precio);

    const container = document.getElementById('productosContainer');
    container.innerHTML = ''; // Limpiar contenedor

    // Solo los primeros 3 productos
    productos.slice(0, 3).forEach(p => {
      const div = document.createElement('div');
      div.className = "col-md-4 mb-4";
      div.innerHTML = `
        <div class="card shadow-sm">
          <img src="img/${p.imagenes[0]}" class="card-img-top textodark" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title textodark">${p.nombre}</h5>
            <p class="card-text textodark">${p.precio}</p>
            <button class="btn btn-primary w-100" onclick="agregarAlCarrito('${p.codigo}')">Agregar al carrito</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  } catch(err) {
    console.error("Error al cargar productos:", err);
  }
}

// Función para agregar al carrito (mantener tu carrito.js funcional)
function agregarAlCarrito(codigo){
  fetch('data/ProductosDisponibles.json')
    .then(res => res.json())
    .then(productos => {
      const producto = productos.find(p => p.codigo === codigo);
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const existe = carrito.find(p => p.codigo === codigo);

      if(existe){
        existe.cantidad += 1;
      } else {
        carrito.push({...producto, cantidad:1});
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito(); // Actualiza contador flotante
      alert(`${producto.nombre} agregado al carrito`);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', cargarProductos);
