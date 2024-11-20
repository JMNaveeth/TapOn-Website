import { fadeIn, slideIn } from './animations.js';

export class BookingManager {
    constructor() {
        this.form = document.querySelector('.booking-form');
        this.serviceSelect = document.getElementById('service-type');
        this.toolFields = document.getElementById('tool-fields');
        this.repairFields = document.getElementById('repair-fields');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        if (this.serviceSelect) {
            this.serviceSelect.addEventListener('change', this.toggleFields.bind(this));
        }

        // Initialize date inputs with min date of today
        const dateInputs = document.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => input.min = today);
    }

    toggleFields(e) {
        const value = e.target.value;

        if (value === 'rental') {
            this.toolFields.classList.remove('hidden');
            this.repairFields.classList.add('hidden');
            slideIn(this.toolFields);
        } else if (value === 'repair') {
            this.toolFields.classList.add('hidden');
            this.repairFields.classList.remove('hidden');
            slideIn(this.repairFields);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simulate API call
        try {
            await this.simulateBookingSubmission(data);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage(error.message);
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
            }, 1000);
        });
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.textContent = 'Booking received! We will contact you shortly.';
        this.form.insertBefore(message, this.form.firstChild);
        fadeIn(message);
        setTimeout(() => message.remove(), 5000);
    }

    showErrorMessage(error) {
        const message = document.createElement('div');
        message.className = 'alert alert-error';
        message.textContent = error;
        this.form.insertBefore(message, this.form.firstChild);
        fadeIn(message);
        setTimeout(() => message.remove(), 5000);
    }
}