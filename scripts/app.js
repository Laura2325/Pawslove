// Importamos el objeto que fue exportado por defecto desde localStorageManager.js
// La ruta './' es importante para indicar que es un archivo local en la misma carpeta.
import localStorageManager from './localStorageManager.js';

console.log("--- Ejecutando código desde app.js (cargado como módulo) ---");

// Limpiamos para empezar de cero
localStorageManager.clear();

// Usamos los métodos del módulo importado
localStorageManager.setItem('usuarioModulo', { nombre: 'Mónica', rol: 'editora' });

const usuario = localStorageManager.getItem('usuarioModulo');

console.log('Usuario recuperado desde el módulo:', usuario);
console.log(`El rol del usuario es: ${usuario.rol}`);
