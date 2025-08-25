// Importamos nuestro gestor para poder usarlo.
import localStorageManager from './localStorageManager.js';

/**
 * @description Simula la obtención de una lista de productos y la guarda en localStorage.
 * En una aplicación real, estos datos podrían venir de una API.
 */
function inicializarProductos() {
  const productos = [
    {
      id: 'prod-01',
      nombre: 'Collar de Cuero',
      precio: 15.99,
      imagen: 'https://via.placeholder.com/300x200.png?text=Collar',
    },
    {
      id: 'prod-02',
      nombre: 'Juguete Hueso de Goma',
      precio: 8.50,
      imagen: 'https://via.placeholder.com/300x200.png?text=Juguete',
    },
    {
      id: 'prod-03',
      nombre: 'Cama Acolchada',
      precio: 45.00,
      imagen: 'https://via.placeholder.com/300x200.png?text=Cama',
    },
  ];

  // Usamos nuestro gestor para guardar la lista completa en localStorage.
  localStorageManager.setItem('listaProductos', productos);
  console.log('✅ Productos guardados en localStorage.');
}

// Ejecutamos la función para que los datos se guarden.
inicializarProductos();