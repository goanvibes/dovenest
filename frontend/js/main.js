// 1. Theme Engine (Executes immediately to prevent FOUC - Flash of Unstyled Content)
(function initializeTheme() {
    const themeKey = 'dove-nest-theme';
    let currentTheme = localStorage.getItem(themeKey);

    // If no theme is set, default to light but offer dark mode immediately
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

// 2. DOM Interactivity (Executes after HTML is parsed)
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navbar Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('animate-fade-in');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('animate-fade-in');
            }
        });
    }

    // Manual Theme Toggle Button (Optional but recommended for accessibility)
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('dove-nest-theme', isDark ? 'dark' : 'light');
        });
    }
});
