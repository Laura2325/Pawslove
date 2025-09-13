import { formatoPrecios } from '../utilidades.js';

// Variables globales
let cart = {};
let mobileMenuOpen = false;

// Elementos del DOM
const elements = {
  menuToggle: document.getElementById('menu-toggle'),
  mobileMenu: document.getElementById('mobile-menu'),
  menuIcon: document.getElementById('menu-icon'),
  cartButton: document.getElementById('cart-button'),
  cartPanel: document.getElementById('cart-panel'),
  cartOverlay: document.getElementById('cart-overlay'),
  closeCart: document.getElementById('close-cart'),
  cartItems: document.getElementById('cart-items'),
  cartCount: document.getElementById('cart-count'),
  cartIva: document.getElementById('cart-iva'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartTotal: document.getElementById('cart-total'),
  procederPago: document.getElementById('proceder-pago-btn'),
  notification: document.getElementById('cart-notification'),
  notificationText: document.getElementById('notification-text')
};

function saveCart() {
  try {
    localStorage.setItem('petShopCart', JSON.stringify(cart));
    console.log('Carrito guardado:', cart);
  } catch (error) {
    console.error('Error al guardar:', error);
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('petShopCart');
    if (saved) {
      cart = JSON.parse(saved);
      console.log('Carrito cargado:', cart);
    }
  } catch (error) {
    console.error('Error al cargar:', error);
    cart = {};
  }
}

function showNotification(message) {
  elements.notificationText.textContent = message;
  elements.notification.style.opacity = '1';
  elements.notification.style.pointerEvents = 'auto';
  setTimeout(() => {
    elements.notification.style.opacity = '0';
    elements.notification.style.pointerEvents = 'none';
  }, 2500);
}

function updateCartCount() {
  const total = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCount.textContent = total;
  elements.cartCount.classList.toggle('hidden', total === 0);
}

function updateCartUI() {
  elements.cartItems.innerHTML = '';

  if (Object.keys(cart).length === 0) {
    elements.cartItems.innerHTML = '<p class="text-gray-500 text-center py-10">Tu carrito está vacío</p>';
    elements.cartIva.textContent = formatoPrecios.formatoPrecio(0);
    elements.cartSubtotal.textContent = formatoPrecios.formatoPrecio(0);
    elements.cartTotal.textContent = formatoPrecios.formatoPrecio(0);
    elements.procederPago.disabled = true;
    updateCartCount();
    return;
  }

  Object.values(cart).forEach(item => {
    const div = document.createElement('div');
    div.className = 'flex items-center mb-4 border-b border-gray-200 pb-4';
    div.innerHTML = `
            <div class="w-16 h-16 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center">
              <span class="text-xs text-gray-500">IMG</span>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-dark truncate">${item.name}</h4>
              <p class="text-primary font-bold">${formatoPrecios.formatoPrecio(item.price)}</p>
              <div class="flex items-center mt-2 space-x-2">
                <button class="decrease-qty bg-gray-200 hover:bg-gray-300 rounded w-8 h-8 flex items-center justify-center text-lg font-bold">−</button>
                <span class="px-2">${item.quantity}</span>
                <button class="increase-qty bg-gray-200 hover:bg-gray-300 rounded w-8 h-8 flex items-center justify-center text-lg font-bold">+</button>
                <button class="remove-item ml-2 text-red-500 hover:text-red-700 w-8 h-8 flex items-center justify-center text-xl font-bold">×</button>
              </div>
            </div>
          `;

    div.querySelector('.decrease-qty').onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        delete cart[item.id];
      }
      saveCart();
      updateCartUI();
    };

    div.querySelector('.increase-qty').onclick = () => {
      item.quantity++;
      saveCart();
      updateCartUI();
    };

    div.querySelector('.remove-item').onclick = () => {
      delete cart[item.id];
      saveCart();
      updateCartUI();
    };

    elements.cartItems.appendChild(div);
  });

  const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  elements.cartIva.textContent = formatoPrecios.formatoPrecio(iva);
  elements.cartSubtotal.textContent = formatoPrecios.formatoPrecio(subtotal);
  elements.cartTotal.textContent = formatoPrecios.formatoPrecio(total);
  elements.procederPago.disabled = false;
  updateCartCount();
}

function openCart() {
  elements.cartPanel.classList.add('open');
  elements.cartOverlay.classList.add('open');
  elements.cartPanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  elements.cartPanel.classList.remove('open');
  elements.cartOverlay.classList.remove('open');
  elements.cartPanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  if (mobileMenuOpen) {
    elements.mobileMenu.classList.remove('mobile-menu-closed');
    elements.mobileMenu.classList.add('mobile-menu-open');
    elements.menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
  } else {
    elements.mobileMenu.classList.remove('mobile-menu-open');
    elements.mobileMenu.classList.add('mobile-menu-closed');
    elements.menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Cargar carrito inicial
  loadCart();
  updateCartUI();

  // Menú móvil
  elements.menuToggle.onclick = toggleMobileMenu;

  // Carrito
  elements.cartButton.onclick = openCart;
  elements.closeCart.onclick = closeCart;
  elements.cartOverlay.onclick = closeCart;

  // Proceder al pago
  elements.procederPago.onclick = () => {
    if (Object.keys(cart).length > 0) {
      window.location.href = './carrito.html';
    }
  };

  // Botones agregar al carrito
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = (e) => {
      e.preventDefault();
      console.log('Agregando producto...');

      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      const image = button.dataset.image;

      console.log('Producto:', { id, name, price, image });

      if (cart[id]) {
        cart[id].quantity++;
      } else {
        cart[id] = { id, name, price, image, quantity: 1 };
      }

      saveCart();
      updateCartUI();
      showNotification(`"${name}" agregado al carrito`);
      openCart();
    };
  });

  // Cerrar menú móvil en resize
  window.onresize = () => {
    if (window.innerWidth >= 768 && mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  // Cerrar carrito con Escape
  document.onkeydown = (e) => {
    if (e.key === 'Escape' && elements.cartPanel.classList.contains('open')) {
      closeCart();
    }
  };

  console.log('Tienda iniciada correctamente');
  console.log('Botones encontrados:', document.querySelectorAll('.add-to-cart').length);
});

const ingresoUsuario = document.getElementById('imagenUsuario');
ingresoUsuario.addEventListener('click', () => {
  window.location.href = '../login.html';
});  