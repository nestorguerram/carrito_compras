document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal-simulada");
  const formulario = document.getElementById("registroForm");
  const container = document.querySelector(".grid-container");

  formulario.style.display = "none";
  container.classList.remove("marco-completo");

  const lineas = [
    "Cargango Sistema Operativo",
    
    "Cargando Modulos",
    "Conectando con el servidor",
    "Inicializando"
  ];

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  terminal.appendChild(cursor);

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Escribe cada línea con puntos animados
  function escribirLinea(linea) {
    return new Promise(async (resolve) => {
      terminal.insertBefore(document.createTextNode(linea), cursor);
      await esperar(400);

      let puntos = 0;
      const totalPuntos = 12; /*cantidad de puntos*/
      const intervalo = setInterval(() => {
        if (puntos < totalPuntos) {
          terminal.insertBefore(document.createTextNode("."), cursor);
          puntos++;
        } else {
          clearInterval(intervalo);
          terminal.insertBefore(document.createTextNode("\n"), cursor);
          resolve();
        }
      }, 90); /*velocidad de puntos */
    });
  }

  // Animación final del sistema estilo terminal
  async function iniciarAnimacion() {
    for (const linea of lineas) {
      await esperar(500);
      await escribirLinea(linea);
    }

    cursor.remove();
    formulario.style.display = "flex";
  }

  // Espera a que el marco termine antes de mostrar el contenido
  setTimeout(() => {
    container.classList.add("marco-completo");
    iniciarAnimacion();
  }, 3000);

  // Validación del formulario al enviar
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      email: this.email.value,
      password: this.password.value,
      confirmar: this.confirmar.value,
      telefono: this.telefono.value,
      direccion: this.direccion.value,
      tipoUsuario: this.tipoUsuario.value,
      rut: this.rut.value
    };

    if (data.password !== data.confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(data.rut)) {
      alert("Formato de RUT inválido. Usa el formato 12.345.678-9");
      return;
    }

    delete data.confirmar;
    localStorage.setItem("usuarioRegistrado", JSON.stringify(data));
    alert("Registro exitoso. Redirigiendo a la tienda...");
    window.location.href = "tienda.html";
  });
});


//chequea que el uusuario este registrado//
window.onload = () => {
  const destino = localStorage.getItem("redirigirDespues");
  if (destino) {
    localStorage.removeItem("redirigirDespues");
    setTimeout(() => {
      window.location.href = destino;
    }, 500); // espera opcional para ver el mensaje "registro exitoso"
  }
};
