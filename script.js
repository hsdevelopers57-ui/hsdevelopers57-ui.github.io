// 1. Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times (X)
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 2. Scroll Reveal Animation (This creates the "changes while scrolling" effect!)
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" 
};

// The IntersectionObserver watches for elements entering the screen
const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Add 'active' class to trigger CSS animations
            entry.target.classList.add('active'); 
        }
    });
}, revealOptions);

// Tell the observer to watch all elements with the .reveal class
revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// 3. Active Navigation Link & Header Style on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Only run this check if the section actually has an ID
        if(section.hasAttribute('id') && scrollY >= (sectionTop - sectionHeight / 3)){
            current = section.getAttribute('id');
        }
    });
    
    // Highlight links dynamically (only for sections on the SAME page)
    if (current !== '') {
        navItems.forEach(item => {
            // Don't auto-highlight links that go to different HTML files
            if (item.getAttribute('href').startsWith('#') || item.getAttribute('href').includes('index.html#')) {
                item.classList.remove('active');
                if(item.getAttribute('href').includes(current)){
                    item.classList.add('active');
                }
            }
        });
    }
    
    // Header Style on Scroll
    const header = document.querySelector('header');
    if(window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        header.style.boxShadow = 'none';
    }
});