import { usuariosAdmin } from "../utilidades.js";
import { metodosUsuarios, metodosSolicitudes } from "../manejoLocalStorage.js";

const FORM_DATA_KEY = 'formularioAdopcion';
let usuariosCombinados = [];
let currentUserEmailInModal = null; // Almacena el email del usuario que se está viendo en el modal

/**
 * Procesa un nuevo formulario de adopción, lo guarda de forma persistente y lo elimina.
 * Devuelve true si se procesó un nuevo formulario, de lo contrario false.
 */
function procesarNuevoFormulario() {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (!savedData) {
        return false;
    }

    try {
        const formData = JSON.parse(savedData);
        const solicitudesActuales = metodosSolicitudes.obtenerSolicitudes();

        // Evitar duplicados si el usuario ya tiene una solicitud
        if (solicitudesActuales.some(s => s.email === formData.email)) {
            console.warn(`Ya existe una solicitud para el correo ${formData.email}. No se agregará una nueva.`);
            localStorage.removeItem(FORM_DATA_KEY);
            return false;
        }

        const nuevoId = solicitudesActuales.length > 0 ? Math.max(...solicitudesActuales.map(s => s.id)) + 1 : 1;

        const nuevaSolicitud = {
                id: nuevoId,
                nombre: formData.nombre || '',
                email: formData.email || '',
                telefono: formData.telefono || '',
                documento: `${formData.numeroDocumento || ''} (${usuariosAdmin.getDocumentType(formData.documentoTipo)})`,
                fechaNacimiento: usuariosAdmin.formatDate(formData.fechaNacimiento) || '',
                direccion: formData.direccion || '',
                ciudad: formData.ciudad || '',
                ocupacion: formData.ocupacion || '',
                ingresos: usuariosAdmin.getIncomeRange(formData.ingresos) || '',
                tipoVivienda: usuariosAdmin.getHousingType(formData.tipoVivienda) || '',
                permisoMascota: formData.permisoMascota === 'si' ? 'Sí' : 'No',
                espacioExterior: formData.caracteristicasVivienda === 'si' ? 'Sí' : 'No',
                espacioSeguro: formData.seguroVivienda === 'si' ? 'Sí' : 'No',
                experiencia: formData.experienciaMascotas === 'si' ? 'Sí' : 'No',
                modalidad: usuariosAdmin.getWorkModality(formData.modalidadLaboral) || '',
                espacioMascota: usuariosAdmin.getPetSpace(formData.espacioMascota) || '',
                tiempo: usuariosAdmin.getTimeDedication(formData.tiempoDedicado) || '',
                fechaSolicitud: new Date().toLocaleDateString(),
                horaSolicitud: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                estado: "Pendiente",
                iniciales: usuariosAdmin.getInitials(formData.nombre)
            };

        metodosSolicitudes.agregarSolicitud(nuevaSolicitud);
        localStorage.removeItem(FORM_DATA_KEY);
        return true;

    } catch (error) {
        console.error('Error al procesar datos del formulario:', error);
        localStorage.removeItem(FORM_DATA_KEY);
        return false;
    }
}

// Función para actualizar las cards de estadísticas
function updateStatsCards() {
    // Las estadísticas se basan en el total de usuarios registrados y el estado de las solicitudes.
    const totalUsers = usuariosCombinados.length;
    const solicitantes = usuariosCombinados.filter(u => u.haSolicitado);
    
    const pendingUsers = solicitantes.filter(user => user.estado === "Pendiente").length;
    const approvedUsers = solicitantes.filter(user => user.estado === "Aprobado").length;
    const rejectedUsers = solicitantes.filter(user => user.estado === "Rechazado").length;

    const statsContainer = document.getElementById('stats-cards');
    statsContainer.innerHTML = `
                <div class="bg-white rounded-custom shadow p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">Total usuarios</p>
                            <p class="text-3xl font-bold text-primary">${totalUsers}</p>
                        </div>
                        <div class="bg-primary bg-opacity-20 p-3 rounded-full">
                            <i class="fas fa-users text-primary text-xl"></i>
                        </div>
                    </div>
                    <p class="text-sm text-green-500 mt-2"><i class="fas fa-arrow-up"></i> ${Math.floor(totalUsers / 10)}% desde el mes pasado</p>
                </div>
                
                <div class="bg-white rounded-custom shadow p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">Pendientes</p>
                            <p class="text-3xl font-bold text-yellow-500">${pendingUsers}</p>
                        </div>
                        <div class="bg-yellow-500 bg-opacity-20 p-3 rounded-full">
                            <i class="fas fa-clock text-yellow-500 text-xl"></i>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">Esperando revisión</p>
                </div>
                
                <div class="bg-white rounded-custom shadow p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">Aprobados</p>
                            <p class="text-3xl font-bold text-green-500">${approvedUsers}</p>
                        </div>
                        <div class="bg-green-500 bg-opacity-20 p-3 rounded-full">
                            <i class="fas fa-check-circle text-green-500 text-xl"></i>
                        </div>
                    </div>
                    <p class="text-sm text-green-500 mt-2"><i class="fas fa-arrow-up"></i> ${Math.floor(approvedUsers / 5)}% desde ayer</p>
                </div>
                
                <div class="bg-white rounded-custom shadow p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-500">Rechazados</p>
                            <p class="text-3xl font-bold text-red-500">${rejectedUsers}</p>
                        </div>
                        <div class="bg-red-500 bg-opacity-20 p-3 rounded-full">
                            <i class="fas fa-times-circle text-red-500 text-xl"></i>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-2">No cumplen requisitos</p>
                </div>
            `;
}

// Función para actualizar la tabla de usuarios
function updateUsersTable() {
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';

    usuariosCombinados.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'user-row';

        let statusClass = '';
        if (user.estado === 'Pendiente') statusClass = 'bg-yellow-100 text-yellow-800';
        if (user.estado === 'Aprobado') statusClass = 'bg-green-100 text-green-800';
        if (user.estado === 'Rechazado') statusClass = 'bg-red-100 text-red-800';
        if (user.estado === 'En revisión') statusClass = 'bg-blue-100 text-blue-800';
        if (user.estado === 'No aplica') statusClass = 'bg-gray-100 text-gray-600';

        const esAdminPrincipal = user.tipo === 'Administrador Principal';

        let actionsHTML = `<button class="text-primary hover:text-purple-800 mr-3 view-details" data-id="${user.correo}" title="Ver Detalles">
                                <i class="fas fa-eye"></i>
                           </button>`;

        if (user.haSolicitado) {
            // El botón de aprobar solo tiene sentido si hay una solicitud
            actionsHTML += `<button class="text-green-500 hover:text-green-700 mr-3 approve-user" data-id="${user.correo}" title="Aprobar Solicitud">
                                <i class="fas fa-check"></i>
                            </button>`;
        }

        // El botón de eliminar (rechazar) está disponible para todos, excepto el admin principal
        if (!esAdminPrincipal) {
            actionsHTML += `<button class="text-red-500 hover:text-red-700 reject-user" data-id="${user.correo}" title="Eliminar Usuario">
                                <i class="fas fa-trash-alt"></i>
                            </button>`;
        }

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <div class="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">${user.iniciales}</div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.nombre}</div>
                                <div class="text-sm text-gray-500">${user.correo}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${user.fechaSolicitud || 'N/A'}</div>
                        <div class="text-sm text-gray-500">${user.horaSolicitud || ''}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.documento || 'N/A'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.ciudad || 'N/A'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="status-badge ${statusClass}">${user.estado}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ${actionsHTML}
                    </td>
                `;

        tableBody.appendChild(row);
    });

    // Actualizar contadores de paginación
    document.getElementById('current-items').textContent = '1';
    document.getElementById('total-items').textContent = usuariosCombinados.length;
    document.getElementById('total-users').textContent = usuariosCombinados.length;

    // Agregar event listeners a los botones
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            const userEmail = this.getAttribute('data-id');
            showUserDetails(userEmail);
        });
    });

    document.querySelectorAll('.approve-user').forEach(button => {
        button.addEventListener('click', function () {
            const userEmail = this.getAttribute('data-id');
            updateUserStatus(userEmail, 'Aprobado');
        });
    });

    document.querySelectorAll('.reject-user').forEach(button => {
        button.addEventListener('click', function () {
            const userEmail = this.getAttribute('data-id');
            eliminarUsuarioCompleto(userEmail);
        });
    });
}

// Función para mostrar detalles del usuario
function showUserDetails(userEmail) {
    currentUserEmailInModal = userEmail; // Guardar el email para las acciones del modal
    const user = usuariosCombinados.find(u => u.correo === userEmail);
    if (!user) return;

    // Gestionar visibilidad de botones en el modal
    const approveBtn = document.getElementById('modal-btn-aprobar');
    const rejectBtn = document.getElementById('modal-btn-rechazar');

    const esAdminPrincipal = user.tipo === 'Administrador Principal';

    // El botón de aprobar solo se muestra si el usuario NO es admin y tiene una solicitud pendiente/en revisión.
    approveBtn.style.display = !esAdminPrincipal && user.haSolicitado && (user.estado === 'Pendiente' || user.estado === 'En revisión')
        ? 'inline-block'
        : 'none';

    // El botón de rechazar/eliminar se muestra para todos, excepto para el admin principal.
    rejectBtn.style.display = esAdminPrincipal ? 'none' : 'inline-block';

    // Llenar el modal con los datos del usuario
    document.getElementById('detail-nombre').textContent = user.nombre || 'N/A';
    document.getElementById('detail-email').textContent = user.correo || 'N/A';
    document.getElementById('detail-telefono').textContent = user.telefono || 'N/A';
    document.getElementById('detail-documento').textContent = user.documento || 'N/A';
    document.getElementById('detail-fecha-nacimiento').textContent = user.fechaNacimiento || 'N/A';
    document.getElementById('detail-direccion').textContent = user.direccion || 'N/A';
    document.getElementById('detail-ciudad').textContent = user.ciudad || 'N/A';
    document.getElementById('detail-ocupacion').textContent = user.ocupacion || 'N/A';
    document.getElementById('detail-ingresos').textContent = user.ingresos || 'N/A';
    document.getElementById('detail-tipo-vivienda').textContent = user.tipoVivienda || 'N/A';
    document.getElementById('detail-permiso-mascota').textContent = user.permisoMascota || 'N/A';
    document.getElementById('detail-espacio-exterior').textContent = user.espacioExterior || 'N/A';
    document.getElementById('detail-espacio-seguro').textContent = user.espacioSeguro || 'N/A';
    document.getElementById('detail-experiencia').textContent = user.experiencia || 'N/A';
    document.getElementById('detail-modalidad').textContent = user.modalidad || 'N/A';
    document.getElementById('detail-espacio-mascota').textContent = user.espacioMascota || 'N/A';
    document.getElementById('detail-tiempo').textContent = user.tiempo || 'N/A';

    // Mostrar el modal
    document.getElementById('user-detail-modal').classList.remove('modal-hidden');
    document.getElementById('user-detail-modal').classList.add('modal-visible');
}

// Función para actualizar el estado de un usuario
function updateUserStatus(userEmail, status) {
    let solicitudes = metodosSolicitudes.obtenerSolicitudes();
    const userIndex = solicitudes.findIndex(u => u.email === userEmail);

    if (userIndex !== -1) {
        solicitudes[userIndex].estado = status;
        metodosSolicitudes.guardarSolicitudes(solicitudes);
        
        // Recargar y repintar la UI
        loadAllData();

        // Mostrar notificación
        alert(`Usuario ${status.toLowerCase()} correctamente`);
    }
}

/**
 * Elimina un usuario del registro y su solicitud de adopción si existe.
 * @param {string} userEmail - El correo del usuario a eliminar.
 */
function eliminarUsuarioCompleto(userEmail) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario con correo "${userEmail}"? Esta acción también eliminará su solicitud de adopción si existe y no se puede deshacer.`);
    
    if (confirmacion) {
        // Eliminar de la lista de usuarios registrados
        metodosUsuarios.eliminarUsuario(userEmail);
        
        // Eliminar de la lista de solicitudes de adopción
        metodosSolicitudes.eliminarSolicitud(userEmail);

        // Recargar y repintar la UI para reflejar la eliminación
        loadAllData();

        alert(`El usuario ${userEmail} ha sido eliminado del sistema.`);
    }
}

/**
 * Carga los usuarios registrados y las solicitudes de adopción,
 * y los combina en una única estructura de datos.
 */
function cargarYCombinarDatos() {
    const usuariosRegistrados = metodosUsuarios.obtenerUsuarios();
    const solicitudesAdopcion = metodosSolicitudes.obtenerSolicitudes();

    // Crear un mapa para búsqueda eficiente de solicitudes por email
    const solicitudesMap = new Map(solicitudesAdopcion.map(s => [s.email, s]));

    usuariosCombinados = usuariosRegistrados.map(registrado => {
        const solicitud = solicitudesMap.get(registrado.correo);

        if (solicitud) {
            // Usuario con solicitud: combinar datos, la solicitud tiene prioridad.
            return {
                ...registrado,
                ...solicitud,
                haSolicitado: true,
                iniciales: usuariosAdmin.getInitials(registrado.nombre)
            };
        } else {
            // Usuario solo registrado: usar datos de registro y estado por defecto.
            return {
                ...registrado,
                fechaSolicitud: registrado.fechaRegistro,
                horaSolicitud: registrado.horaRegistro,
                estado: 'Aprobado',
                haSolicitado: false,
                iniciales: usuariosAdmin.getInitials(registrado.nombre)
            };
        }
    });
}

function loadAllData() {
    const hasNewData = procesarNuevoFormulario();
    cargarYCombinarDatos();
    updateStatsCards();
    updateUsersTable();

    if (hasNewData) {
        alert('Nuevos datos de formulario cargados correctamente');
    }
}

/**
 * Cierra el modal de detalles y resetea el usuario actual.
 */
function closeModal() {
    const modal = document.getElementById('user-detail-modal');
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    currentUserEmailInModal = null;
}

// Configuración de la barra lateral para móviles
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('sidebar-open');
});

document.getElementById('overlay').addEventListener('click', function () {
    document.getElementById('sidebar').classList.remove('sidebar-open');
});

// Cerrar modal
document.getElementById('close-modal').addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera
document.getElementById('user-detail-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Botón para refrescar datos
document.getElementById('refresh-data').addEventListener('click', loadAllData);

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();

    // Listeners para los botones del modal
    document.getElementById('modal-btn-aprobar').addEventListener('click', () => {
        if (currentUserEmailInModal) {
            updateUserStatus(currentUserEmailInModal, 'Aprobado');
            closeModal();
        }
    });

    document.getElementById('modal-btn-rechazar').addEventListener('click', () => {
        if (currentUserEmailInModal) {
            eliminarUsuarioCompleto(currentUserEmailInModal);
            closeModal();
        }
    });
});
