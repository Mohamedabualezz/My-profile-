document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-effect');
    const words = ['Full-Stack .NET', 'Freelancer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = isDeleting 
            ? currentWord.substring(0, charIndex - 1) 
            : currentWord.substring(0, charIndex + 1);

        typingElement.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 150);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 100);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }

    if (typingElement) {
        if (prefersReducedMotion) {
            typingElement.textContent = words[0];
        } else {
            type();
        }
    }

    
    const hiddenElements = document.querySelectorAll('.hidden');
    if (prefersReducedMotion) {
        hiddenElements.forEach((el) => el.classList.add('show'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

        hiddenElements.forEach((el) => observer.observe(el));
    }

    // Scroll to top button logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    };

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
    // Contact form handled natively via mailto; no JS needed here.

    const contactForm = document.getElementById('contactForm');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    function setFieldState(field, ok) {
        if (!field) return;
        field.style.borderBottom = ok ? '2px solid green' : '2px solid red';
    }

    if (contactForm && email && phone && message) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            const phonePattern = /^[0-9+\s()-]{9,}$/;

            const isEmailValid = emailPattern.test(email.value.trim());
            const isPhoneValid = phonePattern.test(phone.value.trim());
            const isMessageValid = message.value.trim().length >= 10;

            setFieldState(email, isEmailValid);
            setFieldState(phone, isPhoneValid);
            setFieldState(message, isMessageValid);

            if (!isEmailValid || !isPhoneValid || !isMessageValid) {
                isValid = false;
            }

            if (isValid) {
                contactForm.reset();
            }
        });
    }
});
