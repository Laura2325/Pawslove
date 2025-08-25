// Importamos el gestor para poder leer desde localStorage.
import localStorageManager from './localStorageManager.js';

/**
 * Crea el HTML para una tarjeta de producto.
 * @param {object} producto - El objeto del producto.
 * @returns {string} El string HTML de la tarjeta.
 */
function crearTarjetaProducto(producto) {
  // Usamos clases de Tailwind CSS para el estilo.
  return `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img class="w-full h-56 object-cover" src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
      <div class="p-6">
        <h2 class="font-bold text-2xl text-gray-800 mb-2">${producto.nombre}</h2>
        <p class="text-gray-600 text-lg mb-4">$${producto.precio.toFixed(2)}</p>
        <button 
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onclick="alert('Añadido ${producto.nombre} al carrito!')">
          Añadir al Carrito
        </button>
      </div>
    </div>
  `;
}

/**
 * Renderiza los productos en el DOM.
 */
function renderizarProductos() {
  const contenedor = document.getElementById('contenedor-productos');
  // Usamos nuestro gestor para obtener la lista de productos.
  const productos = localStorageManager.getItem('listaProductos');

  if (!productos || productos.length === 0) {
    contenedor.innerHTML = '<p class="text-center text-gray-500 col-span-full">No se encontraron productos. Intenta recargar la página.</p>';
    return;
  }

  // Generamos el HTML para cada producto y lo unimos.
  const tarjetasHTML = productos.map(crearTarjetaProducto).join('');
  contenedor.innerHTML = tarjetasHTML;
}

// Llamamos a la función para que se ejecute cuando el script se cargue.
renderizarProductos();