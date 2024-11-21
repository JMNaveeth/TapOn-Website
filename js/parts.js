import { fadeIn, addHoverEffect } from './animations.js';

export class PartsManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupPartsCards();
    this.setupSearch();
  }

  setupPartsCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      addHoverEffect(card);
      card.addEventListener('click', this.handlePartClick.bind(this));
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('parts-search');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearch.bind(this));
    }
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = text.includes(searchTerm);
      card.style.display = match ? 'block' : 'none';
      if (match) fadeIn(card);
    });
  }

  handlePartClick(e) {
    const card = e.currentTarget;
    const partName = card.querySelector('h2').textContent;
    
    // Simulate adding to cart
    this.showAddedToCart(partName);
  }

  showAddedToCart(partName) {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.textContent = `${partName} added to cart`;
    document.querySelector('main').insertBefore(message, document.querySelector('main').firstChild);
    fadeIn(message);
    setTimeout(() => message.remove(), 3000);
  }
}