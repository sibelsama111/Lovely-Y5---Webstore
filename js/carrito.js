// carrito.js
const carritoBtn = document.getElementById('btn-carrito-flotante');
const cantidadDiv = carritoBtn?.querySelector('.carrito-cantidad');

// Inicializamos Firebase (asegúrate de que firebase.js ya esté cargado)
const auth = firebase.auth();
const db = firebase.firestore();

async function actualizarCarrito() {
  const user = auth.currentUser;
  let cantidad = 0;

  if (user) {
    // Traer carrito desde Firestore
    const snapshot = await db.collection("usuarios").doc(user.uid).collection("carrito").get();
    cantidad = snapshot.size;
  } else {
    // Carrito local si no está logueado
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cantidad = carrito.length;
  }

  if (cantidadDiv) cantidadDiv.textContent = cantidad;
}

async function agregarAlCarrito(producto) {
  const user = auth.currentUser;

  if (user) {
    const carritoRef = db.collection("usuarios").doc(user.uid).collection("carrito").doc(producto.id.toString());
    const doc = await carritoRef.get();
    
    if (doc.exists) {
      await carritoRef.update({ cantidad: doc.data().cantidad + 1 });
    } else {
      await carritoRef.set({ ...producto, cantidad: 1 });
    }
  } else {
    // Carrito local
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  actualizarCarrito();
}

// Detecta cambios en el login
auth.onAuthStateChanged(() => actualizarCarrito());

// Inicializamos contador al cargar
actualizarCarrito();
