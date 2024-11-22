import { BookingManager } from './js/booking.js';
import { PartsManager } from './js/parts.js';
import { fadeIn, slideIn } from './js/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers based on current page
  if (document.querySelector('.booking-form')) {
    new BookingManager();
  }
  
  if (document.querySelector('.parts-section')) {
    new PartsManager();
  }

  // Animate page elements
  const heroSection = document.querySelector('.hero');
  if (heroSection) fadeIn(heroSection);

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    setTimeout(() => slideIn(card), index * 200);
  });
});