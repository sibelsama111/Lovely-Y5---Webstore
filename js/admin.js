// Datos de demo
const productosDemo = [
  {id:1,nombre:'iPhone 12',precio:399990,stock:5},
  {id:2,nombre:'iPad Air',precio:499990,stock:3},
  {id:3,nombre:'Notebook HP',precio:699990,stock:2}
];

const usuariosDemo = [
  {id:1,nombre:'Juan Pérez',email:'juan@mail.com',telefono:'+56912345678'},
  {id:2,nombre:'Ana Soto',email:'ana@mail.com',telefono:'+56987654321'}
];

const pedidosDemo = [
  {id:1,usuario:'Juan Pérez',producto:'iPhone 12',total:399990,estado:'Pendiente'},
  {id:2,usuario:'Ana Soto',producto:'iPad Air',total:499990,estado:'Enviado'}
];

// Dashboard
const totalProductos = document.getElementById('total-productos');
const totalUsuarios = document.getElementById('total-usuarios');
const totalPedidos = document.getElementById('total-pedidos');

if(totalProductos) totalProductos.textContent = productosDemo.length;
if(totalUsuarios) totalUsuarios.textContent = usuariosDemo.length;
if(totalPedidos) totalPedidos.textContent = pedidosDemo.length;

// Gestión Productos
const productosTable = document.getElementById('productos-table');
if(productosTable){
  productosDemo.forEach(p=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="alert('Editar ${p.nombre}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="alert('Eliminar ${p.nombre}')">Eliminar</button>
      </td>`;
    productosTable.appendChild(tr);
  });
}

function agregarProducto(){
  alert('Función agregar producto');
}

// Gestión Usuarios
const usuariosTable = document.getElementById('usuarios-table');
if(usuariosTable){
  usuariosDemo.forEach(u=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.id}</td>
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>${u.telefono}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="alert('Editar ${u.nombre}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="alert('Eliminar ${u.nombre}')">Eliminar</button>
      </td>`;
    usuariosTable.appendChild(tr);
  });
}

// Gestión Pedidos
const pedidosTable = document.getElementById('pedidos-table');
if(pedidosTable){
  pedidosDemo.forEach(p=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.id}</td>
      <td>${p.usuario}</td>
      <td>${p.producto}</td>
      <td>$${p.total}</td>
      <td>${p.estado}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="alert('Actualizar estado de ${p.usuario}')">Actualizar</button>
        <button class="btn btn-sm btn-danger" onclick="alert('Eliminar pedido ${p.id}')">Eliminar</button>
      </td>`;
    pedidosTable.appendChild(tr);
  });
}
