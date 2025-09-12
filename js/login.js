// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;

  try {
    await auth.signInWithEmailAndPassword(correo, password);
    window.location.href = "perfil.html";
  } catch(err) {
    document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});
