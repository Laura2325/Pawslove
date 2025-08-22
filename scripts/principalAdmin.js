document.addEventListener('DOMContentLoaded', () => {

    const tablaBody = document.getElementById('contenedorOrdenes');
    const btnAgregar = document.getElementById('btnAgregar');
    const form = document.getElementById('agregarOrdenForm');
    const customerInput = document.getElementById('usuario');
    const dateInput = document.getElementById('fecha');
    const statusInput = document.getElementById('estado');
    const totalInput = document.getElementById('total');

    const pawsloveKey = 'pawslove_ordenes';

    if (!tablaBody || !btnAgregar || !form) {
        console.error("Error crítico: No se encontraron elementos esenciales del formulario o la tabla. Revisa los IDs en tu HTML.");
        return;
    }

    function getOrdersFromStorage() {
        const ordenesGuardadas = localStorage.getItem(pawsloveKey);
        
        if (ordenesGuardadas) {
            const ordenesParseadas = JSON.parse(ordenesGuardadas);            
            if (ordenesParseadas.length > 0) {
                return ordenesParseadas;
            }
        }

        return [
            { id: 'paws-OrdenEjemplo', usuario: 'admin_pawslove', fecha: '2023-10-27', estado: 'Completado', total: 150000 },
            { id: 'paws-OrdenEjemplo', usuario: 'cliente_feliz', fecha: '2023-10-28', estado: 'En Proceso', total: 75000 }
        ];
    }

    function saveOrdersToStorage(ordenes) {
        localStorage.setItem(pawsloveKey, JSON.stringify(ordenes));
    }

    function mostrarTabla(ordenes) {
        tablaBody.innerHTML = '';

        ordenes.forEach(orden => {
            const fila = document.createElement('tr');
            fila.className = 'border-b border-[#d1e6d9]';

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

            tablaBody.appendChild(fila);
        });
    }

    let ordenesActuales = getOrdersFromStorage();

    mostrarTabla(ordenesActuales);


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nuevoId = `paws-${Date.now()}`;

        const nuevaOrden = {
            id: nuevoId,
            usuario: customerInput.value || 'N/A',
            fecha: dateInput.value || new Date().toISOString().split('T')[0],
            estado: statusInput.value || 'Pendiente',
            total: parseFloat(totalInput.value) || 0 // Se convierte el valor a número.
        };

        ordenesActuales.push(nuevaOrden);
        
        saveOrdersToStorage(ordenesActuales);
        
        mostrarTabla(ordenesActuales);

        form.reset();
    });


    tablaBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-eliminar')) {

            const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta orden?');

            if (confirmacion) {
                const idParaEliminar = event.target.dataset.id;

                ordenesActuales = ordenesActuales.filter(orden => orden.id !== idParaEliminar);

                saveOrdersToStorage(ordenesActuales);

                mostrarTabla(ordenesActuales);
            }
        }
    });
});