/**
 * ARCHIVO: slideshow-controls.js
 * PROPÓSITO: Controles interactivos para el carrusel de fotos
 * 
 * Permite:
 * - Pausar/Reanudar animación al pasar el cursor
 * - Desplazamiento manual con scroll/swipe INFINITO
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
        const scrollCooldown = 80; // ms entre scrolls
        const scrollStep = itemHeight; // Desplazar un item a la vez

        /**
         * Normalizar scroll infinito
         * Cuando el scroll salga del rango, lo reinicia en la otra punta
         */
        const normalizeScroll = () => {
            const maxOffset = itemHeight * 8; // Altura de 8 items
            
            // Normalizar left track
            if (leftScrollOffset <= -maxOffset) {
                leftScrollOffset += maxOffset;
            } else if (leftScrollOffset > 0) {
                leftScrollOffset -= maxOffset;
            }
            
            // Normalizar right track (va en dirección opuesta)
            if (rightScrollOffset <= -maxOffset) {
                rightScrollOffset += maxOffset;
            } else if (rightScrollOffset > 0) {
                rightScrollOffset -= maxOffset;
            }
        };

        /**
         * Actualizar transformaciones
         */
        const updateTransforms = () => {
            leftTrack.style.transform = `translateY(${leftScrollOffset}px)`;
            rightTrack.style.transform = `translateY(${rightScrollOffset}px)`;
            normalizeScroll();
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
            const scrollAmount = direction * scrollStep;
            
            leftScrollOffset += scrollAmount;
            rightScrollOffset -= scrollAmount;
            
            updateTransforms();
            console.log('🔄 Scroll - Left:', leftScrollOffset, 'Right:', rightScrollOffset);
        }, { passive: false });

        /**
         * Soporte para touchscreen (swipe vertical)
         */
        let touchStartTime = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            console.log('👆 Touch start en Y:', touchStartY);
            
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
            
            // Sensibilidad: cada 10px de movimiento = 1 item
            const scrollAmount = Math.floor(diff / 50) * scrollStep;
            
            if (Math.abs(scrollAmount) > 0) {
                leftScrollOffset = scrollAmount;
                rightScrollOffset = -scrollAmount;
                updateTransforms();
            }
        }, { passive: true });

        container.addEventListener('touchend', () => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Si fue un tap rápido (menos de 200ms) sin movimiento, ignorar
            if (touchDuration > 200) {
                console.log('👆 Touch end - swipe detectado');
            }
        }, { passive: true });

        /**
         * Agregar funcionalidad de modal a las imágenes
         */
        const images = container.querySelectorAll('.photo-strip-item img');
        console.log('✅ Encontradas', images.length, 'imágenes');
        
        images.forEach((img, idx) => {
            img.style.cursor = 'pointer';
            
            // Usar addEventListener para mejor manejo
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('📸 Click en imagen', idx);
                
                // Función para abrir modal con reintentos
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
