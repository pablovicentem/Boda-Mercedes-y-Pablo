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
        console.log('=== Iniciando slideshow-controls.js ===');
        
        const container = document.querySelector('.photo-strips-container');
        if (!container) {
            console.warn('❌ photo-strips-container not found');
            return;
        }
        console.log('✅ photo-strips-container encontrado');

        const leftTrack = container.querySelector('.strip-scroll-up');
        const rightTrack = container.querySelector('.strip-scroll-down');

        if (!leftTrack || !rightTrack) {
            console.warn('❌ Photo strip tracks not found');
            console.log('Left:', leftTrack, 'Right:', rightTrack);
            return;
        }
        console.log('✅ Photo strip tracks encontrados');

        let isAnimationPaused = false;
        let touchStartY = 0;

        // Variables para rastrear posición manual
        let leftScrollOffset = 0;
        let rightScrollOffset = 0;

        const itemHeight = 220 + 12; // height + gap
        const maxScroll = itemHeight * 8; // Limitar scroll

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
            console.log('🖱️ Mouse enter - pausando animación');
            isAnimationPaused = true;
            leftTrack.style.animationPlayState = 'paused';
            rightTrack.style.animationPlayState = 'paused';
            container.style.pointerEvents = 'auto';
        });

        container.addEventListener('mouseleave', () => {
            console.log('🖱️ Mouse leave - reanudando animación');
            isAnimationPaused = false;
            leftTrack.style.animationPlayState = 'running';
            rightTrack.style.animationPlayState = 'running';
            
            // Resetear scroll al salir
            leftScrollOffset = 0;
            rightScrollOffset = 0;
            updateTransforms();
        });

        /**
         * Scroll interactivo con rueda del ratón
         */
        container.addEventListener('wheel', (e) => {
            if (!isAnimationPaused) {
                console.log('Wheel pero animación no pausada');
                return;
            }
            
            console.log('🔄 Scroll detectado:', e.deltaY);
            e.preventDefault();
            
            const scrollAmount = e.deltaY > 0 ? itemHeight : -itemHeight;
            
            leftScrollOffset = Math.max(-maxScroll, Math.min(0, leftScrollOffset + scrollAmount));
            rightScrollOffset = Math.max(-maxScroll, Math.min(0, rightScrollOffset - scrollAmount));
            
            updateTransforms();
            console.log('Nuevas posiciones - Left:', leftScrollOffset, 'Right:', rightScrollOffset);
        }, { passive: false });

        /**
         * Soporte para touchscreen (swipe)
         */
        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            console.log('👆 Touch start en Y:', touchStartY);
            
            if (!isAnimationPaused) {
                isAnimationPaused = true;
                leftTrack.style.animationPlayState = 'paused';
                rightTrack.style.animationPlayState = 'paused';
                console.log('👆 Animación pausada por touch');
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isAnimationPaused) return;
            
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            if (Math.abs(diff) > 15) {
                const scrollAmount = (diff / 50) * itemHeight;
                console.log('👆 Touch move - diff:', diff, 'scroll:', scrollAmount);
                
                leftScrollOffset = Math.max(-maxScroll, Math.min(0, leftScrollOffset + scrollAmount));
                rightScrollOffset = Math.max(-maxScroll, Math.min(0, rightScrollOffset - scrollAmount));
                
                updateTransforms();
                touchStartY = touchY;
            }
        }, { passive: true });

        container.addEventListener('touchend', () => {
            console.log('👆 Touch end');
        }, { passive: true });

        /**
         * Agregar funcionalidad de modal a las imágenes
         */
        const images = container.querySelectorAll('.photo-strip-item img');
        console.log('✅ Encontradas', images.length, 'imágenes');
        
        images.forEach((img, idx) => {
            img.style.cursor = 'pointer';
            
            // Soporte para onclick directo en HTML
            img.addEventListener('click', function(e) {
                console.log('📸 Click en imagen', idx);
                e.preventDefault();
                e.stopPropagation();
                
                // Esperar a que undangan esté disponible
                if (window.undangan && window.undangan.guest && window.undangan.guest.modal) {
                    console.log('🔍 Abriendo modal');
                    window.undangan.guest.modal(this);
                } else {
                    console.warn('⚠️ undangan.guest.modal no disponible aún');
                    // Reintentar en 500ms
                    setTimeout(() => {
                        if (window.undangan && window.undangan.guest && window.undangan.guest.modal) {
                            window.undangan.guest.modal(this);
                        }
                    }, 500);
                }
            });
        });

        console.log('✅ Photo strip controls inicializados exitosamente');
    };

    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        console.log('DOM cargando... esperando DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOMContentLoaded disparado');
            setTimeout(initPhotoStripControls, 100);
        });
    } else {
        console.log('DOM ya cargado, inicializando ahora');
        setTimeout(initPhotoStripControls, 100);
    }
    
    // También intentar inicializar cuando window load
    window.addEventListener('load', () => {
        console.log('Window load disparado');
        setTimeout(initPhotoStripControls, 100);
    });
})();
