document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth >= 1024) {
        // Only hide the native cursor once the custom cursor is actually running
        document.body.classList.add('js-cursor-active');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add a slight delay for the outline for a smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effects for the cursor
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 94, 58, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });

            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        const isOpen = menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // --- Theme Toggle ---
    // Initial theme was already applied before first paint by the inline script in <head>.
    const themeToggleDesktop = document.getElementById('theme-toggle');

    function updateThemeToggleState(theme) {
        if (!themeToggleDesktop) return;
        const isLight = theme === 'light';
        themeToggleDesktop.setAttribute('aria-pressed', String(isLight));
        themeToggleDesktop.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleState(newTheme);
    }

    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme);
        updateThemeToggleState(document.documentElement.getAttribute('data-theme'));
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot: if a bot filled this hidden field, silently drop the submission
            if (contactForm.querySelector('[name="_gotcha"]').value) {
                contactForm.reset();
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Thanks! Your message has been sent — we'll be in touch soon.";
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Something went wrong. Please try again or email us directly.';
                    formStatus.className = 'form-status error';
                }
            } catch (err) {
                formStatus.textContent = 'Network error. Please check your connection and try again.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    // --- Footer Year ---
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve if you only want the animation to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need reveal animations
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Trigger Hero Animations on load ---
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .reveal-text, .hero .reveal-fade');
        heroElements.forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});
