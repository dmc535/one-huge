import * as THREE from 'three';
import Stats from 'stats.js';

export const optimizePerformance = (renderer) => {
  // Optimize renderer
  renderer.powerPreference = "high-performance";
  renderer.antialias = window.devicePixelRatio === 1;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Enable shadow map optimization
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  
  // Enable physical lighting mode for better performance
  renderer.physicallyCorrectLights = true;
  
  // Optimize texture loading
  THREE.Cache.enabled = true;
  
  // Add FPS monitoring in development
  if (process.env.NODE_ENV === 'development') {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = '0px';
    stats.dom.style.left = '0px';
    stats.dom.style.zIndex = '20';
    document.body.appendChild(stats.dom);
    return stats;
  }
  
  return null;
};