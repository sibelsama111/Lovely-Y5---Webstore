// registro.js
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();

  // Validar contraseña (mínimo 8, máximo 20, 1 mayúscula, 1 número, 1 símbolo)
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
  if (!passRegex.test(password)) return mostrarError("La contraseña debe tener 8-20 caracteres, una mayúscula, un número y un símbolo.");
  if (password !== confirmPassword) return mostrarError("Las contraseñas no coinciden");

  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(correo, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await db.collection("usuarios").doc(user.uid).set({
      nombres,
      apellidos,
      correo,
      telefono: document.getElementById("telefono").value.trim(),
      direccion: {
        calle: document.getElementById("calle").value.trim(),
        numero: document.getElementById("numero").value.trim(),
        poblacion: document.getElementById("poblacion").value.trim(),
        comuna: document.getElementById("comuna").value.trim(),
        region: document.getElementById("region").value.trim(),
        codigoPostal: document.getElementById("codigoPostal").value.trim(),
      }
    });

    mostrarExito("Registro exitoso ✅");
    document.getElementById("registroForm").reset();
  } catch (err) {
    mostrarError(err.message);
  }
});
