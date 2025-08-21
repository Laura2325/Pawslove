// El evento 'DOMContentLoaded' se asegura de que todo el HTML ha sido cargado
// y está listo antes de que intentemos manipularlo con JavaScript.
document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM Y CONSTANTES ---
    // =================================================================================
    // Guardamos en constantes las referencias a los elementos HTML con los que vamos a interactuar.
    // Es una buena práctica hacerlo al principio del script.
    const tablaBody = document.getElementById('contenedorOrdenes');
    const btnAgregar = document.getElementById('btnAgregar');

    // Inputs del formulario para agregar una nueva orden.
    const idInput = document.getElementById('id');
    const customerInput = document.getElementById('usuario');
    const dateInput = document.getElementById('fecha');
    const statusInput = document.getElementById('estado');
    const totalInput = document.getElementById('total');

    // Esta es la "clave" única que usaremos para guardar y recuperar la lista de órdenes
    // en el almacenamiento local del navegador (localStorage).
    const pawsloveKey = 'pawslove_ordenes';

    // Verificación de seguridad: si no se encuentran elementos esenciales,
    // se detiene la ejecución y se muestra un error en la consola.
    if (!tablaBody || !btnAgregar) {
        console.error("No se encontró la tabla o el botón para agregar.");
        return;
    }

    // =================================================================================
    // --- 2. FUNCIONES PARA MANEJAR EL LOCALSTORAGE ---
    // =================================================================================

    /**
     * Obtiene la lista de órdenes desde localStorage.
     * Si no hay nada guardado, devuelve una lista de ejemplo para que la tabla no esté vacía.
     */
    function getOrdersFromStorage() {
        const ordenesJSON = localStorage.getItem(pawsloveKey);
        // El operador ternario es un atajo para un if/else.
        // Si `ordenesJSON` existe (no es null), lo convertimos de texto a objeto con JSON.parse().
        // Si no, devolvemos un array con datos de ejemplo.
        return ordenesJSON ? JSON.parse(ordenesJSON) : [
            // MEJORA: Es mejor guardar los valores numéricos (como el total) como números, no como texto.
            // Esto facilita futuros cálculos (ej. sumar todos los totales).
            { id: '#001', usuario: 'admin_pawslove', fecha: '2023-10-27', estado: 'Completado', total: 150000 },
            { id: '#002', usuario: 'cliente_feliz', fecha: '2023-10-28', estado: 'En Proceso', total: 75000 }
        ];
    }

    /**
     * Guarda la lista completa de órdenes en localStorage.
     * ordenes - El array de órdenes que se va a guardar.
     */
    function saveOrdersToStorage(ordenes) {
        // localStorage solo puede guardar texto. JSON.stringify convierte nuestro array de objetos
        // en una cadena de texto con formato JSON para poder guardarlo.
        localStorage.setItem(pawsloveKey, JSON.stringify(ordenes));
    }

    // =================================================================================
    // --- 3. FUNCIÓN PARA RENDERIZAR (PINTAR) LA TABLA ---
    // =================================================================================

    /**
     * Recibe una lista de órdenes y las muestra en la tabla HTML.
     * La lista de órdenes a mostrar.
     */
    function mostrarTabla(ordenes) {
        //Selector de la tabla a afectar
        const tabla = document.querySelector();
        // Paso clave: Vaciamos el contenido actual de la tabla para evitar duplicados
        // cada vez que llamamos a la función.
        tablaBody.innerHTML = '';

        // Recorremos cada objeto 'orden' en el array 'ordenes'.
        // MEJORA: El parámetro de la función flecha debería ser singular (ej. 'orden')
        // para evitar confusión con el nombre del array ('ordenes').
        ordenes.forEach(orden => {
            const fila = document.createElement('tr');
            fila.className = 'border-b border-[#d1e6d9]'; // Asignamos clases de Tailwind para el estilo.

            // Usamos plantillas literales (template literals) para construir el HTML de la fila.            
            fila.innerHTML = `
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.id}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.usuario}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.fecha}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.estado}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">${orden.total}</td>
                <td class="px-4 py-3 text-[#0e1a13] text-sm font-medium leading-normal">
                    <button class="text-red-500 font-semibold btn-eliminar" data-id="${orden.id}">Eliminar</button>
                </td>
            `;
            // Finalmente, añadimos la fila recién creada al cuerpo de la tabla.
            tablaBody.appendChild(fila);
        });
    }

    // =================================================================================
    // --- 4. LÓGICA PRINCIPAL Y MANEJO DE EVENTOS ---
    // =================================================================================

    // Cargamos los pedidos desde localStorage en una variable que podremos modificar.
    let ordenesActuales = getOrdersFromStorage();
    // Llamamos a la función para que pinte la tabla con los datos iniciales.
    mostrarTabla(ordenesActuales);

    // Añadimos un "escuchador" de eventos al botón "Agregar".
    // MEJORA: Sería ideal envolver los inputs en una etiqueta <form> en el HTML
    // y escuchar el evento 'submit' del formulario, en lugar del 'click' del botón.
    btnAgregar.addEventListener('click', () => {
        // Creamos un nuevo objeto 'orden' con los valores de los campos de entrada.
        // Usamos el operador OR (||) para asignar un valor por defecto si el campo está vacío.
        const nuevaOrden = {
            id: idInput.value || 'N/A',
            usuario: customerInput.value || 'N/A',
            fecha: dateInput.value || new Date().toISOString().split('T')[0],
            estado: statusInput.value || 'Pendiente',
            total: parseFloat(totalInput.value) || 0 // Convertimos el total a número
        };

        // Añadimos la nueva orden a nuestro array en memoria.
        ordenesActuales.push(nuevaOrden);
        // Guardamos el array actualizado en localStorage para que persista.
        saveOrdersToStorage(ordenesActuales);
        // Volvemos a pintar toda la tabla para que se refleje la nueva fila.
        mostrarTabla(ordenesActuales);
    });

    // =================================================================================
    // --- 5. FUNCIONALIDAD ELIMINAR (IMPLEMENTACIÓN CON DELEGACIÓN DE EVENTOS) ---
    // =================================================================================
    //
    // Aquí es donde implementarás la lógica para el botón "Eliminar".
    // En lugar de añadir un listener a CADA botón (lo cual es ineficiente),
    // añadiremos UN SOLO listener al contenedor padre (tablaBody).
    //
    // tablaBody.addEventListener('click', (event) => {
    //     // 1. Comprobamos si el elemento que originó el clic ('event.target')
    //     //    tiene la clase 'btn-eliminar'.
    //     if (event.target.classList.contains('btn-eliminar')) {
    //
    //         // 2. Si es un botón de eliminar, obtenemos el ID de la orden
    //         //    que guardamos en su atributo 'data-id'.
    //         const idParaEliminar = event.target.dataset.id;
    //
    //         // 3. Usamos el método 'filter' para crear un NUEVO array que contenga
    //         //    todas las órdenes EXCEPTO la que queremos eliminar.
    //         ordenesActuales = ordenesActuales.filter(orden => orden.id !== idParaEliminar);
    //
    //         // 4. Guardamos el nuevo array (ya sin el elemento) en localStorage.
    //         saveOrdersToStorage(ordenesActuales);
    //
    //         // 5. Volvemos a pintar la tabla para que el cambio se vea en la pantalla.
    //         mostrarTabla(ordenesActuales);
    //     }
    // });
});