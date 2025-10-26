// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            navMenu.classList.remove('active'); // Close menu on mobile
        }
    });
});

// Contact Form with Email via Formspree
const form = document.getElementById('contact-form');
if (form) {
    form.action = "https://formspree.io/f/your_formspree_id"; // Replace with your Formspree ID
    form.method = "POST";
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const currentDate = '10:19 PM GMT, Sunday, October 26, 2025';
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert(`Message sent at ${currentDate}! You’ll receive a copy via email at ${formData.get('email')}.`);
                form.reset();
            } else {
                alert('Error sending message. Please try again.');
            }
        }).catch(error => {
            alert('Error: ' + error.message);
        });
    });
}

// Fade-In Animation for Sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});