const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
let mobileMenuOpen = false;
function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  if (mobileMenuOpen) {
    mobileMenu.classList.remove("mobile-menu-closed");
    mobileMenu.classList.add("mobile-menu-open");
    menuIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
  } else {
    mobileMenu.classList.remove("mobile-menu-open");
    mobileMenu.classList.add("mobile-menu-closed");
    menuIcon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
  }
}
menuToggle.addEventListener("click", toggleMobileMenu);
// Cerrar menú móvil al cambiar a escritorio
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && mobileMenuOpen) {
    toggleMobileMenu();
  }
});

// 🔑 Cerrar menú al cambiar a escritorio
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add("max-h-0");
    mobileMenu.classList.remove("max-h-[400px]");
  }
});

// Inicializar menú cerrado
mobileMenu.classList.add("mobile-menu-closed", "max-h-0");
