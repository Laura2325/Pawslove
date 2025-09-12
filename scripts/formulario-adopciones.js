    const formSteps = document.querySelectorAll(".form-step");
    const stepItems = document.querySelectorAll(".step-item");
    const progressBar = document.getElementById("progress-bar");
    let currentStepIndex = 0; // Cambié el nombre para evitar conflicto

    // Función mejorada para mostrar pasos con animación
    function showStep(stepIndex, direction = 'next') {
        // Si ya estamos en este paso, no hacer nada
        if (currentStepIndex === stepIndex) return;
        
        // Obtener el paso actual y el siguiente
        const currentStepElement = formSteps[currentStepIndex];
        const nextStepElement = formSteps[stepIndex];
        
        // Configurar clases de transición según la dirección
        if (currentStepElement !== undefined) {
            currentStepElement.classList.remove('active');
            currentStepElement.classList.add(direction === 'next' ? 'prev' : 'next');
            
            // Ocultar después de la animación
            setTimeout(() => {
                currentStepElement.classList.add('hidden');
            }, 500);
        }
        
        // Mostrar el siguiente paso con animación
        nextStepElement.classList.remove('hidden', 'next', 'prev');
        setTimeout(() => {
            nextStepElement.classList.add('active');
        }, 10);
        
        // Actualizar indicadores de pasos
        stepItems.forEach((item, index) => {
            item.classList.remove('active', 'completed');
            
            if (index === stepIndex) {
                item.classList.add('active');
            } else if (index < stepIndex) {
                item.classList.add('completed');
                const icon = item.querySelector('.step-icon');
                const number = item.querySelector('.step-number');
                const check = item.querySelector('.step-check');
                
                if (number) number.classList.add('hidden');
                if (check) check.classList.remove('hidden');
                icon.classList.remove('bg-gray-200', 'text-gray-600');
                icon.classList.add('bg-primary', 'text-white');
                
                const label = item.querySelector('span.text-gray-500');
                if (label) {
                    label.classList.remove('text-gray-500');
                    label.classList.add('text-primary');
                }
            }
        });
        
        // Actualizar barra de progreso
        const progressPercentage = ((stepIndex + 1) / formSteps.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Actualizar el paso actual
        currentStepIndex = stepIndex;
        
        // Desplazar hacia la parte superior del formulario
        setTimeout(() => {
            formSteps[stepIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // Event listeners para los botones de navegación
    document.getElementById('next-step-1').addEventListener('click', () => {
        showStep(1, 'next');
    });

    document.getElementById('prev-step-2').addEventListener('click', () => {
        showStep(0, 'prev');
    });

    document.getElementById('next-step-2').addEventListener('click', () => {
        showStep(2, 'next');
    });

    document.getElementById('prev-step-3').addEventListener('click', () => {
        showStep(1, 'prev');
    });

    // Mostrar el primer paso al cargar la página con una pequeña animación inicial
    window.addEventListener('load', () => {
        formSteps[0].classList.remove('hidden');
        setTimeout(() => {
            formSteps[0].classList.add('active');
        }, 100);
    });

    // Función para mostrar el modal
    function showConfirmationModal() {
        const modal = document.getElementById('confirmation-modal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    // Función para ocultar el modal
    function hideConfirmationModal() {
        const modal = document.getElementById('confirmation-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Event listener para el envío del formulario
    document.getElementById('adoption-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir envío real para este ejemplo
        
        // Aquí iría tu lógica de envío real
        // Simulamos un envío exitoso después de 1 segundo
        setTimeout(showConfirmationModal, 1000);
    });

    // Event listeners para cerrar el modal
    document.getElementById('close-modal').addEventListener('click', hideConfirmationModal);
    document.getElementById('modal-ok-button').addEventListener('click', hideConfirmationModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    document.getElementById('confirmation-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideConfirmationModal();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideConfirmationModal();
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateInterviewDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset hours for accurate comparison
        return selectedDate >= today;
    }

    // Función para mostrar errores
    function showError(input, message) {
        // Eliminar error previo si existe
        hideError(input);
        
        // Crear elemento de error
        const error = document.createElement('p');
        error.className = 'text-red-500 text-xs italic mt-1';
        error.textContent = message;
        error.id = `${input.id}-error`;
        
        // Insertar después del campo
        input.parentNode.appendChild(error);
        
        // Estilizar campo con error
        input.classList.add('border-red-500');
    }

    // Función para ocultar errores
    function hideError(input) {
        // Eliminar mensaje de error si existe
        const error = document.getElementById(`${input.id}-error`);
        if (error) {
            error.remove();
        }
        
        // Quitar estilo de error
        input.classList.remove('border-red-500');
    }

    // Validación en tiempo real para el correo electrónico
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError(this, 'Por favor ingresa un correo electrónico válido');
        } else {
            hideError(this);
        }
    });

    // Validación en tiempo real para la fecha de entrevista
    const interviewDateInput = document.getElementById('fecha-entrevista');
    interviewDateInput.addEventListener('change', function() {
        if (this.value && !validateInterviewDate(this.value)) {
            showError(this, 'No puedes seleccionar una fecha anterior al día de hoy');
        } else {
            hideError(this);
        }
    });

    // Establecer fecha mínima para el campo de fecha (hoy)
    const today = new Date().toISOString().split('T')[0];
    interviewDateInput.setAttribute('min', today);

    // Validación completa antes de enviar el formulario
    document.getElementById('adoption-form').addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validar correo electrónico
        if (emailInput.value && !validateEmail(emailInput.value)) {
            showError(emailInput, 'Por favor ingresa un correo electrónico válido');
            isValid = false;
        }
        
        // Validar fecha de entrevista
        if (interviewDateInput.value && !validateInterviewDate(interviewDateInput.value)) {
            showError(interviewDateInput, 'No puedes seleccionar una fecha anterior al día de hoy');
            isValid = false;
        }
        
        // Si hay errores, prevenir el envío
        if (!isValid) {
            e.preventDefault();
            
            // Desplazar al primer campo con error
            const firstError = document.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            e.preventDefault(); // Prevenir envío real para este ejemplo
            
            // Aquí iría tu lógica de envío real
            // Simulamos un envío exitoso después de 1 segundo
            setTimeout(showConfirmationModal, 1000);
        }
    });

           function saveFormData() {
        try {
            const formData = {
                pasoActual: currentStepIndex,
                // Información del paso 1
                nombre: document.getElementById('nombre').value,
                documentoTipo: document.getElementById('documento-tipo').value,
                numeroDocumento: document.getElementById('numero-documento').value,
                fechaNacimiento: document.getElementById('fecha-nacimiento').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                direccion: document.getElementById('direccion').value,
                ciudad: document.getElementById('ciudad').value,
                ocupacion: document.getElementById('ocupacion').value,
                ingresos: document.getElementById('ingresos').value,
                tipoVivienda: document.getElementById('tipo-vivienda').value,
                permisoMascota: document.getElementById('permiso-mascota').value,
                caracteristicasVivienda: document.getElementById('caracteristicas-vivienda').value,
                seguroVivienda: document.getElementById('seguro-vivienda').value,
                // Información del paso 2
                experienciaMascotas: document.getElementById('experiencia-mascotas').value,
                modalidadLaboral: document.getElementById('modalidad-laboral').value,
                espacioMascota: document.getElementById('espacio-mascota').value,
                tiempoDedicado: document.getElementById('tiempo-dedicado').value,
                gastosMascotas: document.getElementById('gastos-mascotas').value,
                esterilizacion: document.getElementById('esterilizacion').value,
                problemasComportamiento: document.getElementById('problemas-comportamiento').value,
                necesidadesEspeciales: document.getElementById('necesidades-especiales').value,
                // Información del paso 3
                visitasHogar: document.getElementById('visitas-hogar').value,
                contactoFuturo: document.getElementById('contacto-futuro').value,
                fechaEntrevista: document.getElementById('fecha-entrevista').value,
                horaEntrevista: document.getElementById('hora-entrevista').value,
                ultimaActualizacion: new Date().toISOString()
            };
            
            localStorage.setItem('formularioAdopcion', JSON.stringify(formData));
            console.log('Datos guardados en localStorage:', formData);
            return true;
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
            return false;
        }
    }

    // Función para configurar el autoguardado (VERSIÓN CORREGIDA)
    function setupAutoSave() {
        // Seleccionar todos los campos del formulario
        const formFields = document.querySelectorAll('#adoption-form input, #adoption-form select, #adoption-form textarea');
        
        // Agregar event listener a cada campo
        formFields.forEach(field => {
            field.addEventListener('change', saveFormData);
            field.addEventListener('blur', saveFormData);
        });
        
        // Guardar también al cambiar de paso
        const navigationButtons = [
            'next-step-1', 'prev-step-2', 'next-step-2', 'prev-step-3'
        ];
        
        navigationButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', saveFormData);
            }
        });
    }

    // Función para verificar si hay datos guardados
    function checkSavedData() {
        const savedData = localStorage.getItem('formularioAdopcion');
        if (savedData) {
            console.log('Datos encontrados en localStorage:', JSON.parse(savedData));
            return true;
        } else {
            console.log('No hay datos en localStorage');
            return false;
        }
    }

    // Modificar el event listener de envío del formulario para limpiar localStorage
    document.getElementById('adoption-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí tus validaciones...
        
        // Si todo es válido
        setTimeout(function() {
            // Mostrar modal de confirmación
            showConfirmationModal();
            
            // Limpiar localStorage después de enviar
            localStorage.removeItem('formularioAdopcion');
            console.log('Datos eliminados de localStorage después del envío');
        }, 1000);
    });

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        // Cargar datos guardados si existen
        const savedData = localStorage.getItem('formularioAdopcion');
        if (savedData) {
            try {
                const formData = JSON.parse(savedData);
                // Aquí iría el código para rellenar los campos con formData
                console.log('Datos cargados desde localStorage');
                
                // Mostrar notificación de datos recuperados (opcional)
                const notification = document.createElement('div');
                notification.textContent = 'Datos anteriores recuperados';
                notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            } catch (error) {
                console.error('Error al cargar datos desde localStorage:', error);
            }
        }
        
        // Configurar autoguardado
        setupAutoSave();
        
        // Verificar que se está guardando
        setInterval(() => {
            checkSavedData();
        }, 5000); // Verificar cada 5 segundos para debugging
    });

    // Resolver entrega de información en JSON