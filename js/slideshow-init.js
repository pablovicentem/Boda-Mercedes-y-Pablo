/**
 * Dynamic Slideshow Generator
 * Automatically loads images from assets/images/desktop/images.json
 * and generates slides
 */

const initializeSlideshow = async () => {
    try {
        // Fetch the images list
        const response = await fetch('./assets/images/desktop/images.json');
        const data = await response.json();
        const images = data.images;

        // Get the container
        const container = document.getElementById('slideshow-container');
        
        if (!container) return;

        // Generate slide divs for each image
        images.forEach(image => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'position-absolute h-100 w-100 slide-desktop';
            slideDiv.style.opacity = '0';

            const img = document.createElement('img');
            img.src = './assets/images/placeholder.webp';
            img.setAttribute('data-src', `./assets/images/desktop/${image}`);
            img.alt = 'bg';
            img.className = 'bg-cover-home';
            img.style.maskImage = 'none';
            img.style.opacity = '30%';

            slideDiv.appendChild(img);
            container.appendChild(slideDiv);
        });

    } catch (error) {
        console.error('Error loading slideshow images:', error);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlideshow);
} else {
    initializeSlideshow();
}
