document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('profile-card');
  const avatarGlow = document.querySelector('.avatar-glow');
  const avatarImg = document.querySelector('.avatar-image');

  // Check if browser/device supports hover (exclude mobile touch)
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (supportsHover && card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element

      // Calculate relative position (-0.5 to 0.5)
      const xc = x / rect.width - 0.5;
      const yc = y / rect.height - 0.5;

      // Limit max rotation to 8 degrees
      const maxRotate = 8;
      const rotateX = -yc * maxRotate;
      const rotateY = xc * maxRotate;

      // Apply 3D rotation to the card
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Add a subtle translation to the glow/avatar for secondary parallax
      if (avatarGlow) {
        avatarGlow.style.transform = `translate(${xc * 12}px, ${yc * 12}px) rotate(${rotateY * 2}deg)`;
      }
      if (avatarImg) {
        avatarImg.style.transform = `translate(${xc * -6}px, ${yc * -6}px)`;
      }
    });

    // Reset card transforms when mouse leaves
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      if (avatarGlow) {
        avatarGlow.style.transform = 'translate(0px, 0px) rotate(0deg)';
      }
      if (avatarImg) {
        avatarImg.style.transform = 'translate(0px, 0px) scale(1)';
      }
    });
  }

  // Google Analytics Event Tracking for Social Links
  const socialLinks = [
    { id: 'link-x', event: 'clicked_x' },
    { id: 'link-github', event: 'clicked_github' },
    { id: 'link-linkedin', event: 'clicked_linkedin' },
    { id: 'link-threads', event: 'clicked_threads' }
  ];

  socialLinks.forEach(({ id, event }) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', () => {
        if (typeof gtag === 'function') {
          gtag('event', event);
        }
      });
    }
  });
});

