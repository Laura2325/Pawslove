import { alertasRegistro } from "../sweetalert2.min.js";
import { metodosUsuarios } from "../manejoLocalStorage.js";

document.addEventListener('DOMContentLoaded', () => {

    const registroForm = document.getElementById('registroForm');
    if (!registroForm) return;

    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreUsuario = document.getElementById('nombreRegistro');
        const correo = document.getElementById('emailRegistro');
        const contraseña = document.getElementById('passwordRegistro');
        const confirmarContraseña = document.getElementById('confirmarPassword');

        if (!nombreUsuario.value.trim() || !correo.value.trim() || !contraseña.value.trim()) {
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

        // Nueva validación para excluir símbolos que podrían ser problemáticos.
        const tieneSimbolosProhibidos = /[<>"'&]/.test(contraseña.value);
        if (tieneSimbolosProhibidos) {
            alertasRegistro.simbolosNoPermitidos();
            return;
        }

        if (contraseña.value !== confirmarContraseña.value) {
            alertasRegistro.contrasenasNoCoinciden();
            return;
        }

        const usuario = {
            nombre: nombreUsuario.value.trim(),
            apellido: apellidoUsuario.value.trim(),
            email: correo.value.trim(),
            password: contraseña.value,                                        
            direccion: "Calle Falsa 123",            
            telefono: "123456789"                        
        };

        if (!metodosUsuarios.agregarUsuario(usuario)) {
            alertasRegistro.usuarioExistente();
            return;
        }

        // Mostrar la alerta y esperar a que termine para cambiar de vista
        alertasRegistro.usuarioRegistrado().then(() => {
            const btnClose = document.getElementById('closeRegister');
            btnClose.click(); // Vuelve a la vista de login de forma controlada
        });

        //! Inicio creacion de metodo para usar APi de registro de usuarios

        async function enviarDatos() {
            try {
                const response = await fetch('http://localhost:8080/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario),
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json();
                console.log('Respuesta del servidor:', data);
            } catch (error) {
                console.error('Hubo un problema con la solicitud:', error);
                alertasRegistro.usuarioRegistrado();
            }
        }

        enviarDatos();

    });

});