// Robust lazy loader with error handling
(function() {
    const onLoad = (img) => {
        img.classList.add('is-loaded');
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
    };

    const loadImage = (img) => {
        const src = img.getAttribute('data-src');
        
        if (!src) return;

        // Set the image source
        const newImg = new Image();
        
        newImg.onload = function() {
            img.src = src;
            onLoad(img);
        };
        
        newImg.onerror = function() {
            // If data-src fails, try srcset
            const srcset = img.getAttribute('data-srcset');
            if (srcset && srcset !== src) {
                img.srcset = srcset;
            }
            img.src = src; // Still set src even if it might fail
            onLoad(img);
        };
        
        newImg.src = src;
    };

    const init = () => {
        const images = Array.from(document.querySelectorAll('img[data-src]'));
        
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '300px 0px',
                threshold: 0.01
            });

            images.forEach((img) => io.observe(img));
        } else {
            // Fallback: load all images immediately
            images.forEach(loadImage);
        }
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also run on window load for safety
    window.addEventListener('load', init);
})();
