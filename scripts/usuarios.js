import { usersData } from "./pruebasFunciones.js";
import { usuariosAdmin } from "./utilidades.js";

// Función para obtener datos del formulario de adopción desde localStorage
function getFormDataFromLocalStorage() {
    const savedData = localStorage.getItem('formularioAdopcion');
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);

            // Crear un nuevo usuario a partir de los datos del formulario
            const newUser = {
                id: usersData.length + 1,
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

            // Agregar el nuevo usuario a los datos
            usersData.unshift(newUser);

            return true;
        } catch (error) {
            console.error('Error al procesar datos del formulario:', error);
            return false;
        }
    }
    return false;
}

// Función para actualizar las cards de estadísticas
function updateStatsCards() {
    const totalUsers = usersData.length;
    const pendingUsers = usersData.filter(user => user.estado === "Pendiente").length;
    const approvedUsers = usersData.filter(user => user.estado === "Aprobado").length;
    const rejectedUsers = usersData.filter(user => user.estado === "Rechazado").length;

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

    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'user-row';

        let statusClass = '';
        if (user.estado === 'Pendiente') statusClass = 'bg-yellow-100 text-yellow-800';
        if (user.estado === 'Aprobado') statusClass = 'bg-green-100 text-green-800';
        if (user.estado === 'Rechazado') statusClass = 'bg-red-100 text-red-800';
        if (user.estado === 'En revisión') statusClass = 'bg-blue-100 text-blue-800';

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                <div class="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">${user.iniciales}</div>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${user.nombre}</div>
                                <div class="text-sm text-gray-500">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${user.fechaSolicitud}</div>
                        <div class="text-sm text-gray-500">${user.horaSolicitud}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.documento}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user.ciudad}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="status-badge ${statusClass}">${user.estado}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button class="text-primary hover:text-purple-800 mr-3 view-details" data-id="${user.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="text-green-500 hover:text-green-700 mr-3 approve-user" data-id="${user.id}">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 reject-user" data-id="${user.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                `;

        tableBody.appendChild(row);
    });

    // Actualizar contadores de paginación
    document.getElementById('current-items').textContent = '1';
    document.getElementById('total-items').textContent = usersData.length;
    document.getElementById('total-users').textContent = usersData.length;

    // Agregar event listeners a los botones
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            showUserDetails(userId);
        });
    });

    document.querySelectorAll('.approve-user').forEach(button => {
        button.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            updateUserStatus(userId, 'Aprobado');
        });
    });

    document.querySelectorAll('.reject-user').forEach(button => {
        button.addEventListener('click', function () {
            const userId = parseInt(this.getAttribute('data-id'));
            updateUserStatus(userId, 'Rechazado');
        });
    });
}

// Función para mostrar detalles del usuario
function showUserDetails(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    // Llenar el modal con los datos del usuario
    document.getElementById('detail-nombre').textContent = user.nombre;
    document.getElementById('detail-email').textContent = user.email;
    document.getElementById('detail-telefono').textContent = user.telefono;
    document.getElementById('detail-documento').textContent = user.documento;
    document.getElementById('detail-fecha-nacimiento').textContent = user.fechaNacimiento;
    document.getElementById('detail-direccion').textContent = user.direccion;
    document.getElementById('detail-ciudad').textContent = user.ciudad;
    document.getElementById('detail-ocupacion').textContent = user.ocupacion;
    document.getElementById('detail-ingresos').textContent = user.ingresos;
    document.getElementById('detail-tipo-vivienda').textContent = user.tipoVivienda;
    document.getElementById('detail-permiso-mascota').textContent = user.permisoMascota;
    document.getElementById('detail-espacio-exterior').textContent = user.espacioExterior;
    document.getElementById('detail-espacio-seguro').textContent = user.espacioSeguro;
    document.getElementById('detail-experiencia').textContent = user.experiencia;
    document.getElementById('detail-modalidad').textContent = user.modalidad;
    document.getElementById('detail-espacio-mascota').textContent = user.espacioMascota;
    document.getElementById('detail-tiempo').textContent = user.tiempo;

    // Mostrar el modal
    document.getElementById('user-detail-modal').classList.remove('modal-hidden');
    document.getElementById('user-detail-modal').classList.add('modal-visible');
}

// Función para actualizar el estado de un usuario
function updateUserStatus(userId, status) {
    const userIndex = usersData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        usersData[userIndex].estado = status;
        updateStatsCards();
        updateUsersTable();

        // Mostrar notificación
        alert(`Usuario ${status.toLowerCase()} correctamente`);
    }
}

// Función para cargar y procesar todos los datos
function loadAllData() {
    // Intentar obtener datos del formulario
    const hasNewData = getFormDataFromLocalStorage();

    // Actualizar la UI
    updateStatsCards();
    updateUsersTable();

    // Si había datos nuevos, mostrar notificación
    if (hasNewData) {
        alert('Nuevos datos de formulario cargados correctamente');
    }
}

// Configuración de la barra lateral para móviles
document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('sidebar-open');
});

document.getElementById('overlay').addEventListener('click', function () {
    document.getElementById('sidebar').classList.remove('sidebar-open');
});

// Cerrar modal
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('user-detail-modal').classList.remove('modal-visible');
    document.getElementById('user-detail-modal').classList.add('modal-hidden');
});

// Cerrar modal al hacer clic fuera
document.getElementById('user-detail-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        document.getElementById('user-detail-modal').classList.remove('modal-visible');
        document.getElementById('user-detail-modal').classList.add('modal-hidden');
    }
});

// Botón para refrescar datos
document.getElementById('refresh-data').addEventListener('click', loadAllData);

// Inicializar la página
document.addEventListener('DOMContentLoaded', function () {
    loadAllData();
});
