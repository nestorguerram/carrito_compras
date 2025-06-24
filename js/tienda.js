// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el enlace que despliega el menú ("Servicios")
  const toggle = document.querySelector(".dropdown-toggle");

  // Obtiene el contenedor padre del enlace (div.dropdown)
  const dropdown = toggle?.parentElement;

  // Si ambos elementos existen, configura la interacción
  if (toggle && dropdown) {
    // Al hacer clic en "Servicios", alternar la visibilidad del menú
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // Evita el salto de enlace
      dropdown.classList.toggle("open"); // Muestra u oculta el submenú
    });

    // Si se hace clic fuera del menú, se cierra automáticamente
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }

  // Transición suave al hacer clic en cualquier enlace ancla (#...)
  document.querySelectorAll('a[href^="#"]').forEach(ancla => {
    ancla.addEventListener('click', function (e) {
      e.preventDefault(); // Cancela el comportamiento predeterminado del enlace
      const destino = document.querySelector(this.getAttribute('href')); // Obtiene el elemento destino
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' }); // Hace scroll suave hacia el destino
      }
    });
  });
});





    /*// Si se hace clic fuera del menú, se cierra
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }
}); */