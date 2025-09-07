document.addEventListener('DOMContentLoaded', () => {
            const contenidoLogin = document.getElementById('contenidoLogin');
            const contenidoRegistro = document.getElementById('contenidoRegistro');
            const linkToRegister = document.getElementById('linkToRegister');
            const linkToLogin = document.getElementById('linkToLogin');
            const closeRegister = document.getElementById('closeRegister');
            const petPawAnimation = document.getElementById('petPawAnimation');

            // Función para mostrar la animación y luego el formulario de registro
            const mostrarRegistro = (e) => {
                e.preventDefault();
                // Oculta el formulario de login y muestra la animación
                contenidoLogin.classList.add('hidden');
                petPawAnimation.style.display = 'block';

                // Espera a que la animación termine (1 segundo) para mostrar el formulario de registro
                setTimeout(() => {
                    petPawAnimation.style.display = 'none';
                    contenidoRegistro.classList.remove('hidden');
                }, 1000); 
            };

            // Función para mostrar el formulario de login
            const mostrarLogin = (e) => {
                e.preventDefault();
                contenidoRegistro.classList.add('hidden');
                contenidoLogin.classList.remove('hidden');
            };

            // Asignar eventos a los enlaces y botones
            if (linkToRegister) {
                linkToRegister.addEventListener('click', mostrarRegistro);
            }
            if (linkToLogin) {
                linkToLogin.addEventListener('click', mostrarLogin);
            }
            if (closeRegister) {
                closeRegister.addEventListener('click', mostrarLogin);
            }
        });