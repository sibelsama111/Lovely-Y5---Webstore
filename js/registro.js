document.getElementById("registroForm").addEventListener("submit", function(e){
  e.preventDefault();

  const rut = document.getElementById("rut").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  function mostrarError(msg){
    document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger">${msg}</div>`;
  }

  function mostrarExito(msg){
    document.getElementById("mensaje").innerHTML = `<div class="alert alert-success">${msg}</div>`;
  }

  if(!/^\d{7,8}-[0-9kK]$/.test(rut)) return mostrarError("RUT inválido. Formato correcto: 12345678-9");
  if(!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(correo)) return mostrarError("Correo inválido");
  if(password.length<8 || password.length>20) return mostrarError("La contraseña debe tener entre 8 y 20 caracteres");
  if(!/[A-Z]/.test(password)) return mostrarError("La contraseña debe contener al menos una mayúscula");
  if(!/[0-9]/.test(password)) return mostrarError("La contraseña debe contener al menos un número");
  if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return mostrarError("La contraseña debe contener al menos un símbolo");
  if(password!==confirmPassword) return mostrarError("Las contraseñas no coinciden");

  const cliente = {
    rut,
    nombres: document.getElementById("nombres").value.trim(),
    apellidos: document.getElementById("apellidos").value.trim(),
    correo,
    password
  };

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(cliente);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  mostrarExito("Registro exitoso ✅");
  document.getElementById("registroForm").reset();
});
