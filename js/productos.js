async function cargarProductos() {
  try {
    const res = await fetch('data/ProductosDisponibles.json');
    if (!res.ok) throw new Error("Error al cargar los productos");
    const productos = await res.json();

    const container = document.getElementById('productosContainer');
    container.innerHTML = ''; // Limpiar contenedor

    const formatoCLP = new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      minimumFractionDigits: 0 
    });

    productos.slice(0, 3).forEach(p => {
      const imagen = (p.imagenes && p.imagenes.length > 0) 
        ? `img/${p.imagenes[0]}` 
        : "img/default.png";

      const div = document.createElement('div');
      div.className = "col-md-4 mb-4";
      div.innerHTML = `
        <div class="card shadow-sm h-100">
          <img src="${imagen}" class="card-img-top textodark" alt="${p.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title textodark">${p.nombre}</h5>
            <p class="card-text textodark fw-bold">${formatoCLP.format(p.precio)}</p>
            <button class="btn btn-primary mt-auto w-100" onclick="agregarAlCarrito('${p.codigo}')">
              Agregar al carrito
            </button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error al cargar productos:", err);
    const container = document.getElementById('productosContainer');
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          No se pudieron cargar los productos. Intenta nuevamente más tarde.
        </div>
      </div>
    `;
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', cargarProductos);
