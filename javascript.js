// Toggle FAQ answers
const faqs = document.querySelectorAll('.faq-item');

faqs.forEach(faq => {
  faq.querySelector('.faq-question').addEventListener('click', () => {
    faq.classList.toggle('active');
  });
});

    // Basic interactions and validation

    function submitApplication(){
      const name = document.getElementById('app-name').value.trim();
      const email = document.getElementById('app-email').value.trim();
      if(!name || !validateEmail(email)){
        alert('Please provide your name and a valid email.');
        return;
      }
      // Simulated submit
      alert('Application sent! Our team will reach out soon.');
      closeModal();
    }

