const tablaCarrito = document.getElementById("tabla-carrito");
const totalGeneral = document.getElementById("total-general");

function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  tablaCarrito.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    tablaCarrito.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.categoria}</td>
        <td>$${item.precio}</td>
        <td>
          <button onclick="cambiarCantidad(${index}, -1)">➖</button>
          ${item.cantidad}
          <button onclick="cambiarCantidad(${index}, 1)">➕</button>
        </td>
        <td>$${subtotal}</td>
        <td>
          <button onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  totalGeneral.textContent = `Total: $${total}`;
}

function cambiarCantidad(index, cambio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Mostrar carrito al cargar
mostrarCarrito();
