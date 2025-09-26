let productos = [];

// Formato CLP
const formatoCLP = new Intl.NumberFormat('es-CL', { 
  style: 'currency', 
  currency: 'CLP',
  minimumFractionDigits: 0 
});

// Cargar productos desde JSON
async function cargarProductos() {
  try {
    const res = await fetch('data/ProductosDisponibles.json');
    if (!res.ok) throw new Error("Error al cargar los productos");
    productos = await res.json();
  } catch (err) {
    console.error("Error al cargar productos:", err);
    productos = [];
  }
}

// Render para la página de inicio (solo 3 productos)
function renderInicio() {
  const container = document.getElementById('productosContainer');
  if (!container) return;
  container.innerHTML = '';

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
          <h5 class="card-title textodark">
            <a href="detalle-producto.html?id=${encodeURIComponent(p.codigo)}" class="text-decoration-none textodark">
              ${p.nombre}
            </a>
          </h5>
          <p class="card-text textodark fw-bold">${formatoCLP.format(p.precio)}</p>
          <button class="btn btn-primary mt-auto w-100" onclick="agregarAlCarritoCodigo('${p.codigo}')">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Render para la página de productos (todos, con filtros)
function renderProductos() {
  const productosList = document.getElementById('productos-list');
  if (!productosList) return;

  productosList.innerHTML = '';
  const buscador = (document.getElementById('buscador')?.value || '').toLowerCase();
  const categoria = document.getElementById('filtro-categoria')?.value || '';
  const modelo = (document.getElementById('filtro-modelo')?.value || '').toLowerCase();
  const orden = document.getElementById('orden-precio')?.value || 'desc';

  let filtrados = productos.filter(p => {
    let match = true;
    if (buscador && !( (p.nombre||'').toLowerCase().includes(buscador) || (p.descripcion||'').toLowerCase().includes(buscador))) match = false;
    if (categoria && p.categoria !== categoria) match = false;
    if (modelo && !( (p.nombre||'').toLowerCase().includes(modelo) )) match = false;
    return match;
  });

  filtrados.sort((a,b) => {
    const pa = parseFloat(a.precio) || 0;
    const pb = parseFloat(b.precio) || 0;
    return orden === 'desc' ? pb - pa : pa - pb;
  });

  if (!filtrados.length) {
    productosList.innerHTML = '<div class="col-12 text-center text-danger">No hay productos para mostrar.</div>';
    return;
  }

  filtrados.forEach(p => {
    const imgSrc = (Array.isArray(p.imagenes) && p.imagenes[0]) 
      ? (p.imagenes[0].startsWith('http') ? p.imagenes[0] : 'img/' + p.imagenes[0])
      : 'img/default.png';

    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4 textodark';
    div.innerHTML = `<div class="card p-3 text-center h-100">
      <img src="${imgSrc}" class="card-img-top mb-2" alt="${p.nombre}" onerror="this.src='img/default.png'">
      <h5>
        <a href="detalle-producto.html?id=${encodeURIComponent(p.codigo)}" class="text-decoration-none textodark">${p.nombre}</a>
      </h5>
      <p class="price">${formatoCLP.format(p.precio)}</p>
      <p>${p.descripcion || ''}</p>
      ${p.specs ? `<p class="specs textodark">${p.specs}</p>` : ''}
      <button class="btn btn-success rounded-pill mt-auto">Añadir al carrito</button>
    </div>`;
    productosList.appendChild(div);

    div.querySelector('button').addEventListener('click', () => agregarAlCarrito({
      id: p.codigo,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: parseFloat(p.precio) || 0,
      imagen: imgSrc,
      stock: parseInt(p.stock) || 0
    }));
  });
}

// Render detalle de producto
function renderDetalle() {
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get('id');
  if (!codigo) return;

  const producto = productos.find(p => p.codigo === codigo);
  if (!producto) return;

  const container = document.getElementById('detalleProducto');
  if (!container) return;

  const imgSrc = (Array.isArray(producto.imagenes) && producto.imagenes[0]) 
    ? (producto.imagenes[0].startsWith('http') ? producto.imagenes[0] : 'img/' + producto.imagenes[0])
    : 'img/default.png';

  container.innerHTML = `
    <div class="card p-3">
      <img src="${imgSrc}" class="card-img-top mb-3" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p class="fw-bold">${formatoCLP.format(producto.precio)}</p>
      <p>${producto.descripcion || ''}</p>
      ${producto.specs ? `<p class="specs">${producto.specs}</p>` : ''}
      <button class="btn btn-success w-100 mt-3" onclick="agregarAlCarrito({
        id: '${producto.codigo}',
        nombre: '${producto.nombre}',
        descripcion: '${producto.descripcion}',
        precio: ${parseFloat(producto.precio) || 0},
        imagen: '${imgSrc}',
        stock: ${parseInt(producto.stock) || 0}
      })">
        Añadir al carrito
      </button>
    </div>
  `;
}

// Helper: agregar al carrito por código
function agregarAlCarritoCodigo(codigo) {
  const p = productos.find(pr => pr.codigo === codigo);
  if (!p) return;
  let imgSrc = (Array.isArray(p.imagenes) && p.imagenes[0]) 
    ? (p.imagenes[0].startsWith('http') ? p.imagenes[0] : 'img/' + p.imagenes[0])
    : 'img/default.png';

  agregarAlCarrito({
    id: p.codigo,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: parseFloat(p.precio) || 0,
    imagen: imgSrc,
    stock: parseInt(p.stock) || 0
  });
}

// Inicialización global
document.addEventListener('DOMContentLoaded', async () => {
  await cargarProductos();

  // Si existe el contenedor de inicio
  if (document.getElementById('productosContainer')) renderInicio();

  // Si existe el contenedor de productos
  if (document.getElementById('productos-list')) {
    // cargar categorías dinámicamente
    const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))];
    const selectCat = document.getElementById('filtro-categoria');
    if (selectCat) {
      categorias.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        selectCat.appendChild(opt);
      });
    }
    renderProductos();

    document.getElementById('buscador')?.addEventListener('input', renderProductos);
    document.getElementById('filtro-categoria')?.addEventListener('change', renderProductos);
    document.getElementById('filtro-modelo')?.addEventListener('input', renderProductos);
    document.getElementById('orden-precio')?.addEventListener('change', renderProductos);
  }

  // Si existe detalle
  if (document.getElementById('detalleProducto')) renderDetalle();
});
