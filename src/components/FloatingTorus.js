import * as THREE from 'three';
import { animateFloat } from '../utils/animations';

export class FloatingTorus {
  constructor() {
    this.geometry = new THREE.TorusGeometry(1, 0.3, 32, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x330011,
      emissiveIntensity: 0.2
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    
    animateFloat(this.mesh);
  }

  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}