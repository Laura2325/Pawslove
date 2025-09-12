   let currentDonationType = '';
    let selectedAmount = 0;

    // Elementos del DOM
    const elements = {

      donationModal: document.getElementById('donation-modal'),
      modalContent: document.getElementById('modal-content'),
      modalTitle: document.getElementById('modal-title'),
      modalSubtitle: document.getElementById('modal-subtitle'),
      customAmount: document.getElementById('custom-amount'),
      cancelDonation: document.getElementById('cancel-donation'),
      confirmDonation: document.getElementById('confirm-donation'),
      toast: document.getElementById('toast'),
      toastMessage: document.getElementById('toast-message')
    };


   

      // Reset form
      selectedAmount = 0;
      elements.customAmount.value = '';
      document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('border-primary', 'text-primary', 'bg-primary', 'text-white');
        btn.classList.add('border-gray-200');
      });
    




    function processDonation() {
      const amount = selectedAmount || parseInt(elements.customAmount.value) || 0;

      if (amount < 1000) {
        showToast('El monto mínimo de donación es $1.000');
        return;
      }

      // Simular procesamiento
      elements.confirmDonation.textContent = 'Procesando...';
      elements.confirmDonation.disabled = true;

      setTimeout(() => {
        closeModal();

        const messages = {
          'unique': `¡Gracias por tu donación de ${formatPrice(amount)}!`,
          'monthly': `¡Te has suscrito a donaciones mensuales de ${formatPrice(amount)}!`,
          'sponsor': `¡Ahora patrocinas un animal con ${formatPrice(amount)} mensuales!`,
          'supplies': 'Gracias por tu interés en donar suministros'
        };

        showToast(messages[currentDonationType] || '¡Gracias por tu donación!');

        // Reset button
        elements.confirmDonation.textContent = 'Donar';
        elements.confirmDonation.disabled = false;

        // Simulate progress bar update for Max campaign
        if (Math.random() > 0.5) {
          updateProgressBar();
        }
      }, 2000);
    }

    function updateProgressBar() {
      const progressBar = document.querySelector('.progress-bar');
      const currentProgress = parseInt(progressBar.style.width) || 56;
      const newProgress = Math.min(currentProgress + Math.floor(Math.random() * 10) + 5, 100);

      setTimeout(() => {
        progressBar.style.width = newProgress + '%';

        // Update amounts
        const totalGoal = 800000;
        const newAmount = Math.floor((newProgress / 100) * totalGoal);
        const progressText = document.querySelector('.progress-bar').parentNode.nextElementSibling;
        progressText.innerHTML = `${newProgress}% completado - ${newProgress >= 100 ? '¡Meta alcanzada!' : 'Quedan ' + Math.max(0, Math.floor(Math.random() * 10) + 1) + ' días'}`;

        const amountText = progressText.previousElementSibling.querySelector('.text-primary');
        amountText.textContent = `${formatPrice(newAmount)} / ${formatPrice(totalGoal)}`;

        if (newProgress >= 100) {
          showToast('¡La campaña de Max ha alcanzado su meta!');
        }
      }, 500);
    }

   

      // Donation buttons
      document.querySelectorAll('.donate-btn').forEach(btn => {
        btn.onclick = () => openModal(btn.dataset.type);
      });

      // Hero and Max donation buttons
      document.getElementById('donate-hero-btn').onclick = () => openModal('unique');
      document.getElementById('donate-max-btn').onclick = () => openModal('unique');

      // Modal controls
      elements.cancelDonation.onclick = closeModal;
      elements.confirmDonation.onclick = processDonation;

      // Amount buttons
      document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.onclick = () => {
          // Reset all buttons
          document.querySelectorAll('.amount-btn').forEach(b => {
            b.classList.remove('border-primary', 'text-white', 'bg-primary');
            b.classList.add('border-gray-200');
          });

          // Activate selected button
          btn.classList.remove('border-gray-200');
          btn.classList.add('border-primary', 'text-white', 'bg-primary');

          selectedAmount = parseInt(btn.dataset.amount);
          elements.customAmount.value = '';
        };
      });

      // Custom amount input
      elements.customAmount.oninput = () => {
        if (elements.customAmount.value) {
          selectedAmount = 0;
          document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('border-primary', 'text-white', 'bg-primary');
            btn.classList.add('border-gray-200');
          });
        }
      };

      // Close modal on outside click
      elements.donationModal.onclick = (e) => {
        if (e.target === elements.donationModal) {
          closeModal();
        }
      };

      // Close modal with Escape key
      document.onkeydown = (e) => {
        if (e.key === 'Escape' && !elements.donationModal.classList.contains('opacity-0')) {
          closeModal();
        }
      };

      // Animate progress bar on load
      setTimeout(() => {
        document.querySelector('.progress-bar').style.width = '56%';
      }, 1000);

      console.log('Página de donaciones cargada correctamente');
  

    const ingresoUsuario = document.getElementById('imagenUsuario');
    ingresoUsuario.addEventListener('click', () => {
      window.location.href = '../login.html';
    });  