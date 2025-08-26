const pawsloveKey = 'pawslove_productos';

const tabla = document.getElementById('tabla-productos');
const categoria = document.getElementById('categoria');
const nombre = document.getElementById('producto');
const stock = document.getElementById('stock');

const precio = document.getElementById('precio');
const estado = document.getElementById('estado');

const btnAgrear = document.getElementById('btnAgregar');

function agregarCardProducto(producto) {  
  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  return `
      <tr>
        <td class="nombreProducto">${producto.nombre}</td>
        <td class="categoriaProducto">${producto.categoria}</td>
        <td class="stockProducto">${producto.stock}</td>
        <td class="precioProducto">${formatoMoneda.format(producto.precio)}</td>
        <td class="estadoProducto">${producto.estado}</td>
        <td class="accionesProducto">
          <button class="text-red-500 font-semibold btnEliminar" data-id="${producto.id}">Eliminar</button>
        </td>
      </tr>
      `;  
}

function guardarProductosEnLocalStorage(productos) {
  localStorage.setItem(pawsloveKey, JSON.stringify(productos));
}

function obtenerProductosDeLocalStorage() {
  const productosGuardados = localStorage.getItem(pawsloveKey);
  return productosGuardados ? JSON.parse(productosGuardados) : [];
}

function eliminarProducto(id) {
  let productos = obtenerProductosDeLocalStorage();
  // Filtramos el array, creando uno nuevo que excluye el producto con el id a eliminar.
  productos = productos.filter(producto => producto.id !== id);
  guardarProductosEnLocalStorage(productos);
  actualizarTablaProductos();
}

function agregarNuevoProducto(event) {
    event.preventDefault();

    const nuevoProducto = {
        id: Date.now(), // Creamos un ID único basado en la fecha y hora actual
        nombre: nombre.value,
        categoria: categoria.value,
        stock: parseInt(stock.value), // Convertimos a número
        precio: parseFloat(precio.value), // Convertimos a número con decimales
        estado: estado.value
    };
    let productos = obtenerProductosDeLocalStorage();
    productos.push(nuevoProducto);
    guardarProductosEnLocalStorage(productos);    
    actualizarTablaProductos();

    document.getElementById('form-productos').reset();
}

function actualizarTablaProductos() {
    let productos = obtenerProductosDeLocalStorage();
    tabla.innerHTML = productos.map(agregarCardProducto).join('');
}

btnAgrear.addEventListener('click', agregarNuevoProducto);

tabla.addEventListener('click', (event) => {
  if (event.target.classList.contains('btnEliminar')) {    
    const productoId = Number(event.target.dataset.id);
    eliminarProducto(productoId);
  }
});
actualizarTablaProductos();