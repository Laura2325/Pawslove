import { alertasRegistro } from "../sweetalert2.min.js";
import { validadorEmail } from "../utilidades.js";

document.addEventListener('DOMContentLoaded', () => {

    const registroForm = document.getElementById('registroForm');
    if (!registroForm) return;

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombreUsuario = document.getElementById('nombreRegistro');
        const apellidoUsuario = document.getElementById('apellidoRegistro');
        const correo = document.getElementById('emailRegistro');
        const contraseña = document.getElementById('passwordRegistro');
        const confirmarContraseña = document.getElementById('confirmarPassword');

        if (!nombreUsuario.value.trim() || !apellidoUsuario.value.trim() || !correo.value.trim() || !contraseña.value.trim()) {
            alertasRegistro.camposIncompletos();
            return;
        }

        if (contraseña.value.length < 8) {
            alertasRegistro.contrasenaCorta();
            return;
        }

        // Validación de la política de contraseñas usando expresiones regulares
        const tieneMayuscula = /[A-Z]/.test(contraseña.value);
        const tieneMinuscula = /[a-z]/.test(contraseña.value);
        const tieneNumero = /[0-9]/.test(contraseña.value);
        const tieneSimbolo = /[^A-Za-z0-9]/.test(contraseña.value);

        if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneSimbolo) {
            alertasRegistro.contrasenaInvalida();
            return;
        }

        if (contraseña.value !== confirmarContraseña.value) {
            alertasRegistro.contrasenasNoCoinciden();
            return;
        }

        // Nueva validación para excluir símbolos que podrían ser problemáticos.
        const tieneSimbolosProhibidos = /[<>"'&]/.test(contraseña.value);
        if (tieneSimbolosProhibidos) {
            alertasRegistro.simbolosNoPermitidos();
            return;
        }

        if (!validadorEmail.emailValido(correo.value)) {
            alertasRegistro.correoInvalido(correo.value);
            return;
        }

        try {
            // 1. Verificar si el correo ya existe en el backend
            const checkResponse = await fetch('http://localhost:8080/usuarios/buscarPorEmail?email=' + correo.value.trim(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Si la respuesta es 'ok' (status 200-299), significa que el usuario fue encontrado.
            if (checkResponse.ok) {
                alertasRegistro.usuarioExistente();
                return;
            }

            // 2. Si el usuario no existe, proceder con el registro
            const usuario = {
                nombre: nombreUsuario.value.trim(),
                apellido: apellidoUsuario.value.trim(),
                email: correo.value.trim(),
                password: contraseña.value,
                // Los siguientes son valores de ejemplo, ajústalos según sea necesario
                direccion: "Calle Falsa 123",
                telefono: "123456789"
            };

            const registerResponse = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (!registerResponse.ok) {
                throw new Error('Error en el registro');
            }

            // 3. Si el registro es exitoso, mostrar alerta y redirigir
            await alertasRegistro.usuarioRegistrado();
            document.getElementById('closeRegister').click(); // Vuelve a la vista de login

        } catch (error) {
            console.error('Hubo un problema con la solicitud de registro:', error);
            // Aquí podrías mostrar una alerta de error genérica
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo completar el registro. Por favor, inténtalo más tarde.',
            });
        }
    });

});