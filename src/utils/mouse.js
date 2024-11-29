import * as THREE from 'three';

export class MouseTracker {
  constructor(camera) {
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.init();
  }

  init() {
    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle camera movement
      this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
      this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, 0);
    });
  }
}