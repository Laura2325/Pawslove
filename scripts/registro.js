import { alertasRegistro } from "./sweetalert2.min.js";
import { metodosUsuarios } from "./manejoLocalStorage.js";
import { metodosFechaHora } from "./utilidades.js";

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
            correo: correo.value.trim(),
            contraseña: contraseña.value,
            tipo: 'Cliente',
            fechaRegistro: metodosFechaHora.obtenerFechaActual(),
            horaRegistro: metodosFechaHora.obtenerHoraActual12Horas()
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
    });

});