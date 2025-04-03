const canvas = document.getElementById('lanternCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const textContainer = document.getElementById('textContainer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Lantern class
class Lantern {
  constructor(x, y, width, height, color, speed, swingAmplitude, swingFrequency) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.swingAmplitude = swingAmplitude; // How far the lantern swings
    this.swingFrequency = swingFrequency; // How fast the lantern swings
    this.angle = Math.random() * Math.PI * 2; // Random starting angle
    this.glowPhase = Math.random() * Math.PI * 2; // Random glow phase for pulsation
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y); // Move to the lantern's position
    ctx.rotate(Math.sin(this.angle) * this.swingAmplitude); // Apply pendulum motion

    // Pulsating glow effect
    const glowIntensity = (Math.sin(this.glowPhase) * 0.2 + 0.8); // Vary between 0.6 and 1.0
    ctx.globalAlpha = glowIntensity; // Vary transparency for glow
    ctx.shadowBlur = 20 * glowIntensity; // Vary shadow blur for glow
    ctx.shadowColor = this.color;

    // Draw a soft-edged lantern (rounded rectangle)
    const cornerRadius = this.width * 0.2; // Soften edges with rounded corners
    ctx.beginPath();
    ctx.moveTo(-this.width / 2 + cornerRadius, -this.height / 2);
    ctx.arcTo(this.width / 2, -this.height / 2, this.width / 2, this.height / 2, cornerRadius);
    ctx.arcTo(this.width / 2, this.height / 2, -this.width / 2, this.height / 2, cornerRadius);
    ctx.arcTo(-this.width / 2, this.height / 2, -this.width / 2, -this.height / 2, cornerRadius);
    ctx.arcTo(-this.width / 2, -this.height / 2, this.width / 2, -this.height / 2, cornerRadius);
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.y -= this.speed; // Move lantern upwards
    this.angle += this.swingFrequency; // Update pendulum angle
    this.glowPhase += 0.02; // Update glow phase for pulsation

    // Reset lantern to the bottom if it goes off-screen
    if (this.y + this.height / 2 < 0) { // Check if the top of the lantern is off-screen
      this.y = canvas.height + this.height / 2; // Reset to just below the bottom
      this.x = Math.random() * canvas.width; // Randomize x position on reset
    }

    this.draw();
  }
}

// Create lanterns gradually
const lanterns = [];
const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF4500', '#FF8C00'];
const numLanterns = 75;
const delayBetweenLanterns = 200; // Delay between each lantern's appearance (in milliseconds)

function createLanterns() {
  for (let i = 0; i < numLanterns; i++) {
    setTimeout(() => {
      const width = Math.random() * 20 + 10; // Random width
      const height = width * 1.5; // Height is 1.5 times the width (rectangular shape)
      const x = Math.random() * canvas.width; // Random x position
      const y = canvas.height + height / 2; // Start just below the bottom of the screen
      const color = colors[Math.floor(Math.random() * colors.length)]; // Random color
      const speed = Math.random() * 0.5 + 0.1; // Random speed
      const swingAmplitude = Math.random() * 0.1 + 0.05; // Random swing amplitude
      const swingFrequency = Math.random() * 0.05 + 0.02; // Random swing frequency
      lanterns.push(new Lantern(x, y, width, height, color, speed, swingAmplitude, swingFrequency));
    }, i * delayBetweenLanterns); // Stagger lantern creation
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lanterns.forEach(lantern => lantern.update());
  requestAnimationFrame(animate);
}

// Start lanterns on button click
startButton.addEventListener('click', () => {
  startButton.style.display = 'none'; // Hide the button
  createLanterns();
  animate();
  startTextSequence();
});

// Text sequence
const texts = [
  "Text 1", "Text 2", "Text 3", "Text 4", "Text 5",
  "Text 6", "Text 7", "Text 8", "Text 9", "Text 10",
  "Text 11", "Text 12", "Text 13", "Text 14", "Text 15",
  "Text 16", "Text 17", "Text 18", "Text 19", "Text 20"
];

let currentTextIndex = 0;

function startTextSequence() {
  if (currentTextIndex < texts.length) {
    textContainer.textContent = texts[currentTextIndex];
    textContainer.style.opacity = 1; // Fade in
    setTimeout(() => {
      textContainer.style.opacity = 0; // Fade out
      setTimeout(() => {
        currentTextIndex++;
        startTextSequence(); // Show next text
      }, 1000); // Wait 1 second before showing the next text
    }, 4500); // Show each text for 4.5 seconds
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});