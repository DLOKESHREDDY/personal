// Navigation Menu Toggle
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// Hide menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Active link highlighting
function scrollActive() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Header background on scroll
function scrollHeader() {
    const header = document.getElementById('header');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    if (this.scrollY >= 80) {
        if (isDarkTheme) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.98)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (isDarkTheme) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
        header.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', scrollHeader);

// Show scroll to top button
function scrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (this.scrollY >= 560) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

// Dark/Light theme toggle
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected theme
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Get current theme and icon
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// Validate if user previously chose a theme
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    
    // Set initial header background based on theme
    const header = document.getElementById('header');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const scrollY = window.scrollY;
    
    if (scrollY >= 80) {
        if (isDarkTheme) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.98)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (isDarkTheme) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
        header.style.boxShadow = 'none';
    }
}

// Activate/deactivate theme manually
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    
    // Reset header background when theme changes
    const header = document.getElementById('header');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const scrollY = window.scrollY;
    
    if (scrollY >= 80) {
        if (isDarkTheme) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.98)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (isDarkTheme) {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
        header.style.boxShadow = 'none';
    }
    
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category-row, .project-card, .timeline-item, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle form submission
        // For now, we'll just show an alert
        alert('Thank you for your message! I\'ll get back to you soon.');
    });
}

// Add loading animation for project images
document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Skills hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-avatar');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Toggle function for experience details
function toggleDetails(button) {
    const details = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        icon.className = 'uil uil-angle-down';
        button.innerHTML = '<i class="uil uil-angle-down"></i> View Details';
    } else {
        details.classList.add('expanded');
        icon.className = 'uil uil-angle-up';
        button.innerHTML = '<i class="uil uil-angle-up"></i> Hide Details';
    }
}

// Enhanced animations for education cards
document.querySelectorAll('.education-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to hero avatar
function floatAvatar() {
    const avatar = document.querySelector('.hero-avatar');
    if (avatar) {
        let direction = 1;
        let position = 0;
        
        setInterval(() => {
            position += direction * 0.5;
            if (position >= 10 || position <= -10) {
                direction *= -1;
            }
            avatar.style.transform = `translateY(${position}px)`;
        }, 50);
    }
}

// Initialize floating animation
window.addEventListener('load', floatAvatar);

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(style);

// Initialize particles
window.addEventListener('load', createParticles);

// Add typing effect to skill tags
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag-row');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize skill tag animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTags();
            skillsObserver.unobserve(entry.target);
        }
    });
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add smooth reveal animation for education cards
function animateEducationCards() {
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Initialize education card animation
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateEducationCards();
            educationObserver.unobserve(entry.target);
        }
    });
});

const educationSection = document.querySelector('.education');
if (educationSection) {
    educationObserver.observe(educationSection);
}

// Enhanced skill tag animations with staggered effect
function animateSkillTagsStaggered() {
    const skillCategories = document.querySelectorAll('.skill-category-row');
    skillCategories.forEach((category, categoryIndex) => {
        const tags = category.querySelectorAll('.skill-tag-row');
        tags.forEach((tag, tagIndex) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(30px) rotate(5deg)';
            
            setTimeout(() => {
                tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0) rotate(0deg)';
            }, (categoryIndex * 200) + (tagIndex * 100));
        });
    });
}

// Initialize staggered skill tag animation
const skillsStaggeredObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTagsStaggered();
            skillsStaggeredObserver.unobserve(entry.target);
        }
    });
});

const skillsRowSection = document.querySelector('.skills-row');
if (skillsRowSection) {
    skillsStaggeredObserver.observe(skillsRowSection);
}

// Add magnetic effect to skill icons
function addMagneticEffect() {
    const skillIcons = document.querySelectorAll('.skill-icon-row');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            icon.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.1)`;
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Initialize magnetic effect
window.addEventListener('load', addMagneticEffect);

// Add typing effect to project titles
function typeProjectTitles() {
    const projectTitles = document.querySelectorAll('.project-title');
    
    projectTitles.forEach((title, index) => {
        const originalText = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--primary-color)';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            }, 50);
        }, index * 500);
    });
}

// Initialize project title typing when projects section is visible
const projectsTypingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeProjectTitles();
            projectsTypingObserver.unobserve(entry.target);
        }
    });
});

const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    projectsTypingObserver.observe(projectsSection);
}

// Add parallax scrolling effect
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-avatar, .skill-icon-row');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax effect
window.addEventListener('load', addParallaxEffect);

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .skill-tag-row, .timeline-toggle');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize ripple effect
window.addEventListener('load', addRippleEffect);

// Add floating animation to skill categories
function addFloatingAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category-row');
    
    skillCategories.forEach((category, index) => {
        const delay = index * 0.5;
        category.style.animation = `float 3s ease-in-out infinite`;
        category.style.animationDelay = `${delay}s`;
    });
}

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatingStyle);

// Initialize floating animation
window.addEventListener('load', addFloatingAnimation);

// Formspree Integration
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        formMessage.style.display = 'none';

        try {
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                // Error
                const data = await response.json();
                if (data.errors) {
                    showMessage('Please check your form and try again.', 'error');
                } else {
                    showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            }
        } catch (error) {
            // Network error
            showMessage('Sorry, there was a network error. Please check your connection and try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-flex';
            btnLoading.style.display = 'none';
        }
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContactForm);

// Enhanced form validation
function addFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.name === 'name' && value && value.length < 2) {
            showFieldError(field, 'Name must be at least 2 characters long');
            return false;
        }
        
        if (field.name === 'message' && value && value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', addFormValidation);

// Add character counter for message field
function addCharacterCounter() {
    const messageField = document.getElementById('message');
    if (!messageField) return;

    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = '0 / 500 characters';
    messageField.parentNode.appendChild(counter);

    // Update counter on input
    messageField.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length} / 500 characters`;
        
        if (length > 500) {
            counter.style.color = 'var(--error-color)';
        } else if (length > 400) {
            counter.style.color = 'var(--warning-color)';
        } else {
            counter.style.color = 'var(--text-muted)';
        }
    });
}

// Initialize character counter
document.addEventListener('DOMContentLoaded', addCharacterCounter);

// Production-ready enhancements
function addProductionEnhancements() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Add loading states to external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 1000);
        });
    });

    // Add intersection observer for contact stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    function animateStats(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        const finalNumber = numberElement.textContent;
        
        // Animate numbers
        if (finalNumber.includes('%')) {
            animatePercentage(numberElement, parseInt(finalNumber));
        } else if (finalNumber.includes('h')) {
            animateHours(numberElement, parseInt(finalNumber));
        } else if (finalNumber.includes('+')) {
            animateYears(numberElement, parseInt(finalNumber));
        }
    }

    function animatePercentage(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 20);
    }

    function animateHours(element, target) {
        let current = 0;
        const increment = target / 20;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + 'h';
        }, 30);
    }

    function animateYears(element, target) {
        let current = 0;
        const increment = target / 15;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 40);
    }
}

// Initialize production enhancements
document.addEventListener('DOMContentLoaded', addProductionEnhancements);

// Add glow effect to project cards on hover
function addGlowEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.3), 0 0 0 1px rgba(255, 107, 107, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// Initialize glow effect
window.addEventListener('load', addGlowEffect);