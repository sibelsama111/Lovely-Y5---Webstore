// ===== VARIABLES =====
const fotoPreview = document.querySelector("#fotoPerfilPreview img");
const opcionesFotos = document.querySelectorAll(".opcion-foto");
const formPerfil = document.getElementById("formPerfil");
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const pais = document.getElementById("pais");
const listaPedidos = document.getElementById("listaPedidos");

// ===== PERFIL =====
window.addEventListener("DOMContentLoaded", () => {
  // Cargar datos de perfil
  fotoPreview.src = localStorage.getItem("fotoPerfil") || "img/pficons/default.png";
  nombres.value = localStorage.getItem("nombres") || "";
  apellidos.value = localStorage.getItem("apellidos") || "";
  email.value = localStorage.getItem("email") || "";
  telefono.value = localStorage.getItem("telefono") || "";
  direccion.value = localStorage.getItem("direccion") || "";
  pais.value = localStorage.getItem("pais") || "";

  cargarPedidos();
});

// Cambiar foto
opcionesFotos.forEach(img => {
  img.addEventListener("click", () => {
    fotoPreview.src = img.src;
    localStorage.setItem("fotoPerfil", img.src);
  });
});

// Guardar perfil
formPerfil.addEventListener("submit", e => {
  e.preventDefault();
  localStorage.setItem("nombres", nombres.value);
  localStorage.setItem("apellidos", apellidos.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("telefono", telefono.value);
  localStorage.setItem("direccion", direccion.value);
  localStorage.setItem("pais", pais.value);
  alert("Perfil actualizado ✅");
});

// ===== PEDIDOS =====
if (!localStorage.getItem("pedidos")) {
  localStorage.setItem("pedidos", JSON.stringify([]));
}

// Crear pedido de ejemplo
function crearPedidoEjemplo() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  const nuevoPedido = {
    id: "#000" + (pedidos.length + 1),
    nombres: localStorage.getItem("nombres") || "Cliente",
    apellidos: localStorage.getItem("apellidos") || "Demo",
    email: localStorage.getItem("email") || "cliente@demo.com",
    productos: [
      { id: "prod1", nombre: "Audífonos", precio: 25000, cantidad: 1, img: "img/prod1.png" },
      { id: "prod2", nombre: "Teclado", precio: 40000, cantidad: 1, img: "img/prod2.png" }
    ],
    total: 25000 + 40000 + 5000,
    estado: "iniciado"
  };

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  cargarPedidos();
}

// Mostrar pedidos en perfil
function cargarPedidos() {
  listaPedidos.innerHTML = "";
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.forEach(pedido => {
    const div = document.createElement("div");
    div.classList.add("col-12");
    div.innerHTML = `
      <div class="card p-3 shadow-sm">
        <p><b>ID Pedido:</b> ${pedido.id}</p>
        <ul>
          ${pedido.productos.map(p => `
            <li>
              <img src="${p.img}" width="40" class="me-2">
              ${p.nombre} - $${p.precio} (x${p.cantidad})
            </li>`).join("")}
        </ul>
        <p><b>Total:</b> $${pedido.total}</p>
        <p><b>Estado:</b> ${pedido.estado}</p>
        <button class="btn btn-outline-danger btn-sm" onclick="solicitud('${pedido.id}')">Solicitar cambio</button>
      </div>
    `;
    listaPedidos.appendChild(div);
  });
}

// Enviar solicitud personalizada
function solicitud(idPedido) {
  const razon = prompt(`Escribe tu solicitud para el pedido ${idPedido}:\n(Ej: quiero cancelar mi pedido)`);
  if (razon) {
    alert(`Solicitud enviada: "${razon}"\nSerá revisada por un administrador.`);
    // Aquí puedes guardar la solicitud en localStorage o enviarla a un backend
  }
}
