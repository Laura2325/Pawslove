document.addEventListener('DOMContentLoaded', () => {
            const seleccionUsuario = document.getElementById('seleccionTipoUsuario');
            const contenidoLogin = document.getElementById('contenidoLogin');
            const btnUsuario = document.getElementById('btnUsuario');
            const btnAdmin = document.getElementById('btnAdmin');
            const closeModal = document.getElementById('closeModal');

            // Función para mostrar el formulario de login y ocultar la selección
            const showLogin = () => {
                seleccionUsuario.classList.add('hidden');
                contenidoLogin.classList.remove('hidden');
            };

            // Función para volver a la selección de usuario
            const showSelection = () => {
                contenidoLogin.classList.add('hidden');
                seleccionUsuario.classList.remove('hidden');
            };

            // Event listeners para los botones de selección
            btnUsuario.addEventListener('click', showLogin);
            btnAdmin.addEventListener('click', showLogin);

            // Event listener para el botón de retroceso
            closeModal.addEventListener('click', showSelection);
        });