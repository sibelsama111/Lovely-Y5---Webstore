document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const rut = document.getElementById("rut").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const codigoPais = document.getElementById("codigoPais");
  const digitos = parseInt(codigoPais.selectedOptions[0].dataset.digitos);
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validaciones básicas
  if (!/^\d{7,8}-[0-9kK]$/.test(rut)) return mostrarError("RUT inválido. Formato correcto: 12345678-9");
  if (!/^[^@]+@[^@]+\.[a-z]{2,}$/.test(correo)) return mostrarError("Correo electrónico inválido");
  if (!new RegExp(`^\\d{${digitos}}$`).test(telefono)) return mostrarError(`El número telefónico debe tener ${digitos} dígitos`);

  // Validación contraseña fuerte
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;
  if (!passRegex.test(password)) return mostrarError("La contraseña debe tener 8-20 caracteres, al menos una mayúscula, un número y un símbolo");

  if (password !== confirmPassword) return mostrarError("Las contraseñas no coinciden");

  const cliente = {
    rut,
    nombres: document.getElementById("nombres").value.trim(),
    apellidos: document.getElementById("apellidos").value.trim(),
    correo,
    telefono: `${codigoPais.value} ${telefono}`,
    direccion: {
      calle: document.getElementById("calle").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      poblacion: document.getElementById("poblacion").value.trim(),
      comuna: document.getElementById("comuna").value.trim(),
      region: document.getElementById("region").value.trim(),
      codigoPostal: document.getElementById("codigoPostal").value.trim(),
    },
    password
  };

  try {
    // Guardado en localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(cliente);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarExito("Registro exitoso ✅");
    document.getElementById("registroForm").reset();
  } catch (err) {
    mostrarError("Error al guardar el usuario");
  }
});

function mostrarError(msg) {
  document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}

function mostrarExito(msg) {
  document.getElementById("mensaje").innerHTML = `<div class="alert alert-success">${msg}</div>`;
}
