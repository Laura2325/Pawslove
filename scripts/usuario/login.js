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

            if (response.ok) {
                const token = await response.text();
                sessionStorage.setItem('jwt', token);

                await Swal.fire({
                    title: '¡Inicio de sesión exitoso!',
                    text: 'Serás redirigido a la página principal.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                window.location.replace("index.html");

            } else {
                emailInput.value = '';
                passwordInput.value = '';

                if (response.status === 404 || response.status === 401) {
                    try {
                        const adminResponse = await fetch('http://localhost:8080/administradores');
                        if (adminResponse.ok) {
                            const administradores = await adminResponse.json();
                            const adminEncontrado = administradores.find(
                                admin => admin.email === email && admin.contrasena === password
                            );

                            if (adminEncontrado) {
                                alertasLogin.loginCorrecto(adminEncontrado);
                            } else {
                                alertasLogin.alertaEmailNoRegistrado();
                            }
                        } else {
                            alertasLogin.alertaEmailNoRegistrado();
                        }
                    } catch (adminError) {
                        console.error('Error al verificar administradores:', adminError);
                        alertasLogin.alertaEmailNoRegistrado();
                    }
                } else {
                    alertasLogin.loginError();
                }
            }
        } catch (error) {
            console.error('Error de conexión o autenticación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Autenticación',
                text: error.message || 'No se pudo completar el inicio de sesión. Por favor, inténtalo más tarde.',
            });
        }
    });
});