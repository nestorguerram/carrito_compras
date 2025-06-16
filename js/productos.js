// arreglo con los productos disponibles
// arreglo para identificar los productos por índice
const productos = [
  { nombre: "audífono mr", precio: 700, imagen: "audifono.jpg" },
  { nombre: "bobina de cuerpo", precio: 1800, imagen: "bobina.png" },
  { nombre: "gradiente papillon", precio: 2800, imagen: "gradiente 2.jpg" },
  { nombre: "gradiente power stage", precio: 3800, imagen: "gradiente.jpg" },
  { nombre: "adsorber hc", precio: 2200, imagen: "adsorber.jpg" },
  { nombre: "monitor", precio: 760, imagen: "monitor.jpg" }
];


// recuperar el carrito del almacenamiento local o inicializarlo vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// actualizar icono del carrito según cantidad de productos
function actualizarIconoCarrito() {
  const icono = document.querySelector(".icono-carrito");
  if (!icono) return;
  icono.src = carrito.length > 0 ? "imagenes/icono-carrito2.png" : "imagenes/icono-carrito1.png";
}

// alternar compra o remoción de producto
function agregarAlCarrito(index, boton) {
  const producto = productos[index];
  const existe = carrito.find(p => p.nombre === producto.nombre);

  if (!existe) {
    carrito.push({ ...producto, cantidad: 1 });

    boton.textContent = "añadido";
    boton.classList.add("comprado");
  } else {
    carrito = carrito.filter(p => p.nombre !== producto.nombre);
    boton.textContent = "comprar";
    boton.classList.remove("comprado");
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarIconoCarrito();
}

// al cargar la página, marcar botones si ya hay productos en el carrito
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".producto button");
  botones.forEach((boton, index) => {
    const producto = productos[index];
    const enCarrito = carrito.find(p => p.nombre === producto.nombre);
    if (enCarrito) {
      boton.textContent = "añadido";
      boton.classList.add("comprado");
    }
  });

  actualizarIconoCarrito();
});


//para validar al usuario//
const iconoCarrito = document.getElementById("icono-carrito");
if (iconoCarrito) {
  iconoCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    const usuario = localStorage.getItem("usuarioRegistrado");

    if (usuario) {
      window.location.href = "carrito.html";
    } else {
      localStorage.setItem("redirigirDespues", "carrito.html");
      window.location.href = "registro.html";
    }
  });
}
