// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// RSVP Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const responseDiv = document.getElementById('form-response');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                nama: formData.get('nama'),
                email: formData.get('email'),
                telepon: formData.get('telepon'),
                jumlah: formData.get('jumlah'),
                kehadiran: formData.get('kehadiran'),
                pesan: formData.get('pesan'),
                timestamp: new Date().toISOString()
            };

            // Save to localStorage
            let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
            rsvps.push(data);
            localStorage.setItem('rsvps', JSON.stringify(rsvps));

            // Trigger confetti
            triggerConfetti();

            // Show success message
            responseDiv.className = 'alert alert-success';
            responseDiv.textContent = '¡Gracias por confirmar! 🎉 Nos vemos en la boda.';
            responseDiv.style.display = 'block';

            // Reset form
            form.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                responseDiv.style.display = 'none';
            }, 5000);
        });
    }
});

// Confetti Animation
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Smooth scroll for buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Gallery Click (Optional: for lightbox)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add your lightbox logic here if needed
        console.log('Gallery item clicked');
    });
});

console.log('🎉 Wedding website loaded successfully!');
