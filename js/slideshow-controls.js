/**
 * ARCHIVO: slideshow-controls.js
 * PROPÓSITO: Controles interactivos para el carrusel de fotos
 * 
 * Permite:
 * - Pausar/Reanudar animación al pasar el cursor
 * - Desplazamiento manual con scroll/swipe
 * - Click en foto para ver en grande (modal)
 */

(function() {
    const initPhotoStripControls = () => {
        const container = document.querySelector('.photo-strips-container');
        if (!container) {
            console.warn('photo-strips-container not found');
            return;
        }

        const leftStrip = container.querySelector('.photo-strip-left');
        const rightStrip = container.querySelector('.photo-strip-right');

        if (!leftStrip || !rightStrip) {
            console.warn('Photo strips not found');
            return;
        }

        const leftTrack = leftStrip.querySelector('.photo-strip-track');
        const rightTrack = rightStrip.querySelector('.photo-strip-track');

        if (!leftTrack || !rightTrack) {
            console.warn('Photo strip tracks not found');
            return;
        }

        let isAnimationPaused = false;
        let touchStartY = 0;

        // Variables para rastrear posición manual
        let leftScrollOffset = 0;
        let rightScrollOffset = 0;

        const itemHeight = 220 + 12; // height + gap
        const maxScroll = itemHeight * 6; // Limitar scroll

        /**
         * Actualizar transformaciones
         */
        const updateTransforms = () => {
            leftTrack.style.transform = `translateY(${leftScrollOffset}px)`;
            rightTrack.style.transform = `translateY(${rightScrollOffset}px)`;
        };

        /**
         * Pausar/Reanudar animación en hover
         */
        container.addEventListener('mouseenter', () => {
            isAnimationPaused = true;
            container.style.animationPlayState = 'paused';
            leftTrack.style.animationPlayState = 'paused';
            rightTrack.style.animationPlayState = 'paused';
            console.log('Animation paused');
        });

        container.addEventListener('mouseleave', () => {
            isAnimationPaused = false;
            container.style.animationPlayState = 'running';
            leftTrack.style.animationPlayState = 'running';
            rightTrack.style.animationPlayState = 'running';
            console.log('Animation resumed');
        });

        /**
         * Scroll interactivo con rueda del ratón
         */
        container.addEventListener('wheel', (e) => {
            if (isAnimationPaused) {
                e.preventDefault();
                
                const scrollAmount = e.deltaY > 0 ? itemHeight : -itemHeight;
                
                leftScrollOffset = Math.max(-maxScroll, Math.min(0, leftScrollOffset + scrollAmount));
                rightScrollOffset = Math.max(-maxScroll, Math.min(0, rightScrollOffset - scrollAmount));
                
                updateTransforms();
                console.log('Scroll:', leftScrollOffset, rightScrollOffset);
            }
        }, { passive: false });

        /**
         * Soporte para touchscreen (swipe)
         */
        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            
            if (!isAnimationPaused) {
                isAnimationPaused = true;
                leftTrack.style.animationPlayState = 'paused';
                rightTrack.style.animationPlayState = 'paused';
                console.log('Touch: Animation paused');
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isAnimationPaused) return;
            
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            if (Math.abs(diff) > 10) {
                const scrollAmount = (diff / 100) * itemHeight;
                
                leftScrollOffset = Math.max(-maxScroll, Math.min(0, leftScrollOffset + scrollAmount));
                rightScrollOffset = Math.max(-maxScroll, Math.min(0, rightScrollOffset - scrollAmount));
                
                updateTransforms();
                touchStartY = touchY;
            }
        }, { passive: true });

        /**
         * Agregar funcionalidad de modal a las imágenes
         */
        const images = container.querySelectorAll('.photo-strip-item img');
        console.log('Found', images.length, 'images');
        
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                console.log('Image clicked');
                if (window.undangan && window.undangan.guest && window.undangan.guest.modal) {
                    undangan.guest.modal(this);
                }
            });
        });

        console.log('Photo strip controls initialized successfully');
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPhotoStripControls);
    } else {
        initPhotoStripControls();
    }
})();
