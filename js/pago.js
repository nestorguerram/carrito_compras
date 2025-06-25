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
    "Carga de Sistema Operativo D.O.S",
    "Inicializando MODEM ",
    "CHECK POINT TO POINT",
    "CARGA FINALIZADA"
    
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

  // Función para mostrar errores en pantalla
  function mostrarError(mensaje) {
    const mensajeDiv = document.getElementById("mensajeError");
    if (mensajeDiv) {
      mensajeDiv.textContent = mensaje;
      mensajeDiv.style.display = "block";
      setTimeout(() => {
        mensajeDiv.style.display = "none";
      }, 5000);
    }
  }

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


    /*validación estricta del nombre (exactamente 2 letras, sin acentos ni símbolos)
    const nombreRegex = /^[A-Za-z]{2}$/;
    if (!nombreRegex.test(nombre)) {
      alert("El nombre debe tener exactamente 2 letras, sin números ni caracteres especiales.");
      return;
    } */

 


    // validación de nombre (exactamente 2 letras sin acentos, números ni caracteres especiales)
    const soloDosLetrasRegex = /^[A-Za-z]{2,10}$/;
    if (!soloDosLetrasRegex.test(nombre)) {
      mostrarError("El nombre debe tener mínimo 2 letras, sin números ni caracteres especiales.");
      return;
    }
    
    //if (!soloDosLetrasRegex.test(nombre)) {
    //  alert("El nombre debe tener minimo 2 letras, sin números ni caracteres especiales.");
    //  return;
    //}

    
    if (!soloDosLetrasRegex.test(apellido)) {
      mostrarError("El apellido debe tener minimo 2 letras, sin números ni caracteres especiales.");
      return;
    }



    // validación de RUT 
    if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(rut)) {
      mostrarError("Formato de RUT inválido. Usa el formato 12.345.678-9");
      return;
    }

    // validación de email
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      mostrarError("Correo electrónico inválido. - Formato xxx@xxx.xxx");
      return;
    }


    // validación de teléfono (solo números)
    if (!/^\d+$/.test(telefono)) {
      mostrarError("El teléfono debe contener solo números.");
      return;
    }
    
    // validación del número de tarjeta
    if (!/^\d{16}$/.test(numerotarjeta)) {
      mostrarError("El número de tarjeta debe tener exactamente 16 dígitos numéricos.");
      return;
    }

    // validación de método de pago
    if (!tipoPago) {
      mostrarError("Por favor selecciona un método de pago.");
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
    alert("✅ Pago realizado con éxito ✅. ¡Gracias por tu compra!");

    // redirige a la tienda o página final
    
    window.location.href = "success.html";

  });
});
