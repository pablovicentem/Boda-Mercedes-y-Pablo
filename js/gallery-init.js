/**
 * Dynamic Gallery Generator
 * Automatically loads images from assets/images/desktop/images.json
 * and generates gallery carousels
 */

const initializeGallery = async () => {
    try {
        // Fetch the images list
        const response = await fetch('./assets/images/desktop/images.json');
        const data = await response.json();
        const images = data.images;

        if (!images || images.length === 0) return;

        // Split images into two carousels (3 per carousel)
        const carousel1Images = images.slice(0, 3);
        const carousel2Images = images.slice(3, 6);

        // Generate first carousel
        generateCarousel('carousel-image-one', carousel1Images);

        // Generate second carousel if there are more images
        if (carousel2Images.length > 0) {
            generateCarousel('carousel-image-two', carousel2Images);
        }

    } catch (error) {
        console.error('Error loading gallery images:', error);
    }
};

const generateCarousel = (carouselId, imagesToLoad) => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    // Find the carousel-inner div
    const carouselInner = carousel.querySelector('.carousel-inner');
    const carouselIndicators = carousel.querySelector('.carousel-indicators');

    if (!carouselInner || !carouselIndicators) return;

    // Clear existing items
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Generate new items
    imagesToLoad.forEach((image, index) => {
        // Create indicator button
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', `#${carouselId}`);
        indicator.setAttribute('data-bs-slide-to', index.toString());
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) {
            indicator.className = 'active';
            indicator.setAttribute('aria-current', 'true');
        }
        carouselIndicators.appendChild(indicator);

        // Create carousel item
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === 0) item.classList.add('active');

        const img = document.createElement('img');
        img.src = './assets/images/placeholder.webp';
        img.setAttribute('data-src', `./assets/images/desktop/${image}`);
        img.alt = `Gallery image ${index + 1}`;
        img.className = 'd-block img-fluid cursor-pointer';
        img.addEventListener('click', function() {
            undangan.guest.modal(this);
        });

        item.appendChild(img);
        carouselInner.appendChild(item);
    });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
    initializeGallery();
}
