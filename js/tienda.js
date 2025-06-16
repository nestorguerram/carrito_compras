

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

    // Si se hace clic fuera del menú, se cierra
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }
});
