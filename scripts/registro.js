document.addEventListener('DOMContentLoaded', () => {

    const USERS_STORAGE_KEY = 'pawsloveUsers';
    const nombreUsuario = document.getElementById('nombreRegistro');
    const correo = document.getElementById('emailRegistro');
    const contraseña = document.getElementById('passwordRegistro');
    const confirmarContraseña = document.getElementById('confirmarPassword');
    const btnRegistrarse = document.getElementById('btnRegistrarse');

    // Función para obtener los usuarios existentes del localStorage
    function obtenerUsuarios() {
        const usuariosJSON = localStorage.getItem(USERS_STORAGE_KEY);        
        try {
            return usuariosJSON ? JSON.parse(usuariosJSON) : [];
        } catch (e) {
            console.error("Error al parsear usuarios de localStorage", e);
            return [];
        }
    }
    
    function guardarUsuarios(usuarios) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));
    }

    btnRegistrarse.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!nombreUsuario.value.trim() || !correo.value.trim() || !contraseña.value.trim()) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        
        if (contraseña.value !== confirmarContraseña.value) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const usuarios = obtenerUsuarios();        
        if (usuarios.some(user => user.correo === correo.value)) {
            alert('Este correo electrónico ya está registrado.');
            return;
        }
        const usuario = {
            nombre: nombreUsuario.value.trim(),
            correo: correo.value.trim(),
            contraseña: contraseña.value,
        };

        usuarios.push(usuario);
        guardarUsuarios(usuarios);

        alert('¡Registro exitoso!');        
    });

});