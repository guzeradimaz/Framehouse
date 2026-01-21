/**
 * Animation Controllers
 */

class AnimationController {
    constructor() {
        this.observers = [];
        this.animatedElements = [];
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParallax();
    }

    // Intersection Observer for reveal animations
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Add stagger delay for children if needed
                    if (entry.target.classList.contains('stagger-children')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            child.style.transitionDelay = `${index * 0.1}s`;
                            child.classList.add('is-visible');
                        });
                    }
                }
            });
        }, options);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.reveal-text, .slide-up, .fade-in, .fade-in-up');
        animatedElements.forEach(el => observer.observe(el));

        this.observers.push(observer);
    }

    // Scroll-based animations
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll]');

        if (scrollElements.length === 0) return;

        const handleScroll = throttle(() => {
            scrollElements.forEach(el => {
                const speed = parseFloat(el.dataset.scrollSpeed) || 0.5;
                const scrolled = window.pageYOffset;
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrolled;

                if (scrolled + window.innerHeight > elementTop) {
                    const yPos = (scrolled - elementTop) * speed;
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, 16);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Parallax effect for hero shapes
    setupParallax() {
        const shapes = document.querySelectorAll('.hero__shape');

        if (shapes.length === 0) return;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        });

        const animate = () => {
            currentX = lerp(currentX, mouseX, 0.05);
            currentY = lerp(currentY, mouseY, 0.05);

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = currentX * speed;
                const y = currentY * speed;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // Text split animation
    splitText(element) {
        const text = element.textContent;
        element.textContent = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.03}s`;
            span.classList.add('char');
            element.appendChild(span);
        });
    }

    // Counter animation
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // Magnetic effect for buttons
    addMagneticEffect(element, strength = 0.3) {
        const rect = element.getBoundingClientRect();

        element.addEventListener('mousemove', (e) => {
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    }

    // Destroy all observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Smooth scroll links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                smoothScrollTo(targetId);
            });
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
    window.smoothScroll = new SmoothScroll();
});
