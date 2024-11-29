import gsap from 'gsap';

export const animateTitle = (element) => {
  gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
  });
  
  // Add subtle hover effect
  element.style.transition = 'transform 0.3s ease';
  element.addEventListener('mouseover', () => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  element.addEventListener('mouseout', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
};

export const animateFloat = (mesh) => {
  gsap.to(mesh.position, {
    y: '+=0.5',
    duration: 2,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });
  
  gsap.to(mesh.rotation, {
    z: Math.PI * 2,
    duration: 12,
    ease: "none",
    repeat: -1
  });
};