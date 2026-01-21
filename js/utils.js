/**
 * Utility Functions
 */

// Debounce function
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lerp (Linear Interpolation)
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Clamp value between min and max
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Map value from one range to another
function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Get element offset from top of document
function getOffsetTop(element) {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

// Check if element is in viewport
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset
    );
}

// Get scroll percentage of element
function getScrollPercentage(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    const scrolled = windowHeight - rect.top;
    const total = windowHeight + elementHeight;

    return clamp(scrolled / total, 0, 1);
}

// Smooth scroll to element
function smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = getOffsetTop(targetElement) - 80; // Offset for header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (easeInOutCubic)
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Generate random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Generate random integer between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Wait/sleep function
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get CSS variable value
function getCSSVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Set CSS variable value
function setCSSVar(name, value) {
    document.documentElement.style.setProperty(name, value);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        lerp,
        clamp,
        mapRange,
        getOffsetTop,
        isInViewport,
        getScrollPercentage,
        smoothScrollTo,
        random,
        randomInt,
        wait,
        getCSSVar,
        setCSSVar
    };
}
