// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        this.init();
    }

    init() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);

        // Add event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.classList.add('dark');
            if (this.themeIcon) {
                this.themeIcon.textContent = '☀️';
            }
        } else {
            html.classList.remove('dark');
            if (this.themeIcon) {
                this.themeIcon.textContent = '🌙';
            }
        }
        
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.menuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileNav = document.getElementById('mobile-nav');
        this.hamburgerLines = this.menuToggle?.querySelectorAll('.hamburger-line');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on a link
        if (this.mobileNav) {
            this.mobileNav.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link-mobile')) {
                    this.closeMenu();
                }
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menuToggle?.contains(e.target) && !this.mobileNav?.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        if (this.mobileNav) {
            this.mobileNav.classList.add('show');
            this.mobileNav.style.display = 'flex';
        }
        this.animateHamburger(true);
    }

    closeMenu() {
        this.isOpen = false;
        if (this.mobileNav) {
            this.mobileNav.classList.remove('show');
            this.mobileNav.style.display = 'none';
        }
        this.animateHamburger(false);
    }

    animateHamburger(isOpen) {
        if (!this.hamburgerLines) return;

        if (isOpen) {
            this.hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            this.hamburgerLines[1].style.opacity = '0';
            this.hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            this.hamburgerLines[0].style.transform = 'none';
            this.hamburgerLines[1].style.opacity = '1';
            this.hamburgerLines[2].style.transform = 'none';
        }
    }
}

// Smooth Scrolling
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Animation Observer
class AnimationObserver {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.animationPlayState = 'paused';
            this.observer.observe(el);
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Optimize scroll events
        this.optimizeScrollEvents();
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeScrollEvents() {
        let ticking = false;

        const updateScrollEffects = () => {
            // Add scroll-based effects here if needed
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLinks = [
            'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;600;700&display=swap'
        ];

        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        this.addKeyboardNavigation();
        
        // Add focus management
        this.addFocusManagement();
        
        // Add ARIA labels where needed
        this.addAriaLabels();
    }

    addKeyboardNavigation() {
        // Handle escape key for mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-nav');
                if (mobileMenu && mobileMenu.classList.contains('show')) {
                    window.mobileMenuManager?.closeMenu();
                }
            }
        });

        // Add tab navigation for cards
        document.querySelectorAll('.quick-nav-card, .priest-card, .altar-item').forEach(card => {
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    addFocusManagement() {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    addAriaLabels() {
        // Add aria-labels to interactive elements without text
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle && !themeToggle.hasAttribute('aria-label')) {
            themeToggle.setAttribute('aria-label', 'تبديل الوضع المظلم/المضيء');
        }

        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileToggle && !mobileToggle.hasAttribute('aria-label')) {
            mobileToggle.setAttribute('aria-label', 'فتح/إغلاق القائمة');
        }
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Handle image loading errors
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', (e) => {
                console.warn('Image failed to load:', e.target.src);
                // You could add a placeholder image here
            });
        });

        // Handle general JavaScript errors
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    window.themeManager = new ThemeManager();
    window.mobileMenuManager = new MobileMenuManager();
    window.smoothScrollManager = new SmoothScrollManager();
    window.animationObserver = new AnimationObserver();
    window.performanceOptimizer = new PerformanceOptimizer();
    window.accessibilityManager = new AccessibilityManager();
    window.errorHandler = new ErrorHandler();

    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('🏛️ Church website initialized successfully');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations if needed
        console.log('Page hidden - pausing non-essential operations');
    } else {
        // Page is visible - resume animations
        console.log('Page visible - resuming operations');
    }
});

// Export for potential external use
window.ChurchWebsite = {
    ThemeManager,
    MobileMenuManager,
    SmoothScrollManager,
    AnimationObserver,
    PerformanceOptimizer,
    AccessibilityManager,
    ErrorHandler
};
