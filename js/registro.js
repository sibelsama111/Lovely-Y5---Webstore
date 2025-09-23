document.getElementById("registroForm").addEventListener("submit", function(e){
  e.preventDefault();

  const rut = document.getElementById("rut").value.trim();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const codigoArea = document.getElementById("codigo-area").value;
  const telefono = document.getElementById("telefono").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const mensajeDiv = document.getElementById("mensaje");

  function mostrarError(msg){
    mensajeDiv.innerHTML = `<div class="alert alert-danger">${msg}</div>`;
  }

  function mostrarExito(msg){
    mensajeDiv.innerHTML = `<div class="alert alert-success">${msg}</div>`;
  }

  // Validaciones
  if(!/^\d{7,8}-[0-9kK]$/.test(rut)) return mostrarError("RUT inválido. Formato correcto: 12345678-9");
  if(!nombres || !apellidos) return mostrarError("Debe ingresar nombres y apellidos");
  if(!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(correo)) return mostrarError("Correo inválido");
  if(!codigoArea) return mostrarError("Seleccione código de área");
  if(!/^\d{7,15}$/.test(telefono)) return mostrarError("Teléfono inválido. Solo números, sin espacios ni guiones");
  if(password.length<8 || password.length>20) return mostrarError("La contraseña debe tener entre 8 y 20 caracteres");
  if(!/[A-Z]/.test(password)) return mostrarError("La contraseña debe contener al menos una mayúscula");
  if(!/[0-9]/.test(password)) return mostrarError("La contraseña debe contener al menos un número");
  if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return mostrarError("La contraseña debe contener al menos un símbolo");
  if(password !== confirmPassword) return mostrarError("Las contraseñas no coinciden");

  // Crear objeto cliente
  const cliente = {
    rut,
    nombres,
    apellidos,
    correo,
    "codigo-area": codigoArea,
    telefono: Number(telefono),
    password,
    direccion: "",
    pais: "",
    categoria: "cliente"
  };

  // Guardar en localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Evitar duplicados por correo
  if (usuarios.some(u => u.correo === correo)) {
    return mostrarError("Este correo ya está registrado");
  }

  usuarios.push(cliente);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  mostrarExito("Registro exitoso ✅");
  document.getElementById("registroForm").reset();
});
