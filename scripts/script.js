ScrollReveal().reveal(
  ".valor1, .valor2, .valor3, .valor4, .valor5, .mision, .vision, .mensaje, .persona",
  {
    delay: 200,
    distance: "50px",
    origin: "bottom",
    duration: 1000,
    easing: "ease-in-out",
    reset: true,
  }
);

// Cambiar entre formularios
document.querySelectorAll(".perfil-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remover clase 'active' de todos los botones y formularios
    document
      .querySelectorAll(".perfil-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".form-section")
      .forEach((form) => form.classList.remove("active"));

    // Agregar 'active' al botón y formulario seleccionado
    button.classList.add("active");
    const targetForm = button.getAttribute("data-target");
    document.getElementById(`form-${targetForm}`).classList.add("active");
  });
});
