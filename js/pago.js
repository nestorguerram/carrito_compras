document.addEventListener("DOMContentLoaded", () => {
  //const terminal = document.getElementById("terminal-simulada"); esto funcionaba
  const terminal = document.getElementById("texto-terminal");

  const formulario = document.getElementById("formularioPago");
  const container = document.querySelector(".grid-container");

  // oculta el formulario mientras se reproduce la animación
  formulario.style.display = "none";
  container.classList.remove("marco-completo");

  // texto animado estilo consola
  const lineas = [
    "Servico CTC chile servicio telefonico",
    "Inicializando sistema de pagos",
    "Verificando conexión segura",
    "Cargando formulario"
    
  ];

  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  terminal.appendChild(cursor);

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function escribirLinea(linea) {
    return new Promise(async (resolve) => {
      terminal.insertBefore(document.createTextNode(linea), cursor);
      await esperar(400);
      let puntos = 0;
      const intervalo = setInterval(() => {
        if (puntos < 12) {
          terminal.insertBefore(document.createTextNode("."), cursor);
          puntos++;
        } else {
          clearInterval(intervalo);
          terminal.insertBefore(document.createTextNode("\n"), cursor);
          resolve();
        }
      }, 90);
    });
  }

  async function iniciarAnimacion() {
    for (const linea of lineas) {
      await esperar(500);
      await escribirLinea(linea);
    }
    cursor.remove();
    formulario.style.display = "flex";
  }

  setTimeout(() => {
    container.classList.add("marco-completo");
    iniciarAnimacion();
  }, 3000);

  // validación del formulario al enviar
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    // obtiene los valores del formulario
    const nombre = this.nombre.value.trim();
    const apellido = this.apellido.value.trim();
    const rut = this.rut.value.trim();
    const correo = this.correo.value.trim();
    const direccion = this.direccion.value.trim();
    const telefono = this.telefono.value.trim();
    const tipoPago = this.tipoPago.value;
    const numerotarjeta = this.numerotarjeta.value.trim();


    // validación estricta del nombre (exactamente 2 letras, sin acentos ni símbolos)// 
    const nombreRegex = /^[A-Za-z]{2}$/;
    if (!nombreRegex.test(nombre)) {
      alert("El nombre debe tener exactamente 2 letras, sin números ni caracteres especiales.");
      return;
    }


    // validación de RUT chileno básico
    if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(rut)) {
      alert("Formato de RUT inválido. Usa el formato 12.345.678-9");
      return;
    }

    // validación de email básica
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      alert("Correo electrónico inválido.");
      return;
    }

    // validación del número de tarjeta
    if (!/^\d{16}$/.test(numerotarjeta)) {
      alert("El número de tarjeta debe tener exactamente 16 dígitos numéricos.");
      return;
    }

    // validación de método de pago
    if (!tipoPago) {
      alert("Por favor selecciona un método de pago.");
      return;
    }

    // todo válido, continuar con pago
    const datosPago = {
      nombre,
      apellido,
      rut,
      correo,
      direccion,
      telefono,
      tipoPago,
      numerotarjeta
    };

    // guarda opcionalmente los datos (ejemplo)
    localStorage.setItem("datosUltimoPago", JSON.stringify(datosPago));

    // limpia carrito y confirma pago
    localStorage.removeItem("carrito");
    alert("✅ Pago realizado con éxito. ¡Gracias por tu compra!");

    // redirige a la tienda o página final
    
    window.location.href = "success.html";

  });
});
