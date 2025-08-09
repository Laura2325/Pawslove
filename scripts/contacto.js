document.addEventListener('DOMContentLoaded', function() {
  // Selección de elementos
  const profileButtons = document.querySelectorAll('.boton-perfil');
  const formSections = {
    adoptante: document.getElementById('adoptante-section'),
    voluntario: document.getElementById('voluntario-section'),
    donador: document.getElementById('donador-section')
  };

  // Función para cambiar de perfil
  function changeProfile(profile) {
    // Actualizar botones activos
    profileButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.profile === profile);
    });

    // Mostrar/ocultar secciones
    Object.entries(formSections).forEach(([key, section]) => {
      section.classList.toggle('hidden', key !== profile);
    });
  }

  // Event listeners para los botones
  profileButtons.forEach(button => {
    button.addEventListener('click', function() {
      changeProfile(this.dataset.profile);
    });
  });

  // Inicialización - Mostrar solo adoptante al cargar
  changeProfile('adoptante');
});

//Funcionalidad para remitir información capturada a Formspree
const $form = document.querySelector('#form');
    $form.addEventListener('submit', handleSumit);
    async function handleSumit(event) {
        event.preventDefault();
        const form = new FormData(this);
        const response = await fetch(this.action, {
            method:this.method,
            body: form,
            headers: {
                'Aceept': 'application/json'
            }
        })
        if(response.ok){
            this.reset();
            alert('Gracias')
        }
    }

