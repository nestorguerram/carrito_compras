// obtener carrito del localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// mostrar productos en el carrito
function mostrarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML = `
      <div class="detalle-producto">
        <img src="imagenes/${producto.imagen}" alt="${producto.nombre}" class="mini-imagen">
        <div class="info-producto">
          <h3>${producto.nombre}</h3>
          <p>$${producto.precio}</p>
          <div class="controles-cantidad">
            <button onclick="cambiarCantidad(${index}, -1)">−</button>
            <span>${producto.cantidad}</span>
            <button onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>
        </div>
      </div>
      <button class="eliminar" onclick="eliminarProducto(${index})">🗑️</button>
    `;

    listaCarrito.appendChild(tarjeta);
  });

  actualizarResumen();
}

// cambiar cantidad de un producto, primero suma
function cambiarCantidad(index, cambio) {
  const producto = carrito[index];
  if (!producto) return;

  producto.cantidad += cambio;

  if (producto.cantidad < 1) {
    carrito.splice(index, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// eliminar un producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// mostrar subtotal, descuento y total
function actualizarResumen() {
  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const descuento = subtotal * 0.1;
  const total = subtotal - descuento;

  const subtotalElemento = document.getElementById("subtotal");
  const descuentoElemento = document.getElementById("descuento");
  const totalElemento = document.getElementById("total");

  if (subtotalElemento) subtotalElemento.textContent = `$${subtotal.toFixed(2)}`;
  if (descuentoElemento) descuentoElemento.textContent = `$${descuento.toFixed(2)}`;
  if (totalElemento) totalElemento.textContent = `$${total.toFixed(2)}`;
}

// ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  const botonFinalizar = document.getElementById("finalizar-compra");
  if (botonFinalizar) {
    botonFinalizar.addEventListener("click", () => {
      window.location.href = "pago.html";
    });
  }
});

// exponer funciones globales para usar en botones
window.cambiarCantidad = cambiarCantidad;
window.eliminarProducto = eliminarProducto;
