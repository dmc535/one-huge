import { createClient } from '@formspree/core';

const FORMSPREE_FORM_ID = 'xzblvkdb'; // Formspree form ID for dcarpixel@gmail.com

export const setupContactForm = () => {
  const form = document.getElementById('contact-form');
  let submitting = false;
  
  const updateButtonState = (isSubmitting) => {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = isSubmitting;
    button.innerHTML = isSubmitting ? 
      '<span class="animate-pulse">Sending...</span>' : 
      'Submit Offer';
  };
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    submitting = true;
    updateButtonState(true);
    
    try {
      const formData = new FormData(form);
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-out';
        successMessage.innerHTML = '✨ Thank you for your offer! We\'ll be in touch soon.';
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => successMessage.remove(), 500);
        }, 5000);
        
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
      errorMessage.innerHTML = '❌ Sorry, there was an error. Please try again.';
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        errorMessage.style.opacity = '0';
        setTimeout(() => errorMessage.remove(), 500);
      }, 5000);
    } finally {
      submitting = false;
      updateButtonState(false);
    }
  });
  
  // Add input validation and formatting
  const offerInput = form.querySelector('#offer');
  offerInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      value = parseInt(value, 10).toLocaleString('en-US');
      e.target.value = `$${value}`;
    }
  });
};