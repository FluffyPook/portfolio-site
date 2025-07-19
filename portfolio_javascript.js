// Portfolio JavaScript - Enhanced Interactivity

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // SMOOTH SCROLLING NAVIGATION
    // ===============================
    
    // Add smooth scrolling for all navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===============================
    // SCROLL ANIMATIONS
    // ===============================
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .contact-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(element);
    });

    // ===============================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ===============================
    
    // Track which section is currently in view
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`nav a[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===============================
    // PROJECT CARD INTERACTIONS
    // ===============================
    
    // Enhanced project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        
        // Add click handler for the entire card
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on a link
            if (e.target.tagName !== 'A') {
                const projectTitle = this.querySelector('.project-title').textContent;
                const viewProjectLink = this.querySelector('.link-primary');
                
                if (viewProjectLink && viewProjectLink.href !== '#') {
                    window.open(viewProjectLink.href, '_blank');
                } else {
                    console.log(`Opening project: ${projectTitle}`);
                    // You can replace this with actual project navigation
                    showProjectModal(projectTitle);
                }
            }
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Add focus styles for accessibility
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '4px';
        });

        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // ===============================
    // PROJECT MODAL (Optional Enhancement)
    // ===============================
    
    function showProjectModal(projectTitle) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h3 style="margin-bottom: 20px; color: #333;">${projectTitle}</h3>
            <p style="color: #666; margin-bottom: 30px;">This project is still in development. Check back soon!</p>
            <button onclick="this.closest('.modal-overlay').remove()" 
                    style="padding: 12px 24px; background: #333; color: white; border: none; border-radius: 6px; cursor: pointer;">
                Close
            </button>
        `;

        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        // Animate modal in
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Close on overlay click
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });

        // Close on Escape key
        function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modalOverlay.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        }
        document.addEventListener('keydown', closeOnEscape);
    }

    // ===============================
    // CONTACT FORM VALIDATION (If you add a contact form)
    // ===============================
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===============================
    // TYPING ANIMATION FOR HERO TEXT
    // ===============================
    
    function createTypingAnimation() {
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        const typingSpeed = 50; // milliseconds per character
        
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #333';
        
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeText, 500);
    }

    // Uncomment the line below to enable typing animation
    // createTypingAnimation();

    // ===============================
    // THEME SWITCHER (Optional)
    // ===============================
    
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: #333;
            color: white;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 100;
        `;

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });

        document.body.appendChild(themeToggle);

        // Add dark theme styles
        const darkThemeStyles = document.createElement('style');
        darkThemeStyles.textContent = `
            .dark-theme {
                background-color: #1a1a1a !important;
                color: #e0e0e0 !important;
            }
            .dark-theme .project-card {
                background: #2a2a2a !important;
                color: #e0e0e0 !important;
            }
            .dark-theme .hero h1,
            .dark-theme .section-title,
            .dark-theme .project-title {
                color: #e0e0e0 !important;
            }
            .dark-theme nav a {
                color: #b0b0b0 !important;
            }
            .dark-theme nav a:hover {
                color: #e0e0e0 !important;
            }
        `;
        document.head.appendChild(darkThemeStyles);
    }

    // Uncomment the line below to enable theme toggle
    // createThemeToggle();

    // ===============================
    // SCROLL PROGRESS INDICATOR
    // ===============================
    
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 1000;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Uncomment the line below to enable scroll progress
    // createScrollProgress();

    // ===============================
    // PERFORMANCE MONITORING
    // ===============================
    
    // Log page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.now();
            console.log(`Portfolio loaded in ${loadTime.toFixed(2)}ms`);
        }
    });

    // ===============================
    // ACCESSIBILITY ENHANCEMENTS
    // ===============================
    
    // Skip link for keyboard navigation
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#projects';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #333;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    addSkipLink();

    console.log('Portfolio JavaScript loaded successfully! 🚀');
});

// ===============================
// UTILITY FUNCTIONS
// ===============================

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

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top button when user scrolls down
window.addEventListener('scroll', debounce(function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (scrollTop > 300) {
        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.id = 'scroll-top-btn';
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: #333;
                color: white;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 100;
                opacity: 0;
                transform: translateY(20px);
            `;
            
            scrollTopBtn.addEventListener('click', scrollToTop);
            document.body.appendChild(scrollTopBtn);
            
            // Animate in
            setTimeout(() => {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'translateY(0)';
            }, 100);
        }
    } else if (scrollTopBtn) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (scrollTopBtn && scrollTopBtn.parentNode) {
                scrollTopBtn.parentNode.removeChild(scrollTopBtn);
            }
        }, 300);
    }
}, 100));