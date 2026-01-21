/**
 * Main Application
 */

class App {
    constructor() {
        this.loader = document.getElementById('loader');
        this.header = document.getElementById('header');
        this.burger = document.getElementById('burger');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.cursor = document.querySelector('.cursor-follower');

        this.init();
    }

    init() {
        this.hideLoader();
        this.setupHeader();
        this.setupMobileMenu();
        this.setupCursor();
        this.setupFAQ();
        this.setupFormSections();
        this.setupHoverEffects();
        this.setupLanguageSwitcher();
        this.setupCurrencySwitcher();
    }

    // Hide loader after page load
    hideLoader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('is-hidden');
                document.body.style.overflow = '';
            }, 800);
        });

        // Fallback if load event already fired
        if (document.readyState === 'complete') {
            setTimeout(() => {
                this.loader.classList.add('is-hidden');
            }, 800);
        }
    }

    // Header scroll effect
    setupHeader() {
        const handleScroll = throttle(() => {
            if (window.scrollY > 50) {
                this.header.classList.add('is-scrolled');
            } else {
                this.header.classList.remove('is-scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Mobile menu toggle
    setupMobileMenu() {
        if (!this.burger || !this.mobileMenu) return;

        this.burger.addEventListener('click', () => {
            this.burger.classList.toggle('is-active');
            this.mobileMenu.classList.toggle('is-open');
            document.body.style.overflow = this.mobileMenu.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close menu on link click
        const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-menu__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.burger.classList.remove('is-active');
                this.mobileMenu.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // Custom cursor
    setupCursor() {
        if (!this.cursor) return;

        // Check for touch device
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
            return;
        }

        let cursorX = 0;
        let cursorY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;

            if (!this.cursor.classList.contains('is-visible')) {
                this.cursor.classList.add('is-visible');
            }
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.classList.remove('is-visible');
        });

        // Smooth cursor movement
        const animateCursor = () => {
            cursorX = lerp(cursorX, targetX, 0.15);
            cursorY = lerp(cursorY, targetY, 0.15);

            this.cursor.style.left = `${cursorX}px`;
            this.cursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .upload-zone, .criteria__item, .step');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('is-active');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('is-active');
            });
        });
    }

    // FAQ accordion
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');

            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('is-open')) {
                        otherItem.classList.remove('is-open');
                    }
                });

                // Toggle current item
                item.classList.toggle('is-open');
            });
        });
    }

    // Form sections accordion
    setupFormSections() {
        const formSections = document.querySelectorAll('.form-section');

        formSections.forEach(section => {
            const header = section.querySelector('.form-section__header');

            header.addEventListener('click', () => {
                section.classList.toggle('is-open');
            });
        });
    }

    // Hover effects
    setupHoverEffects() {
        // Criteria items stagger
        const criteriaItems = document.querySelectorAll('.criteria__item');

        criteriaItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });

        // Steps stagger
        const steps = document.querySelectorAll('.step');

        steps.forEach((step, index) => {
            step.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Language Switcher
    setupLanguageSwitcher() {
        const langSwitcher = document.getElementById('langSwitcher');
        if (!langSwitcher || !window.i18n) return;

        const buttons = langSwitcher.querySelectorAll('.lang-switcher__btn');

        // Set initial active state from stored preference
        const currentLang = i18n.currentLang;
        buttons.forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
        });

        // Handle clicks
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                i18n.setLang(lang);

                buttons.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');

                // Update document lang attribute
                document.documentElement.lang = lang;
            });
        });
    }

    // Currency Switcher
    setupCurrencySwitcher() {
        const currencySwitcher = document.getElementById('currencySwitcher');
        if (!currencySwitcher || !window.currency) return;

        const buttons = currencySwitcher.querySelectorAll('.currency-switcher__btn');

        // Set initial active state from stored preference
        const currentCurrency = currency.currentCurrency;
        buttons.forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.currency === currentCurrency);
        });

        // Handle clicks
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const curr = btn.dataset.currency;
                currency.setCurrency(curr);

                buttons.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
            });
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
