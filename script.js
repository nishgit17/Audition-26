// Particles animation
class ParticleSystem {
    constructor(canvasId, count = 300) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = count;
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Sparkles animation
class SparkleSystem {
    constructor(canvasId, density = 500) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.sparkles = [];
        this.density = density;
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        this.sparkles = [];
        const area = this.canvas.width * this.canvas.height;
        const count = (area / 10000) * this.density;
        
        for (let i = 0; i < count; i++) {
            this.sparkles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 0.6 + 0.4,
                opacity: Math.random(),
                fadeSpeed: Math.random() * 0.02 + 0.01,
                fadeDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.sparkles.forEach(sparkle => {
            sparkle.opacity += sparkle.fadeSpeed * sparkle.fadeDirection;
            
            if (sparkle.opacity <= 0 || sparkle.opacity >= 1) {
                sparkle.fadeDirection *= -1;
            }

            this.ctx.beginPath();
            this.ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.opacity * 0.8})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Icon Cloud - 3D Rotating Sphere
class IconCloud {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Icon cloud container not found:', containerId);
            return;
        }
        console.log('Icon cloud container found:', this.container);
        this.icons = [
            'typescript', 'javascript', 'dart', 'java', 'react', 'flutter', 
            'android', 'html5', 'css3', 'nodedotjs', 'express', 'nextdotjs',
            'prisma', 'amazonaws', 'postgresql', 'firebase', 'nginx', 'vercel',
            'testinglibrary', 'jest', 'cypress', 'docker', 'git', 'jira',
            'github', 'gitlab', 'visualstudiocode', 'androidstudio', 'sonarqube', 'figma'
        ];
        this.iconElements = [];
        this.angleX = 0;
        this.angleY = 0;
        this.init();
        this.animate();
    }

    init() {
        const containerRect = this.container.getBoundingClientRect();
        const radius = Math.min(containerRect.width, containerRect.height) / 2.2;
        console.log('Icon cloud radius:', radius, 'Container dimensions:', containerRect.width, containerRect.height);
        
        this.icons.forEach((icon, i) => {
            const iconEl = document.createElement('img');
            iconEl.className = 'icon-item';
            iconEl.src = `https://cdn.simpleicons.org/${icon}/fff`;
            iconEl.alt = icon;
            
            // Fibonacci sphere distribution for even spacing
            const goldenAngle = Math.PI * (3 - Math.sqrt(5));
            const theta = goldenAngle * i;
            const y = 1 - (i / (this.icons.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;
            
            this.iconElements.push({
                element: iconEl,
                x: x * radius,
                y: y * radius,
                z: z * radius,
                radius: radius
            });
            
            this.container.appendChild(iconEl);
        });
    }

    getIconEmoji(name) {
        // Using Simple Icons CDN for actual tech logos
        const iconImg = document.createElement('img');
        iconImg.src = `https://cdn.simpleicons.org/${name}/fff`;
        iconImg.alt = name;
        iconImg.style.width = '100%';
        iconImg.style.height = '100%';
        iconImg.style.filter = 'grayscale(100%) brightness(1.2)';
        iconImg.style.opacity = '0.7';
        return iconImg;
    }

    animate() {
        this.angleY += 0.001;
        this.angleX += 0.0005;
        
        const cosX = Math.cos(this.angleX);
        const sinX = Math.sin(this.angleX);
        const cosY = Math.cos(this.angleY);
        const sinY = Math.sin(this.angleY);
        
        this.iconElements.forEach((item) => {
            // Rotate around Y axis
            let x = item.x * cosY - item.z * sinY;
            let z = item.x * sinY + item.z * cosY;
            
            // Rotate around X axis
            let y = item.y * cosX - z * sinX;
            z = item.y * sinX + z * cosX;
            
            // Calculate scale based on z-depth
            const scale = (z + item.radius * 2) / (item.radius * 3);
            const translateX = x;
            const translateY = y;
            
            // Apply 3D transform
            item.element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            item.element.style.opacity = Math.max(0.2, Math.min(1, scale * 0.8 + 0.2));
            item.element.style.zIndex = Math.floor(scale * 100);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Countdown Timer
class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.daysEl = document.getElementById('days');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }
    
    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            this.stop();
            this.displayZeros();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.daysEl.textContent = String(days).padStart(2, '0');
        this.hoursEl.textContent = String(hours).padStart(2, '0');
        this.minutesEl.textContent = String(minutes).padStart(2, '0');
        this.secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    displayZeros() {
        this.daysEl.textContent = '00';
        this.hoursEl.textContent = '00';
        this.minutesEl.textContent = '00';
        this.secondsEl.textContent = '00';
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Handle signin - Redirect to NITDGP GLUG website
function handleSignin() {
    window.location.href = 'https://nitdgplug.org/';
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles', 300);
    new SparkleSystem('sparkles', 500);
    
    // Initialize icon cloud after a brief delay to ensure container has dimensions
    setTimeout(() => {
        new IconCloud('iconCloud');
    }, 100);
    
    // Initialize countdown timer with persistent target date
    // Check if target date exists in localStorage
    let targetDate;
    const storedTargetDate = localStorage.getItem('auditionTargetDate');
    
    if (storedTargetDate) {
        // Use existing target date from localStorage
        targetDate = new Date(parseInt(storedTargetDate));
    } else {
        // Set new target date: 2 days and 12 hours from now
        targetDate = new Date();
        const daysInMs = 2 * 24 * 60 * 60 * 1000; // 2 days
        const hoursInMs = 12 * 60 * 60 * 1000; // 12 hours
        targetDate = new Date(targetDate.getTime() + daysInMs + hoursInMs);
        
        // Store in localStorage so it persists across refreshes
        localStorage.setItem('auditionTargetDate', targetDate.getTime().toString());
    }
    
    new CountdownTimer(targetDate);
    
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const domainsSection = document.querySelector('.domains-section');
            if (domainsSection) {
                domainsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        
        // Hide scroll indicator on scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
            
            lastScroll = currentScroll;
        });
    }
});
