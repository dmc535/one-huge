import * as THREE from 'three';

export const setupLights = (scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  const pointLight1 = new THREE.PointLight(0xff3366, 2, 10);
  pointLight1.position.set(-2, 3, 4);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x00ff88, 2, 10);
  pointLight2.position.set(2, -3, -4);
  scene.add(pointLight2);

  // Animate point lights
  const animate = () => {
    const time = Date.now() * 0.001;
    pointLight1.position.x = Math.sin(time) * 3;
    pointLight1.position.z = Math.cos(time) * 3;
    pointLight2.position.x = Math.sin(time + Math.PI) * 3;
    pointLight2.position.z = Math.cos(time + Math.PI) * 3;
    requestAnimationFrame(animate);
  };
  animate();
};