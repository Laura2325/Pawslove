document.addEventListener('DOMContentLoaded', () => {
            const seleccionTipoUsuario = document.getElementById('seleccionTipoUsuario');
            const contenidoLogin = document.getElementById('contenidoLogin');
            const contenidoRegistro = document.getElementById('contenidoRegistro');
            
            const btnUsuario = document.getElementById('btnUsuario');
            const btnAdmin = document.getElementById('btnAdmin');
            const linkToRegister = document.getElementById('linkToRegister');
            const linkToLogin = document.getElementById('linkToLogin');
            const closeLogin = document.getElementById('closeLogin');
            const closeRegister = document.getElementById('closeRegister');
                    
            const showLogin = () => {
                seleccionTipoUsuario.classList.add('hidden');
                contenidoRegistro.classList.add('hidden');
                contenidoLogin.classList.remove('hidden');
            };
            
            const showSelection = () => {
                contenidoLogin.classList.add('hidden');
                contenidoRegistro.classList.add('hidden');
                seleccionTipoUsuario.classList.remove('hidden');
            };
            
            const showRegister = () => {
                contenidoLogin.classList.add('hidden');
                seleccionTipoUsuario.classList.add('hidden');
                contenidoRegistro.classList.remove('hidden');
            };
                
            btnUsuario.addEventListener('click', showLogin);
            btnAdmin.addEventListener('click', showLogin);
                        
            linkToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                showRegister();
            });
            
            linkToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                showLogin();
            });
            
            closeLogin.addEventListener('click', showSelection);
            closeRegister.addEventListener('click', showLogin);
        });