// pedidos.js

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pedidoForm");

  // Maneja el envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío real del formulario

    // Captura los valores ingresados
    const datos = {
      equipo: form.equipo.value,
      marca: form.marca.value,
      modelo: form.modelo.value,
      parte: form.parte.value,
      descripcion: form.descripcion.value
    };

    // Redirige a la página resumen con los datos como parámetros
    const query = new URLSearchParams(datos).toString();
    window.location.href = `resumen.html?${query}`;
  });
});
