import { fadeIn, slideIn } from './animations.js';

export class BookingManager {
  constructor() {
    this.form = document.querySelector('.booking-form');
    this.serviceSelect = document.getElementById('service-type');
    this.toolFields = document.getElementById('tool-fields');
    this.repairFields = document.getElementById('repair-fields');
    this.progressSteps = document.querySelectorAll('.progress-step');
    this.currentStep = 1;
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.initializeFormAnimations();
    }
    
    if (this.serviceSelect) {
      this.serviceSelect.addEventListener('change', this.toggleFields.bind(this));
    }

    // Initialize date inputs with min date of today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => input.min = today);

    // Add input event listeners for progress tracking
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => this.updateProgress());
    });
  }

  initializeFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 100}ms`;
    });
  }

  updateProgress() {
    const requiredFields = {
      1: ['service-type'],
      2: ['tool', 'rental-date', 'rental-duration', 'equipment', 'issue', 'preferred-date'],
      3: ['name', 'email', 'phone']
    };

    let completedSteps = 1;
    
    // Check service type selection
    if (this.serviceSelect.value) {
      completedSteps = 2;
      
      // Check service-specific fields
      const relevantFields = this.serviceSelect.value === 'rental' 
        ? ['tool', 'rental-date', 'rental-duration']
        : ['equipment', 'issue', 'preferred-date'];
        
      const serviceFieldsComplete = relevantFields.every(field => {
        const element = document.getElementById(field);
        return element && element.value;
      });
      
      if (serviceFieldsComplete) completedSteps = 3;
    }

    this.progressSteps.forEach((step, index) => {
      if (index < completedSteps) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  toggleFields(e) {
    const value = e.target.value;
    
    if (value === 'rental') {
      this.toolFields.classList.remove('hidden');
      this.repairFields.classList.add('hidden');
      this.animateFields(this.toolFields);
    } else if (value === 'repair') {
      this.toolFields.classList.add('hidden');
      this.repairFields.classList.remove('hidden');
      this.animateFields(this.repairFields);
    }
    
    this.updateProgress();
  }

  animateFields(container) {
    const fields = container.querySelectorAll('.form-group');
    fields.forEach((field, index) => {
      field.style.opacity = '0';
      field.style.transform = 'translateY(20px)';
      setTimeout(() => {
        field.style.transition = 'all 0.5s ease-out';
        field.style.opacity = '1';
        field.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const submitButton = this.form.querySelector('.btn-submit');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    try {
      await this.simulateBookingSubmission(data);
      this.showSuccessMessage();
      this.form.reset();
      this.updateProgress();
    } catch (error) {
      this.showErrorMessage(error.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Booking';
    }
  }

  simulateBookingSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.name && data.email && data.phone) {
          resolve({ success: true });
        } else {
          reject(new Error('Please fill in all required fields'));
        }
      }, 1500);
    });
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
      <strong>Booking Confirmed!</strong>
      <p>We will contact you shortly with further details.</p>
    `;
    this.form.insertBefore(message, this.form.firstChild);
    fadeIn(message);
    setTimeout(() => message.remove(), 5000);
  }

  showErrorMessage(error) {
    const message = document.createElement('div');
    message.className = 'alert alert-error';
    message.innerHTML = `
      <strong>Error!</strong>
      <p>${error}</p>
    `;
    this.form.insertBefore(message, this.form.firstChild);
    fadeIn(message);
    setTimeout(() => message.remove(), 5000);
  }
}