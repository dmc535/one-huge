import * as THREE from 'three';
import { EffectComposer } from 'postprocessing';
import { RenderPass } from 'postprocessing';
import { BloomEffect, EffectPass } from 'postprocessing';
import { ParticleSystem } from './ParticleSystem';
import { FloatingTorus } from './FloatingTorus';
import { InteractiveSphere } from './InteractiveSphere';
import { setupLights } from '../utils/lighting';
import { setupCamera } from '../utils/camera';
import { MouseTracker } from '../utils/mouse';
import { optimizePerformance } from '../utils/performance';

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = setupCamera();
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance",
      alpha: true
    });
    this.clock = new THREE.Clock();
    this.mouseTracker = new MouseTracker(this.camera);
    this.stats = optimizePerformance(this.renderer);
    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    setupLights(this.scene);
    
    this.particles = new ParticleSystem();
    this.scene.add(this.particles.mesh);
    
    this.torus = new FloatingTorus();
    this.scene.add(this.torus.mesh);

    this.sphere = new InteractiveSphere();
    this.scene.add(this.sphere.mesh);

    this.setupPostProcessing();
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Enable frustum culling
    this.scene.matrixAutoUpdate = false;
    this.scene.updateMatrix();
  }

  setupPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    const bloomEffect = new BloomEffect({
      intensity: 1.5,
      luminanceThreshold: 0.4,
      luminanceSmoothing: 0.7,
      height: 480
    });
    
    const effectPass = new EffectPass(this.camera, bloomEffect);
    this.composer.addPass(effectPass);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.composer) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (this.stats) this.stats.begin();
    
    const delta = this.clock.getDelta();
    
    this.particles.update();
    this.torus.update();
    this.sphere.update();
    
    this.composer.render(delta);
    
    if (this.stats) this.stats.end();
  }

  get domElement() {
    return this.renderer.domElement;
  }
}