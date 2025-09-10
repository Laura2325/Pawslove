const cartContainer = document.getElementById("cart-container");

    // Función para formatear precios colombianos
    function formatPrice(value) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }


    // Función para mostrar toast
    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toast-message');
      toastMessage.textContent = message;

      toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      toast.classList.add('opacity-1', 'translate-y-0');

      setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
        toast.classList.remove('opacity-1', 'translate-y-0');
      }, 3000);
    }

    // Cargar carrito desde localStorage
    function loadCart() {
      const savedCart = localStorage.getItem("petShopCart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch {
          return {};
        }
      }
      return {};
    }

    // Guardar carrito en localStorage
    function saveCart(cart) {
      localStorage.setItem("petShopCart", JSON.stringify(cart));
    }

    // Renderizar carrito
    function renderCart(cart) {
      cartContainer.innerHTML = "";

      if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-12 md:py-20">
              <svg class="w-16 h-16 md:w-24 md:h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
              <p class="text-gray-500 text-lg md:text-xl mb-4">Tu carrito está vacío</p>
              <a href="./tienda.html" class="inline-block bg-primary text-white px-6 py-3 rounded-custom hover:bg-opacity-90 transition-colors font-medium">
                Explorar Productos
              </a>
            </div>
          `;
        return;
      }

      // Vista de tabla para desktop
      const table = document.createElement("table");
      table.className = "table-responsive w-full text-left border-collapse";

      table.innerHTML = `
          <thead>
            <tr class="border-b border-gray-300">
              <th class="py-3 px-4 font-semibold">Producto</th>
              <th class="py-3 px-4 font-semibold">Precio</th>
              <th class="py-3 px-4 font-semibold">Cantidad</th>
              <th class="py-3 px-4 font-semibold">Subtotal</th>
              <th class="py-3 px-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;

      const tbody = table.querySelector("tbody");

      // Vista de cards para móvil
      const cardsContainer = document.createElement("div");
      cardsContainer.className = "card-responsive space-y-4";

      Object.values(cart).forEach((item) => {
        // Fila de tabla para desktop
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-200 hover:bg-gray-50 transition-colors";

        tr.innerHTML = `
            <td class="py-4 px-4">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  <span class="text-xs text-gray-500">IMG</span>
                </div>
                <span class="font-semibold text-dark">${item.name}</span>
              </div>
            </td>
            <td class="py-4 px-4 font-bold text-primary">${formatPrice(item.price)}</td>
            <td class="py-4 px-4">
              <div class="flex items-center space-x-2">
                <button class="decrease-qty bg-gray-200 hover:bg-gray-300 rounded w-8 h-8 flex items-center justify-center font-bold text-lg transition-colors">−</button>
                <span class="quantity font-medium px-2 min-w-[2rem] text-center">${item.quantity}</span>
                <button class="increase-qty bg-gray-200 hover:bg-gray-300 rounded w-8 h-8 flex items-center justify-center font-bold text-lg transition-colors">+</button>
              </div>
            </td>
            <td class="py-4 px-4 font-bold text-primary">${formatPrice(item.price * item.quantity)}</td>
            <td class="py-4 px-4">
              <button class="remove-item text-red-500 hover:text-red-700 font-bold text-xl p-2 hover:bg-red-50 rounded transition-colors" title="Eliminar producto">&times;</button>
            </td>
          `;

        // Card para móvil
        const card = document.createElement("div");
        card.className = "product-card bg-gray-50 rounded-custom p-4 border border-gray-100";

        card.innerHTML = `
            <div class="flex items-start space-x-4">
              <div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-xs text-gray-500">IMG</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-dark mb-1 text-lg">${item.name}</h3>
                <p class="text-primary font-bold mb-3 text-xl">${formatPrice(item.price)}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3 bg-white rounded-full px-3 py-1 border">
                    <button class="decrease-qty text-gray-600 hover:text-primary font-bold text-xl w-8 h-8 flex items-center justify-center">−</button>
                    <span class="quantity font-medium px-2 min-w-[2rem] text-center text-lg">${item.quantity}</span>
                    <button class="increase-qty text-gray-600 hover:text-primary font-bold text-xl w-8 h-8 flex items-center justify-center">+</button>
                  </div>
                  <button class="remove-item text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition-colors">×</button>
                </div>
                
                <div class="mt-3 pt-3 border-t border-gray-200">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Subtotal:</span>
                    <span class="font-bold text-primary text-xl">${formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </div>
          `;

        // Event listeners para tabla
        const decreaseBtnTable = tr.querySelector(".decrease-qty");
        const increaseBtnTable = tr.querySelector(".increase-qty");
        const removeBtnTable = tr.querySelector(".remove-item");

        // Event listeners para card
        const decreaseBtnCard = card.querySelector(".decrease-qty");
        const increaseBtnCard = card.querySelector(".increase-qty");
        const removeBtnCard = card.querySelector(".remove-item");

        // Funciones de manejo
        const decreaseHandler = () => {
          if (item.quantity > 1) {
            item.quantity--;
            showToast(`Cantidad actualizada: ${item.name}`);
          } else {
            delete cart[item.id];
            showToast(`${item.name} eliminado del carrito`);
          }
          saveCart(cart);
          renderCart(cart);
        };

        const increaseHandler = () => {
          item.quantity++;
          showToast(`Cantidad actualizada: ${item.name}`);
          saveCart(cart);
          renderCart(cart);
        };

        const removeHandler = () => {
          showToast(`${item.name} eliminado del carrito`);
          delete cart[item.id];
          saveCart(cart);
          renderCart(cart);
        };

        // Asignar eventos
        decreaseBtnTable.addEventListener("click", decreaseHandler);
        increaseBtnTable.addEventListener("click", increaseHandler);
        removeBtnTable.addEventListener("click", removeHandler);

        decreaseBtnCard.addEventListener("click", decreaseHandler);
        increaseBtnCard.addEventListener("click", increaseHandler);
        removeBtnCard.addEventListener("click", removeHandler);

        tbody.appendChild(tr);
        cardsContainer.appendChild(card);
      });

      // Calcular totales
      const totalWithoutIva = Object.values(cart).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const iva = totalWithoutIva * 0.19;
      const subtotal = totalWithoutIva;

      // Sección de totales responsive
      const totalsDiv = document.createElement("div");
      totalsDiv.className = "mt-6 md:mt-8";

      totalsDiv.innerHTML = `
          <div class="bg-gray-50 rounded-custom p-4 md:p-6">
            <div class="max-w-md ml-auto space-y-3">
              <div class="flex justify-between text-base md:text-lg font-medium">
                <span>IVA (19%)</span>
                <span class="text-primary font-semibold">${formatPrice(iva)}</span>
              </div>
              <div class="flex justify-between text-base md:text-lg font-medium">
                <span>Subtotal</span>
                <span class="text-primary font-semibold">${formatPrice(subtotal)}</span>
              </div>
              <div class="flex justify-between text-lg md:text-xl font-bold border-t border-gray-300 pt-3">
                <span>Total</span>
                <span class="text-primary">${formatPrice(subtotal + iva)}</span>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-200">
                <button id="empty-cart-btn" class="flex-1 bg-red-500 text-white py-3 px-4 rounded-custom font-medium hover:bg-red-600 transition-colors text-base md:text-lg order-2 sm:order-1">
                  Vaciar Carrito
                </button>
                <button id="checkout-btn" class="flex-1 bg-primary text-white py-3 px-4 rounded-custom font-medium hover:bg-opacity-90 transition-colors text-base md:text-lg order-1 sm:order-2">
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        `;

      // Agregar elementos al contenedor
      cartContainer.appendChild(table);
      cartContainer.appendChild(cardsContainer);
      cartContainer.appendChild(totalsDiv);

      // Configurar modal y eventos
      setupModalEvents(cart);
      setupCheckoutEvent();
    }

    function setupModalEvents(cart) {
      const confirmModal = document.getElementById("confirm-modal");
      const modalContent = document.getElementById("modal-content");
      const confirmYesBtn = document.getElementById("confirm-yes");
      const confirmNoBtn = document.getElementById("confirm-no");
      const emptyCartBtn = document.getElementById("empty-cart-btn");

      if (emptyCartBtn) {
        emptyCartBtn.addEventListener("click", () => {
          confirmModal.classList.remove("opacity-0", "pointer-events-none");
          modalContent.classList.add("modal-enter-active");
        });
      }

      confirmNoBtn.addEventListener("click", () => {
        modalContent.classList.remove("modal-enter-active");
        confirmModal.classList.add("opacity-0", "pointer-events-none");
      });

      confirmYesBtn.addEventListener("click", () => {
        for (const key in cart) {
          delete cart[key];
        }
        saveCart(cart);
        showToast("Carrito vaciado correctamente");
        renderCart(cart);
        modalContent.classList.remove("modal-enter-active");
        confirmModal.classList.add("opacity-0", "pointer-events-none");
      });

      // Cerrar modal al hacer clic fuera
      confirmModal.addEventListener("click", (e) => {
        if (e.target === confirmModal) {
          modalContent.classList.remove("modal-enter-active");
          confirmModal.classList.add("opacity-0", "pointer-events-none");
        }
      });
    }

    function setupCheckoutEvent() {
      const checkoutBtn = document.getElementById("checkout-btn");
      if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
          showToast("Redirigiendo al proceso de pago...");
          // Simular redirección
          setTimeout(() => {
            alert("Función de pago no implementada en esta demo");
          }, 1000);
        });
      }
    }

    // Cerrar modal con tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const confirmModal = document.getElementById("confirm-modal");
        const modalContent = document.getElementById("modal-content");
        modalContent.classList.remove("modal-enter-active");
        confirmModal.classList.add("opacity-0", "pointer-events-none");
      }
    });

    // Inicializar
    const cart = loadCart();
    renderCart(cart);