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
            return;
        }
        console.log('✅ Photo strip tracks encontrados');

        let isAnimationPaused = false;
        let touchStartY = 0;
        let lastScrollTime = 0;

        // Variables para rastrear posición manual
        let leftScrollOffset = 0;
        let rightScrollOffset = 0;

        const itemHeight = 232; // height(220) + gap(12)
        const maxScroll = itemHeight * 8;
        const scrollCooldown = 100; // ms entre scrolls

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
            if (!isAnimationPaused) return;
            
            const now = Date.now();
            if (now - lastScrollTime < scrollCooldown) return;
            lastScrollTime = now;
            
            e.preventDefault();
            
            const direction = e.deltaY > 0 ? 1 : -1;
            const scrollAmount = direction * itemHeight;
            
            leftScrollOffset = Math.max(-maxScroll, Math.min(0, leftScrollOffset + scrollAmount));
            rightScrollOffset = Math.max(-maxScroll, Math.min(0, rightScrollOffset - scrollAmount));
            
            updateTransforms();
            console.log('🔄 Scroll - Left:', leftScrollOffset, 'Right:', rightScrollOffset);
        }, { passive: false });

        /**
         * Soporte para touchscreen (swipe)
         */
        let touchMoving = false;

        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchMoving = false;
            console.log('👆 Touch start');
            
            if (!isAnimationPaused) {
                isAnimationPaused = true;
                leftTrack.style.animationPlayState = 'paused';
                rightTrack.style.animationPlayState = 'paused';
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isAnimationPaused) return;
            
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            if (Math.abs(diff) > 5) {
                touchMoving = true;
                const scrollAmount = (diff / 20); // Sensibilidad
                
                leftScrollOffset = Math.max(-maxScroll, Math.min(0, leftScrollOffset + scrollAmount));
                rightScrollOffset = Math.max(-maxScroll, Math.min(0, rightScrollOffset - scrollAmount));
                
                updateTransforms();
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
            
            // Reemplazar onclick con addEventListener para mejor manejo
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('📸 Click en imagen', idx);
                
                // Función para abrir modal
                const openModal = () => {
                    if (window.undangan && window.undangan.guest && window.undangan.guest.modal) {
                        console.log('🔍 Abriendo modal');
                        window.undangan.guest.modal(this);
                    } else {
                        console.warn('⚠️ undangan.guest.modal no disponible, reintentando...');
                        setTimeout(openModal.bind(this), 300);
                    }
                };
                
                openModal.call(this);
            });
        });

        console.log('✅ Photo strip controls inicializados exitosamente');
    };

    // Inicializar en múltiples puntos de tiempo para asegurar que funcione
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initPhotoStripControls, 200);
        });
    } else {
        setTimeout(initPhotoStripControls, 200);
    }
    
    // También intentar cuando window load
    window.addEventListener('load', () => {
        console.log('Window load disparado');
        setTimeout(initPhotoStripControls, 200);
    });
})();
