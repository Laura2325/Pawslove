document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Selección de Elementos y Constantes ---
    const tablaBody = document.getElementById('contenedorOrdenes');
    const btnAgregar = document.getElementById('btnAgregar');
    const idInput = document.getElementById('id');
    const customerInput = document.getElementById('usuario');
    const dateInput = document.getElementById('fecha');
    const statusInput = document.getElementById('estado');
    const totalInput = document.getElementById('total');

    // Esta es la "clave" bajo la cual guardaremos nuestros datos en localStorage.
    const pawsloveKey = 'pawslove_ordenes';

    if (!tablaBody || !btnAgregar) {
        console.error("No se encontró la tabla o el botón para agregar.");
        return;
    }

    // --- 2. Funciones para Manejar Local Storage ---
    function getOrdersFromStorage() {
        const ordenesJSON = localStorage.getItem(pawsloveKey);        
        return ordenesJSON ? JSON.parse(ordenesJSON) : [
            { id: '1', usuario: 'admin_pawslove', fecha: '2023-10-27', estado: 'Completado', total: '150000' },
            { id: '2', usuario: 'cliente_feliz', fecha: '2023-10-28', estado: 'En Proceso', total: '75000' }
        ];
    }
    function saveOrdersToStorage(ordenes) {
        // Usamos JSON.stringify para convertir el array de objetos a un string.
        localStorage.setItem(pawsloveKey, JSON.stringify(ordenes));
    }

    // --- 3. Función para dar los estilo a la Tabla ---

    function mostrarTabla(ordenes) {
        tablaBody.innerHTML = ''; // Limpiamos la tabla antes de añadir nuevas filas

        ordenes.forEach(ordenes => {
            const fila = document.createElement('tr');
            fila.className = 'border-b border-[#d1e6d9]'; // Clases de Tailwind para estilo

            // Creamos y añadimos cada celda
            fila.innerHTML = `
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${ordenes.id}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${ordenes.usuario}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${ordenes.fecha}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${ordenes.estado}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${ordenes.total}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">
                    <button class="text-red-500 font-semibold btn-eliminar" data-id="${ordenes.id}">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }

    // --- 4. Lógica Principal y Eventos ---

    // Cargamos los pedidos al iniciar la página
    let ordenesActuales = getOrdersFromStorage();
    mostrarTabla(ordenesActuales);

    btnAgregar.addEventListener('click', () => {
        const nuevaOrden = {
            id: idInput.value || 'N/A',
            usuario: customerInput.value || 'N/A',
            fecha: dateInput.value || new Date().toISOString().split('T')[0],
            estado: statusInput.value || 'Pendiente',
            total: totalInput.value || '0'
        };

        // Añadimos el nuevo pedido a nuestra lista
        ordenesActuales.push(nuevaOrden);
        // Guardamos la lista actualizada en localStorage
        saveOrdersToStorage(ordenesActuales);
        // Volvemos a pintar la tabla para que se vea el cambio
        mostrarTabla(ordenesActuales);
    });

    // --- 5. Funcionalidad para Eliminar con Delegación de Eventos ---
    tablaBody.addEventListener('click', (event) => {
        // Verificamos si el elemento clickeado tiene la clase 'btn-eliminar'
        if (event.target.classList.contains('btn-eliminar')) {
            // Obtenemos el ID del pedido desde el atributo data-id
            const idParaEliminar = event.target.dataset.id;

            // Filtramos el array: nos quedamos con todas las órdenes MENOS la que tiene el ID a eliminar.
            ordenesActuales = ordenesActuales.filter(orden => orden.id !== idParaEliminar);

            // Guardamos el nuevo array (ya sin el elemento eliminado) en localStorage
            saveOrdersToStorage(ordenesActuales);
            // Volvemos a pintar la tabla para que se refleje el cambio
            mostrarTabla(ordenesActuales);
        }
    });
});