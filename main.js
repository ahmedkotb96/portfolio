// Theme Toggle Functionality
function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
}

// Run on page load
initTheme();

// Handle theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
});

// Mobile Menu Functionality
let isMenuOpen = false;

function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const header = document.querySelector('header');
    let lastScroll = 0;

    if (!mobileMenu || !mobileMenuBtn) return;

    // Handle header visibility on scroll
    window.addEventListener('scroll', () => {
        if (isMenuOpen) return; // Don't hide header when menu is open
        
        const currentScroll = window.scrollY;
        const isScrollingDown = currentScroll > lastScroll;

        if (currentScroll <= 0) {
            header.classList.remove('bg-white/95', 'dark:bg-gray-800/95', '-translate-y-full');
        } else if (isScrollingDown) {
            header.classList.add('-translate-y-full');
        } else {
            header.classList.remove('-translate-y-full');
            header.classList.add('bg-white/95', 'dark:bg-gray-800/95');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('hidden');
        
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars', !isMenuOpen);
        icon.classList.toggle('fa-times', isMenuOpen);
        
        if (isMenuOpen) {
            header.classList.remove('-translate-y-full');
            header.classList.add('bg-white/95', 'dark:bg-gray-800/95');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Mobile touch handling
document.addEventListener('touchstart', function() {}, {passive: true});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update active nav link
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}, {passive: true});

// Logo click handler
document.getElementById('logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    if (isMenuOpen) {
        toggleMobileMenu();
    }
});