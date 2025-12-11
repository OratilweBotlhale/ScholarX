document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll ONLY for anchor links (href starting with #)
    const links = document.querySelectorAll('nav a, .footer-links a, .footer-social a');
    links.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {  // Only handle anchors
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For non-anchor links (e.g., "contact.html"), do nothing—let default navigation happen
        });
    });

    // Button click alerts
  

    document.querySelector('.learn-more-btn').addEventListener('click', () => {
        const about = document.getElementById('about');
        if (about) {
            about.scrollIntoView({ behavior: 'smooth' });
        }
    });

    

    // Hero animation
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);

    // Close menu on window resize if desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Countdown Timer
    function updateCountdown() {
        const closeDate = new Date('2025-11-15T23:59:59');
        const now = new Date();
        const diff = closeDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Applications closed
            document.querySelector('.countdown').innerHTML = '<p style="font-size: 1.5rem; color: #9a3ef0;">Applications Closed!</p>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Rolling Counter Animation for Impact Section Stats
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function animateCounter(counter) {
        const originalText = counter.textContent.trim();
        const prefixMatch = originalText.match(/^[^0-9]+/);
        const prefix = prefixMatch ? prefixMatch[0] : '';
        const suffixMatch = originalText.match(/[^0-9,]+$/);
        const suffix = suffixMatch ? suffixMatch[0] : '';
        const target = parseInt(counter.getAttribute('data-target'));

        // Set initial value to 0
        counter.textContent = prefix + '0' + suffix;

        let current = 0;
        const speed = 2000; // Adjust for animation speed (higher = slower)
        const increment = target / (speed / 16); // For ~60fps

        function updateCounter() {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                const displayNum = formatNumber(Math.floor(current));
                counter.textContent = prefix + displayNum + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure exact final value with original formatting
                const finalNumStr = originalText.match(/[0-9,]+/) ? originalText.match(/[0-9,]+/)[0] : target.toString();
                counter.textContent = prefix + finalNumStr + suffix;
            }
        }

        updateCounter();
    }

    function animateCounters(sectionSelector) {
        const counters = document.querySelectorAll(`${sectionSelector} .stat-number[data-target]`);
        counters.forEach(animateCounter);
    }

    // Intersection Observer to trigger animation when section is in view
    const impactSection = document.querySelector('.impact-section');
    const statsSection = document.querySelector('.stats-section');
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of section is visible (adjusted for better trigger)
        rootMargin: '0px 0px -50px 0px' // Trigger slightly early
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === impactSection) {
                    animateCounters('.impact-section');
                }
                if (entry.target === statsSection) {
                    animateCounters('.stats-section');
                }
            }
        });
    }, observerOptions);

    if (impactSection) observer.observe(impactSection);
    if (statsSection) observer.observe(statsSection);
});