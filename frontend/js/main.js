// 1. Theme Engine
(function initializeTheme() {
    const themeKey = 'dove-nest-theme';
    let currentTheme = localStorage.getItem(themeKey);

    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        localStorage.setItem(themeKey, currentTheme);
    }

    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Lenis Smooth Scroll (Susegad Vibe)
    // Ensure Lenis script is loaded in HTML <head> for this to work
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.5, // Slowed down for that relaxed Goan feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 3. Intersection Observer for Image Mask Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'in-view' class to trigger the CSS clip-path animation
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Grab all elements with the trigger class and observe them
    const triggers = document.querySelectorAll('.observer-trigger');
    triggers.forEach(trigger => {
        imageObserver.observe(trigger);
    });

    // 4. Mobile Navbar Toggle (Existing logic)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('animate-fade-in');
        });
    }

    // 5. Theme Toggle Button
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('dove-nest-theme', isDark ? 'dark' : 'light');
        });
    }
});
