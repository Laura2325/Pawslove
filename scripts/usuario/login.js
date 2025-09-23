import { alertasLogin, alertasRegistro } from "../sweetalert2.min.js";
import { validadorEmail } from "../utilidades.js";

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return; // Salir si el formulario no existe en la página

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('emailLogin');
        const passwordInput = document.getElementById('passwordLogin');

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // 1. Validación de campos vacíos
        if (!email || !password) {
            alertasLogin.loginVacio();
            return;
        }

        // 2. Validación de formato de email
        if (!validadorEmail.emailValido(email)) {
            alertasRegistro.correoInvalido(email);
            return;
        }

        try {
            // 3. Enviar credenciales al backend
            const response = await fetch('http://localhost:8080/auth/loginConDTO', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            // 4. Validar el resultado del inicio de sesión
            if (response.ok) {
                const data = await response.json(); // Esperamos { token, usuario: { nombre, tipo, ... } }

                // Guardar el token en sessionStorage
                sessionStorage.setItem('jwt', data.token);
                // Opcional: guardar info del usuario para uso en el frontend
                sessionStorage.setItem('usuario', JSON.stringify(data.usuario));

                // ¡Inicio de sesión exitoso!
                alertasLogin.loginCorrecto(data.usuario);

            } else {
                // Limpiar campos en caso de error
                emailInput.value = '';
                passwordInput.value = '';

                // Manejar errores específicos
                if (response.status === 404) {
                    alertasLogin.alertaEmailNoRegistrado();
                } else {
                    // Para 401 (Unauthorized) u otros errores
                    alertasLogin.loginError();
                }
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor. Por favor, inténtalo más tarde.',
            });
        }
    });
});