export const fadeIn = (element) => {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => element.style.opacity = '1', 10);
  };
  
  export const slideIn = (element) => {
    element.style.transform = 'translateY(20px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.5s ease-out';
    setTimeout(() => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    }, 10);
  };
  
  export const addHoverEffect = (element) => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'scale(1.02) translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1) translateY(0)';
    });
  };