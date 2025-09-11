const KEY_CARRITO = 'Pawslove_Carrito';
const KEY_PRODUCTOS = 'Pawslove_Productos';
const KEY_USUARIOS = 'pawsloveUsers';
const KEY_MASCOTAS = 'Pawslove_Mascotas';
const KEY_SOLICITUDES = 'Pawslove_SolicitudesAdopcion';

//* --- Funciones para Productos ---

/**
 * Obtiene todos los productos desde localStorage.
 */
function obtenerProductos() {
    const productosJSON = localStorage.getItem(KEY_PRODUCTOS);
    try {
        // Si no hay nada, devuelve un array vacío para evitar errores.
        return productosJSON ? JSON.parse(productosJSON) : [];
    } catch (e) {
        console.error("Error al parsear productos desde localStorage:", e);
        // En caso de error en el parseo, devuelve un array vacío.
        return [];
    }
}

/**
 * Guarda el array de productos en localStorage.
 * @param {Array} productos - El array de productos a guardar.
 */
function guardarProductos(productos) {
}

/**
 * Agrega un nuevo producto a la lista.
 * @param {Object} nuevoProducto - El producto a agregar.
 */
function agregarProducto(nuevoProducto) {
}

/**
 * Elimina un producto por su identificador (ID o índice).
 * @param {string|number} identificador - El ID o índice del producto a eliminar.
 */
function eliminarProducto(identificador) {
}

/**
 * Actualiza un producto existente.
 * @param {string|number} identificador - El ID o índice del producto a actualizar.
 * @param {Object} datosActualizados - Los nuevos datos del producto.
 */
function actualizarProducto(identificador, datosActualizados) {
}

export const metodosProductos = {
    obtenerProductos,
    guardarProductos,
    agregarProducto,
    eliminarProducto,
    actualizarProducto
}

//* --- Funciones para Carrito ---

/**
 * Obtiene el carrito de compras desde localStorage.
 */
function obtenerCarrito() {
}

/**
 * Guarda el estado actual del carrito en localStorage.
 * @param {Array} carrito - El array del carrito a guardar.
 */
function guardarCarrito(carrito) {
}

/**
 * Agrega un producto al carrito o incrementa su cantidad.
 * @param {Object} producto - El producto a agregar.
 * @param {number} cantidad - La cantidad a agregar.
 */
function agregarAlCarrito(producto, cantidad) {
}

/**
 * Elimina un item del carrito por su identificador (ID o índice).
 * @param {string|number} identificador - El ID o índice del item a eliminar.
 */
function eliminarDelCarrito(identificador) {
}

/**
 * Actualiza la cantidad de un item en el carrito.
 * @param {string|number} identificador - El ID o índice del item.
 * @param {number} nuevaCantidad - La nueva cantidad.
 */
function actualizarCantidadEnCarrito(identificador, nuevaCantidad) {
}

/**
 * Vacía completamente el carrito de compras.
 */
function vaciarCarrito() {
}

/**
 * Calcula el total del carrito.
 */
function calcularTotalCarrito() {
}

//* --- Funciones para Usuarios ---

function inicializarAdmin() {
        let usuarios = metodosUsuarios.obtenerUsuarios();

        const adminExists = usuarios.some(user => user.correo === 'admin_pawslove@gmail.com');

        if (!adminExists) {
            const adminUser = {
                nombre: 'admin_pawslove',
                correo: 'admin_pawslove@gmail.com',
                contraseña: 'admin_pawslove',
                tipo: 'Administrador Principal'
            };
            usuarios.unshift(adminUser);
            guardarUsuarios(usuarios);
        }
    }

/**
 * Obtiene todos los usuarios desde localStorage.
 */
function obtenerUsuarios() {
    const usuariosJSON = localStorage.getItem(KEY_USUARIOS);
    try {
        // Si no hay nada, devuelve un array vacío para evitar errores.
        return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    } catch (e) {
        console.error("Error al parsear usuarios desde localStorage:", e);
        // En caso de error en el parseo, devuelve un array vacío.
        return [];
    }
}

/**
 * Guarda el array de usuarios en localStorage.
 * @param {Array} usuarios - El array de usuarios a guardar.
 */
function guardarUsuarios(usuarios) {
    localStorage.setItem(KEY_USUARIOS, JSON.stringify(usuarios));
}

/**
 * Agrega un nuevo usuario a la lista.
 * @param {Object} nuevoUsuario - El usuario a agregar.
 * @returns {boolean} - Devuelve true si el usuario fue agregado, false si ya existía.
 */
function agregarUsuario(nuevoUsuario) {
    const usuarios = obtenerUsuarios();
    if (usuarios.some(u => u.correo === nuevoUsuario.correo)) {
        return false; // Indica que el usuario ya existe.
    }
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    return true; // Indica que el usuario fue agregado con éxito.
}

/**
 * Elimina un usuario por su identificador (ID o email).
 * @param {string} email - El email del usuario a eliminar.
 */
function eliminarUsuario(email) {
    let usuarios = obtenerUsuarios();
    const usuariosFiltrados = usuarios.filter(usuario => usuario.correo !== email);

    if (usuariosFiltrados.length < usuarios.length) {
        guardarUsuarios(usuariosFiltrados);
    }
}

/**
 * Actualiza un usuario existente.
 * @param {string|number} identificador - El ID o email del usuario a actualizar.
 * @param {Object} datosActualizados - Los nuevos datos del usuario.
 */
function actualizarUsuario(identificador, datosActualizados) {
}

export const metodosUsuarios = {
    inicializarAdmin,
    obtenerUsuarios,
    guardarUsuarios,
    agregarUsuario,
    eliminarUsuario,
    actualizarUsuario
};

//! --- Funciones para Mascotas ---

/**
 * Obtiene todas las mascotas desde localStorage.
 */
function obtenerMascotas() {
    const mascotasJSON = localStorage.getItem(KEY_MASCOTAS);
    try {
        // Si no hay nada, devuelve un array vacío para evitar errores.
        return mascotasJSON ? JSON.parse(mascotasJSON) : [];
    } catch (e) {
        console.error("Error al parsear mascotas desde localStorage:", e);
        // En caso de error en el parseo, devuelve un array vacío.
        return [];
    }
}

/**
 * Guarda el array de mascotas en localStorage.
 * @param {Array} mascotas - El array de mascotas a guardar.
 */
function guardarMascotas(mascotas) {
}

/**
 * Agrega una nueva mascota a la lista.
 * @param {Object} nuevaMascota - La mascota a agregar.
 */
function agregarMascota(nuevaMascota) {
}

/**
 * Elimina una mascota por su identificador (ID).
 * @param {string|number} identificador - El ID de la mascota a eliminar.
 */
function eliminarMascota(identificador) {
}

/**
 * Actualiza una mascota existente.
 * @param {string|number} identificador - El ID de la mascota a actualizar.
 * @param {Object} datosActualizados - Los nuevos datos de la mascota.
 */
function actualizarMascota(identificador, datosActualizados) {
}

export const metodosMascotas = {
    obtenerMascotas,
    guardarMascotas,
    agregarMascota,
    eliminarMascota,
    actualizarMascota
}

// --- Funciones para Solicitudes de Adopción ---

/**
 * Obtiene todas las solicitudes de adopción desde localStorage.
 */
function obtenerSolicitudes() {
    const solicitudesJSON = localStorage.getItem(KEY_SOLICITUDES);
    try {
        // Si no hay datos, devuelve un array vacío.
        return solicitudesJSON ? JSON.parse(solicitudesJSON) : [];
    } catch (e) {
        console.error("Error al parsear solicitudes de adopción:", e);
        return [];
    }
}

/**
 * Guarda el array de solicitudes en localStorage.
 * @param {Array} solicitudes - El array de solicitudes a guardar.
 */
function guardarSolicitudes(solicitudes) {
    localStorage.setItem(KEY_SOLICITUDES, JSON.stringify(solicitudes));
}

/**
 * Agrega una nueva solicitud a la lista.
 * @param {Object} nuevaSolicitud - La solicitud a agregar.
 */
function agregarSolicitud(nuevaSolicitud) {
    const solicitudes = obtenerSolicitudes();
    solicitudes.unshift(nuevaSolicitud); // Agrega al inicio para que aparezca primero
    guardarSolicitudes(solicitudes);
}

/**
 * Elimina una solicitud por el email del solicitante.
 * @param {string} email - El email de la solicitud a eliminar.
 */
function eliminarSolicitud(email) {
    let solicitudes = obtenerSolicitudes();
    const solicitudesFiltradas = solicitudes.filter(solicitud => solicitud.email !== email);

    if (solicitudesFiltradas.length < solicitudes.length) {
        guardarSolicitudes(solicitudesFiltradas);
    }
}

export const metodosSolicitudes = {
    obtenerSolicitudes,
    guardarSolicitudes,
    agregarSolicitud,
    eliminarSolicitud
};
