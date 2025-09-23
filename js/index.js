document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const navList = document.querySelector(".navbar-nav");

  if (usuarioActual && usuarioActual.categoria === "cliente") {
    // 1. Eliminar el link "Login"
    const loginLink = document.querySelector('.nav-link[href="login.html"]');
    if (loginLink) loginLink.parentElement.remove();

    // 2. Agregar saludo + logout en el navbar
    const li = document.createElement("li");
    li.className = "nav-item d-flex align-items-center gap-2";
    li.innerHTML = `
      <a href="perfil.html" class="fw-bold text-primary text-decoration-none">
        Hola, ${usuarioActual.nombres}
      </a>
      <button id="logoutBtn" class="btn btn-sm btn-outline-danger">Cerrar sesión</button>
    `;
    navList.appendChild(li);

    // 3. Mostrar saludo extra SOLO en index.html
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
      const hero = document.querySelector(".hero");
      if (hero) {
        const saludoCard = document.createElement("div");
        saludoCard.className = "card shadow-lg border-0 p-3 mt-3";
        saludoCard.innerHTML = `
          <div class="card-body text-center">
            <h2 class="text-success">
              Hola, <a href="perfil.html" class="text-decoration-none text-success fw-bold">
                ${usuarioActual.nombres}
              </a>! <3
            </h2>
          </div>
        `;
        hero.insertAdjacentElement("afterend", saludoCard);
      }
    }

    // 4. Botón logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioActual");
      window.location.href = "index.html";
    });
  }
});
