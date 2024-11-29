import * as THREE from 'three';
import { gsap } from 'gsap';

export class InteractiveSphere {
  constructor() {
    this.geometry = new THREE.SphereGeometry(0.5, 32, 32);
    this.material = new THREE.MeshPhysicalMaterial({
      color: 0x00ff88,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-2, 0, 0);
    
    this.setupAnimation();
  }

  setupAnimation() {
    gsap.to(this.mesh.position, {
      y: '+= 0.5',
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });

    gsap.to(this.mesh.rotation, {
      y: Math.PI * 2,
      duration: 8,
      repeat: -1,
      ease: 'none'
    });
  }

  update() {
    this.material.transmission = 0.5 + Math.sin(Date.now() * 0.001) * 0.2;
  }
}