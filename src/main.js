import './style.css';
import { Scene } from './components/Scene';
import { animateTitle } from './utils/animations';
import { setupContactForm } from './utils/contact';
import { setupAnalytics } from './utils/analytics';

// Create main container
const app = document.querySelector('#app');
app.innerHTML = `
  <div class="overlay flex flex-col items-center justify-center">
    <h1 class="text-6xl font-bold mb-4 text-center floating" id="title">ONE<br/>HUGE</h1>
    <p class="text-xl opacity-75 text-center mb-8 floating" style="animation-delay: 0.2s">Premium Domain For Sale</p>
    
    <div class="form-container bg-black bg-opacity-30 p-8 rounded-lg w-full max-w-md">
      <div class="space-y-4 mb-8">
        <h2 class="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Why choose onehuge.com?</h2>
        <ul class="list-disc list-inside space-y-2 opacity-90">
          <li>Short, memorable, and brandable</li>
          <li>Perfect for tech, startup, or enterprise</li>
          <li>High authority potential</li>
          <li>Instant brand recognition</li>
        </ul>
      </div>

      <form id="contact-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1" for="name">Name</label>
          <input type="text" id="name" name="name" required
            class="w-full px-4 py-2 rounded bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 focus:outline-none text-white placeholder-gray-400 transition-all duration-300">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="email">Email</label>
          <input type="email" id="email" name="email" required
            class="w-full px-4 py-2 rounded bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 focus:outline-none text-white placeholder-gray-400 transition-all duration-300">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="offer">Offer Amount (USD)</label>
          <input type="text" id="offer" name="offer" required
            class="w-full px-4 py-2 rounded bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
            placeholder="Enter amount">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="message">Message</label>
          <textarea id="message" name="message" rows="4" required
            class="w-full px-4 py-2 rounded bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"></textarea>
        </div>
        <button type="submit" 
          class="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 focus:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
          Submit Offer
        </button>
      </form>
    </div>
  </div>
`;

// Initialize 3D scene
const scene = new Scene();
app.appendChild(scene.domElement);
scene.animate();

// Animate title
animateTitle(document.querySelector('#title'));

// Setup contact form and analytics
setupContactForm();
setupAnalytics();