// Smooth scroll behavior (already handled by CSS)

// RSVP Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvp-form');
    const responseDiv = document.getElementById('form-response');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                telefono: formData.get('telefono'),
                numPersonas: formData.get('numPersonas'),
                asistencia: formData.get('asistencia'),
                dietasEspeciales: formData.get('dietasEspeciales'),
                mensaje: formData.get('mensaje'),
                timestamp: new Date().toISOString()
            };

            // Save to localStorage (for demonstration)
            let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
            rsvps.push(data);
            localStorage.setItem('rsvps', JSON.stringify(rsvps));

            // Send to Google Forms (optional - requires setup)
            // sendToGoogleForms(data);

            // Show success message
            responseDiv.classList.remove('error');
            responseDiv.classList.add('success');
            responseDiv.textContent = '¡Gracias por confirmar! 🎉 Nos vemos en la boda.';

            // Reset form
            form.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                responseDiv.classList.remove('success');
            }, 5000);
        });
    }
});

// Smooth scroll navigation
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.pareja-card, .timeline-item, .galeria-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Function to send data to Google Forms (optional)
function sendToGoogleForms(data) {
    // Replace with your Google Form ID and field mappings
    // This is a placeholder function
    const googleFormUrl = 'https://docs.google.com/forms/d/YOUR_FORM_ID/formResponse';
    
    const formDataForGoogle = new FormData();
    // Map your fields accordingly
    formDataForGoogle.append('entry.FIELD_ID_1', data.nombre);
    formDataForGoogle.append('entry.FIELD_ID_2', data.email);
    // ... continue with other fields

    fetch(googleFormUrl, {
        method: 'POST',
        body: formDataForGoogle,
        mode: 'no-cors'
    }).catch(error => console.log('Form submission tracked'));
}
