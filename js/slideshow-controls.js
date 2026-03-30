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
        if (!container) return;

        const leftStrip = container.querySelector('.photo-strip-left .photo-strip-track');
        const rightStrip = container.querySelector('.photo-strip-right .photo-strip-track');

        if (!leftStrip || !rightStrip) return;

        let isAnimationPaused = false;
        let touchStartY = 0;
        let touchStartX = 0;

        // Variables para rastrear posición manual
        let leftScrollOffset = 0;
        let rightScrollOffset = 0;

        /**
         * Pausar/Reanudar animación en hover
         */
        container.addEventListener('mouseenter', () => {
            isAnimationPaused = true;
            leftStrip.style.animationPlayState = 'paused';
            rightStrip.style.animationPlayState = 'paused';
        });

        container.addEventListener('mouseleave', () => {
            isAnimationPaused = false;
            leftStrip.style.animationPlayState = 'running';
            rightStrip.style.animationPlayState = 'running';
        });

        /**
         * Scroll interactivo con rueda del ratón
         */
        container.addEventListener('wheel', (e) => {
            if (isAnimationPaused) {
                e.preventDefault();
                
                const itemHeight = 220 + 12; // height + gap
                const scrollAmount = e.deltaY > 0 ? itemHeight : -itemHeight;
                
                leftScrollOffset += scrollAmount;
                rightScrollOffset -= scrollAmount; // Derecha se mueve opuesto
                
                // Aplicar límites
                leftScrollOffset = Math.min(0, Math.max(leftScrollOffset, -itemHeight * 3));
                rightScrollOffset = Math.min(0, Math.max(rightScrollOffset, -itemHeight * 3));
                
                leftStrip.style.transform = `translateY(${leftScrollOffset}px)`;
                rightStrip.style.transform = `translateY(${rightScrollOffset}px)`;
            }
        }, { passive: false });

        /**
         * Soporte para touchscreen (swipe)
         */
        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            
            if (!isAnimationPaused) {
                isAnimationPaused = true;
                leftStrip.style.animationPlayState = 'paused';
                rightStrip.style.animationPlayState = 'paused';
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isAnimationPaused) return;
            
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            if (Math.abs(diff) > 5) { // Solo si el movimiento es significativo
                const itemHeight = 220 + 12;
                const scrollAmount = (diff / 50) * itemHeight;
                
                leftScrollOffset = Math.min(0, Math.max(leftScrollOffset + scrollAmount, -itemHeight * 3));
                rightScrollOffset = Math.min(0, Math.max(rightScrollOffset - scrollAmount, -itemHeight * 3));
                
                leftStrip.style.transform = `translateY(${leftScrollOffset}px)`;
                rightStrip.style.transform = `translateY(${rightScrollOffset}px)`;
                
                touchStartY = touchY;
            }
        }, { passive: true });

        container.addEventListener('touchend', () => {
            // La animación se reanuda al salir del hover en touch
        }, { passive: true });

        /**
         * Agregar funcionalidad de modal a las imágenes
         */
        const images = container.querySelectorAll('.photo-strip-item img');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                if (window.undangan && window.undangan.guest && window.undangan.guest.modal) {
                    undangan.guest.modal(this);
                }
            });
        });

        console.log('Photo strip controls initialized');
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPhotoStripControls);
    } else {
        initPhotoStripControls();
    }
})();
