// Se utiliza el evento 'DOMContentLoaded' para garantizar que el script se ejecute
// únicamente después de que todo el documento HTML haya sido cargado y analizado por el navegador.
// Esto previene errores al intentar acceder a elementos que aún no existen.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Selección de Elementos del DOM y Variables Globales ---

    // Se almacenan en constantes las referencias a los elementos HTML clave.
    // Esto mejora el rendimiento (evita buscar el mismo elemento repetidamente).
    const tablaBody = document.getElementById('contenedorOrdenes');
    const btnAgregar = document.getElementById('btnAgregar');
    const form = document.getElementById('agregarOrdenForm');
    const customerInput = document.getElementById('usuario');
    const dateInput = document.getElementById('fecha');
    const statusInput = document.getElementById('estado');
    const totalInput = document.getElementById('total');

    // Se define una clave única para guardar los datos en LocalStorage.    
    const pawsloveKey = 'pawslove_ordenes';

    // Verificación de seguridad: si algún elemento crucial no se encuentra en el HTML,
    // se detiene la ejecución del script para prevenir errores inesperados más adelante.
    if (!tablaBody || !btnAgregar || !form) {
        console.error("Error crítico: No se encontraron elementos esenciales del formulario o la tabla. Revisa los IDs en tu HTML.");
        return; // Detiene la ejecución de todo el código dentro del 'DOMContentLoaded'.
    }

    // --- 2. Funciones de Persistencia de Datos (LocalStorage) ---

    /**
     * Recupera el array de órdenes desde el LocalStorage.
     * Si no existen datos previos, devuelve un conjunto de datos de ejemplo
     * para la demostración inicial.
     */
    function getOrdersFromStorage() {
        const ordenesGuardadas = localStorage.getItem(pawsloveKey);
        
        // Se comprueba si existen datos guardados.
        if (ordenesGuardadas) {
            const ordenesParseadas = JSON.parse(ordenesGuardadas);            
            if (ordenesParseadas.length > 0) {
                return ordenesParseadas;
            }
        }

        // Este bloque se ejecutará si no hay nada en localStorage (es null)
        // O si lo que hay es un array vacío '[]'.
        return [
            { id: 'paws-OrdenEjemplo', usuario: 'admin_pawslove', fecha: '2023-10-27', estado: 'Completado', total: 150000 },
            { id: 'paws-OrdenEjemplo', usuario: 'cliente_feliz', fecha: '2023-10-28', estado: 'En Proceso', total: 75000 }
        ];
    }

    /**
     * Guarda un array de órdenes en el LocalStorage.
     * ordenes - El array de órdenes que se desea guardar.
     */
    function saveOrdersToStorage(ordenes) {
        // LocalStorage solo almacena texto, por lo que convertimos el array de objetos
        // a una cadena en formato JSON antes de guardarlo.
        localStorage.setItem(pawsloveKey, JSON.stringify(ordenes));
    }

    // --- 3. Función de Renderizado de la Interfaz ---

    /**
     * Dibuja (renderiza) las filas de la tabla de órdenes en el HTML. 
     */
    function mostrarTabla(ordenes) {
        // Se limpia el contenido actual de la tabla para evitar duplicar filas
        // en cada actualización.
        tablaBody.innerHTML = '';

        // Se itera sobre cada objeto 'orden' en el array.
        ordenes.forEach(orden => {
            // Se crea un nuevo elemento <tr> (fila de tabla) en memoria.
            const fila = document.createElement('tr');
            fila.className = 'border-b border-[#d1e6d9]';

            // Se construye el contenido HTML de la fila usando plantillas literales (template literals).
            // Esto permite insertar variables directamente en la cadena de texto de forma legible.
            fila.innerHTML = `
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.id}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.usuario}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.fecha}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.estado}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">
                    ${orden.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                </td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">
                    <button class="text-red-500 font-semibold btn-eliminar" data-id="${orden.id}">Eliminar</button>
                </td>
            `;
            // El atributo 'data-id' es una forma estándar y segura de asociar datos (como un ID) a un elemento HTML.

            // Se añade la fila completamente construida al <tbody> de la tabla en el DOM.
            tablaBody.appendChild(fila);
        });
    }

    // --- 4. Lógica Principal y Manejadores de Eventos ---

    // Se obtiene el estado inicial de las órdenes desde LocalStorage.
    // Esta variable 'let' mantendrá el estado actual de los datos en la aplicación.
    let ordenesActuales = getOrdersFromStorage();

    // Se renderiza la tabla por primera vez con los datos cargados.
    mostrarTabla(ordenesActuales);


    // --- Lógica para Agregar una Nueva Orden ---
    // Se asigna un manejador de eventos al formulario para capturar el evento 'submit'.
    form.addEventListener('submit', (event) => {
        // previene el comportamiento por defecto del formulario, que es recargar la página.
        event.preventDefault();
        
        // Se genera un ID único para la nueva orden utilizando el timestamp actual.
        // Esto garantiza que no haya IDs duplicados.
        const nuevoId = `paws-${Date.now()}`;

        // Se crea un nuevo objeto 'orden' a partir de los valores de los campos del formulario.
        // Se usan valores por defecto (ej. 'N/A', 0) para evitar datos nulos o indefinidos.
        const nuevaOrden = {
            id: nuevoId,
            usuario: customerInput.value || 'N/A',
            fecha: dateInput.value || new Date().toISOString().split('T')[0],
            estado: statusInput.value || 'Pendiente',
            total: parseFloat(totalInput.value) || 0 // Se convierte el valor a número.
        };

        // Se añade la nueva orden al array que gestiona el estado.
        ordenesActuales.push(nuevaOrden);
        
        // Se guardan los datos actualizados en LocalStorage para que persistan.
        saveOrdersToStorage(ordenesActuales);
        
        // Se vuelve a renderizar la tabla para mostrar la nueva orden.
        mostrarTabla(ordenesActuales);

        // Se limpian los campos del formulario para facilitar la siguiente entrada.
        form.reset();
    });


    // --- Lógica para Eliminar una Orden (usando Delegación de Eventos) ---
    // Se añade un único manejador de eventos al contenedor padre (el <tbody> de la tabla).
    // Este listener capturará los clics de todos sus elementos hijos (botones, celdas, etc.).
    tablaBody.addEventListener('click', (event) => {
        // Se comprueba si el elemento específico que originó el clic (event.target)
        // es un botón de eliminar (contiene la clase 'btn-eliminar').
        if (event.target.classList.contains('btn-eliminar')) {

            // Se muestra una ventana de confirmación al usuario para evitar borrados accidentales.
            const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta orden?');

            // El código de eliminación solo se ejecuta si el usuario hace clic en "Aceptar".
            if (confirmacion) {
                // Se obtiene el ID de la orden a eliminar desde el atributo 'data-id' del botón.
                const idParaEliminar = event.target.dataset.id;

                // Se utiliza el método 'filter' para crear un nuevo array que excluye
                // la orden con el ID correspondiente. Esta es una forma inmutable y segura de eliminar elementos.
                ordenesActuales = ordenesActuales.filter(orden => orden.id !== idParaEliminar);

                // Se guarda el nuevo estado (sin la orden eliminada) en LocalStorage.
                saveOrdersToStorage(ordenesActuales);

                // Se vuelve a renderizar la tabla para reflejar la eliminación en la interfaz.
                mostrarTabla(ordenesActuales);
            }
        }
    });
});