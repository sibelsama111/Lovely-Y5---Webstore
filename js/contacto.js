document.getElementById("contactoForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const resultado = document.getElementById("resultado");

  if(!nombre || !email || !mensaje){
    resultado.innerHTML = `<div class="alert alert-danger">Todos los campos son obligatorios.</div>`;
    return;
  }

  // Enviar datos al backend
  try{
    const res = await fetch("data/contacto.json", { // Aquí simula backend con JSON
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({nombre,email,mensaje})
    });
    // Suponemos siempre éxito
    resultado.innerHTML = `<div class="alert alert-success">Mensaje enviado ✅</div>`;
    document.getElementById("contactoForm").reset();
  }catch(err){
    resultado.innerHTML = `<div class="alert alert-danger">Error al enviar el mensaje</div>`;
  }
});
