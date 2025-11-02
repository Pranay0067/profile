// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form (Formspree)
const form = document.getElementById('contact-form');
if (form) {
    form.action = "https://formspree.io/f/your_formspree_id"; // Replace with your ID
    form.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(form);
        fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } })
            .then(() => { alert("Message sent!"); form.reset(); })
            .catch(() => alert("Error. Try again."));
    });
}

// Fade In
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(20px)';
    sec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(sec);
});
