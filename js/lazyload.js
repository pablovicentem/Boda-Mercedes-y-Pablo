// Lightweight lazy loader using existing data-src / data-srcset attributes
(function() {
    const onLoad = (img) => {
        img.classList.add('is-loaded');
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
    };

    const loadImage = (img) => {
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset') || img.getAttribute('data-src');

        if (src) {
            img.src = src;
        }

        if (srcset) {
            img.srcset = srcset;
        }

        img.loading = img.loading || 'lazy';
        img.fetchPriority = img.fetchPriority || 'low';

        if (img.complete) {
            onLoad(img);
        } else {
            img.addEventListener('load', () => onLoad(img), { once: true });
            img.addEventListener('error', () => onLoad(img), { once: true });
        }
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
                rootMargin: '200px 0px',
                threshold: 0.01
            });

            images.forEach((img) => io.observe(img));
        } else {
            // Fallback: load all images
            images.forEach(loadImage);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
