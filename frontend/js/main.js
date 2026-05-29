// 1. Theme Safe Bootstrapper
(function initializeTheme() {
    const themeKey = 'dove-nest-theme';
    let currentTheme = localStorage.getItem(themeKey);
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        localStorage.setItem(themeKey, currentTheme);
    }
    if (currentTheme === 'dark') document.documentElement.classList.add('dark');
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Lenis Smooth Scroll Setup
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.95,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 3. Dynamic Bounding Mask Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.observer-trigger').forEach(el => imageObserver.observe(el));

    // 4. Manual Theme Toggler
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('dove-nest-theme', isDark ? 'dark' : 'light');
        });
    }
});
