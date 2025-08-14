    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");

    function openMenu() {
      mobileMenu.hidden = false; // asegura que exista en el flujo
      mobileMenu.classList.remove("max-h-0", "opacity-0");
      mobileMenu.classList.add("max-h-screen", "opacity-100");
      hamburgerIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      // transición de salida y luego ocultar
      mobileMenu.classList.remove("max-h-screen", "opacity-100");
      mobileMenu.classList.add("max-h-0", "opacity-0");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");

      // espera la duración de la transición antes de ocultar con hidden
      setTimeout(() => {
        if (mobileMenu.classList.contains("opacity-0")) {
          mobileMenu.hidden = true;
        }
      }, 500);
    }

    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("max-h-screen");
      isOpen ? closeMenu() : openMenu();
    });

    // Cerrar al hacer click en cualquier enlace del menú móvil
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.matches("a")) closeMenu();
    });