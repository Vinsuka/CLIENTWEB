// ===== Main JavaScript File =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== Header Scroll Effect =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Mobile Menu Toggle =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ===== Smooth Scrolling for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Active Navigation Link =====
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // ===== Project Filter =====
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in-up');
                }
            });
        });
    });

    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Basic validation
        const requiredFields = ['name', 'email', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#E6EEF6';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service__card, .strength__card, .project__card, .director__card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ===== Client Logo Carousel =====
    const clientCarousel = document.querySelector('.clients__carousel');
    if (clientCarousel) {
        let isPaused = false;
        
        // Auto-scroll carousel
        function autoScroll() {
            if (!isPaused) {
                const firstLogo = clientCarousel.firstElementChild;
                clientCarousel.appendChild(firstLogo);
            }
        }
        
        // Start auto-scroll
        setInterval(autoScroll, 3000);
        
        // Pause on hover
        clientCarousel.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        clientCarousel.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }

    // ===== Service Modal (if needed) =====
    const serviceButtons = document.querySelectorAll('.service__btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service__card');
            const serviceTitle = serviceCard.querySelector('.service__title').textContent;
            
            // Create modal content based on service
            let modalContent = '';
            
            if (serviceTitle.includes('Telecom')) {
                modalContent = `
                    <h3>Telecom Infrastructure Development - Technical Details</h3>
                    <ul>
                        <li><strong>Equipment Shelters:</strong> Weather-resistant cabins with proper ventilation and security</li>
                        <li><strong>Cable Management:</strong> Structured cable routing with proper grounding</li>
                        <li><strong>Safety Systems:</strong> Comprehensive alarm monitoring for power, temperature, and security</li>
                        <li><strong>Tower Services:</strong> Professional fabrication and installation of communication towers</li>
                        <li><strong>Decommissioning:</strong> Safe dismantling and site restoration</li>
                    </ul>
                `;
            } else {
                modalContent = `
                    <h3>Air-Conditioning & Refrigeration - Technical Details</h3>
                    <ul>
                        <li><strong>Industrial Systems:</strong> Heavy-duty units for manufacturing and telecom facilities</li>
                        <li><strong>Cold Storage:</strong> Temperature-controlled environments for sensitive equipment</li>
                        <li><strong>Automated Controls:</strong> Smart monitoring and control systems for optimal efficiency</li>
                        <li><strong>Maintenance Services:</strong> Regular servicing and emergency repairs</li>
                        <li><strong>Custom Panels:</strong> Bespoke control panel design and fabrication</li>
                    </ul>
                `;
            }
            
            // Show modal (simple alert for now)
            alert(modalContent);
        });
    });

    // ===== Lazy Loading for Images =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===== Scroll to Top Button =====
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Form Input Focus Effects =====
    const formInputs = document.querySelectorAll('.form__input, .form__textarea, .form__select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ===== Initialize everything =====
    console.log('Topcon website initialized successfully!');
});

// ===== Utility Functions =====

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Lightbox Functions =====
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox__img');
    
    lightboxImg.src = imageSrc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== Export functions for potential use =====
window.TopconWebsite = {
    debounce,
    throttle,
    openLightbox,
    closeLightbox
};
