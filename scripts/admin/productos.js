import {alertasProductos} from '../sweetalert2.min.js';

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  let tabla = document.getElementById("tabla-productos");
  tabla.innerHTML = "";
  productos.forEach((p, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.producto}</td>
        <td>${p.categoria}</td>
        <td>${p.stock}</td>
        <td>$${p.precio}</td>
        <td class="${p.estado === 'Activo' ? 'activo' : 'inactivo'}">${p.estado}</td>
        <td class="acciones">
          <button class="editar" onclick="editarProducto(${index})">Editar</button>
          <button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
          <button class="carrito" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
        </td>
      </tr>
    `;
  });
}

function agregarProducto() {
  let producto = document.getElementById("producto").value;
  let categoria = document.getElementById("categoria").value;
  let stock = parseInt(document.getElementById("stock").value);
  let precio = parseFloat(document.getElementById("precio").value);
  let estado = document.getElementById("estado").value;

  if(producto && stock && precio){
    productos.push({ producto, categoria, stock, precio, estado });
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
  } else {
    alertasProductos.camposProductoVacios();
  }
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

function editarProducto(index) {
  let p = productos[index];
  document.getElementById("producto").value = p.producto;
  document.getElementById("categoria").value = p.categoria;
  document.getElementById("stock").value = p.stock;
  document.getElementById("precio").value = p.precio;
  document.getElementById("estado").value = p.estado;

  eliminarProducto(index);
}

function agregarAlCarrito(index) {
  let p = productos[index];

  if (p.stock > 0) {
    let item = carrito.find(c => c.producto === p.producto);

    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ ...p, cantidad: 1 });
    }

    p.stock--;
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductos();

    alert(p.producto + " se agregó al carrito 🛒");
  } else {
    alert("No hay stock disponible de " + p.producto);
  }
}

window.onload = mostrarProductos;
