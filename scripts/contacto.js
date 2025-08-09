document.addEventListener("DOMContentLoaded", function () {
  console.log("contacto.js cargado");

  const profileButtons = document.querySelectorAll(".boton-perfil");
  const formSections = {
    adoptante: document.getElementById("adoptante-section"),
    voluntario: document.getElementById("voluntario-section"),
    donador: document.getElementById("donador-section"),
  };
  const formulario = document.getElementById("formulario-contacto");

  // Cambia estado visual y habilita/deshabilita inputs dentro de cada sección
  function changeProfile(profile) {
    profileButtons.forEach((btn) => {
      const isActive = btn.dataset.profile === profile;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive);
    });

    Object.entries(formSections).forEach(([key, section]) => {
      const isActive = key === profile;
      // setea string "false"/"true" para coincidir con los selectores CSS
      section.setAttribute("aria-hidden", String(!isActive));
      // habilita inputs del perfil activo y deshabilita los demás
      section
        .querySelectorAll("input, select, textarea, button")
        .forEach((el) => {
          // Nota: no tocar el botón de submit porque está fuera de las secciones
          el.disabled = !isActive;
        });
    });
  }

  // listeners botones perfil
  profileButtons.forEach((button) => {
    button.addEventListener("click", function () {
      changeProfile(this.dataset.profile);
    });
  });

  // init
  changeProfile("adoptante");

  // Envío del formulario (con fallback JSON -> FormData)
  formulario.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    // Validación nativa limitada solo sobre campos habilitados
    if (!this.checkValidity()) {
      this.reportValidity();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    // Construir FormData
    const formData = new FormData(this);

    // Convertir FormData a objeto JSON conservando arrays (checkboxes con mismo name)
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (Array.isArray(data[key])) data[key].push(value);
        else data[key] = [data[key], value];
      } else {
        data[key] = value;
      }
    }

    console.log("Intentando enviar payload JSON:", data);

    try {
      // Intento 1: JSON
      let response = await fetch(this.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Si no es ok, probar fallback con FormData (multipart/form-data)
      if (!response.ok) {
        console.warn(
          "Intento JSON falló con status",
          response.status,
          "— intentando fallback con FormData"
        );
        response = await fetch(this.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
      }

      if (response.ok) {
        // parseo (si viene JSON)
        try {
          console.log("Respuesta OK:", await response.json());
        } catch (err) {
          console.log("Respuesta OK (no JSON)");
        }
        this.reset();
        changeProfile("adoptante"); // volver al perfil por defecto
        mostrarModalConfirmacion();
        
      } else {
        const text = await response.text();
        console.error("Respuesta de error:", response.status, text);
        mostrarVentanaEmergente(
          "Hubo un problema en el envío. ❌ Revisa la consola y la pestaña Network.",
          "error"
        );
      }
    } catch (err) {
      console.error("Error de red / CORS / endpoint:", err);
      alert(
        "No se pudo contactar el servidor de envío. Revisa la consola (posible CORS o endpoint incorrecto)."
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});

function mostrarModalConfirmacion() {
  const modal = document.getElementById("modalConfirmacion");
  modal.style.display = "block";

  // Cerrar modal al hacer clic en botón
  document.getElementById("cerrarModal").onclick = () => {
    modal.style.display = "none";
  };

  // Cerrar modal al hacer clic fuera del contenido
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
