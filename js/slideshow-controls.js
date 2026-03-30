/**
 * ARCHIVO: slideshow-controls.js
 * PROPÓSITO: Carrusel infinito de fotos con scroll/swipe
 * 
 * Características:
 * - Bucle infinito automático
 * - Scroll con rueda del ratón
 * - Swipe vertical en móvil
 * - Click en foto = Modal
 * - Pausar al pasar cursor
 */

(function() {
    const initPhotoStripControls = () => {
        console.log('=== Iniciando slideshow-controls.js ===');
        
        const container = document.querySelector('.photo-strips-container');
        if (!container) {
            console.warn('❌ photo-strips-container no encontrado');
            return;
        }
        console.log('✅ photo-strips-container encontrado');

        const leftTrack = container.querySelector('.strip-scroll-up');
        const rightTrack = container.querySelector('.strip-scroll-down');

        if (!leftTrack || !rightTrack) {
            console.warn('❌ Photo strip tracks no encontrados');
            return;
        }

        const leftImages = Array.from(leftTrack.querySelectorAll('img'));
        const rightImages = Array.from(rightTrack.querySelectorAll('img'));
        const itemHeight = 232; // altura de imagen (220) + gap (12)
        const totalItems = 8; // Items visibles en cada columna

        console.log(`✅ ${leftImages.length} imágenes en track izquierdo`);
        console.log(`✅ ${rightImages.length} imágenes en track derecho`);

        // Estado del carrusel
        let state = {
            isAnimationPaused: false,
            leftPosition: 0,    // Posición actual en píxeles
            rightPosition: 0,
            leftIndex: 0,       // Índice del item actual
            rightIndex: 0,
            isDragging: false,
            touchStart: 0,
            lastScrollTime: 0
        };

        /**
         * Actualizar posición visual con normalización correcta de bucle
         */
        const updatePosition = () => {
            const maxPhysicalHeight = itemHeight * totalItems; // 1856px
            
            // Normalizar posiciones: asegurar que siempre estén entre 0 y maxPhysicalHeight
            // Fórmula: ((x % max) + max) % max funciona correctamente con negativos
            state.leftPosition = ((state.leftPosition % maxPhysicalHeight) + maxPhysicalHeight) % maxPhysicalHeight;
            state.rightPosition = ((state.rightPosition % maxPhysicalHeight) + maxPhysicalHeight) % maxPhysicalHeight;
            
            // Aplicar transformación (negativo para scroll hacia arriba)
            leftTrack.style.transform = `translateY(${-state.leftPosition}px)`;
            rightTrack.style.transform = `translateY(${-state.rightPosition}px)`;
            
            console.log(`✨ Posición normalizada - L=${state.leftPosition}px, R=${state.rightPosition}px`);
        };

        /**
         * Desplazar N items
         */
        const moveItems = (direction) => {
            const distance = itemHeight * direction;
            state.leftPosition += distance;
            state.rightPosition -= distance;
            state.leftIndex = (state.leftIndex + direction) % totalItems;
            state.rightIndex = (state.rightIndex - direction + totalItems) % totalItems;
            
            console.log(`🔄 Movimiento: L=${state.leftPosition}px, R=${state.rightPosition}px, LIdx=${state.leftIndex}, RIdx=${state.rightIndex}`);
            updatePosition();
        };

        /**
         * Pausar animación automática
         */
        container.addEventListener('mouseenter', () => {
            console.log('🖱️ Cursor entrado - animación pausada');
            state.isAnimationPaused = true;
            leftTrack.style.animationPlayState = 'paused';
            rightTrack.style.animationPlayState = 'paused';
        });

        /**
         * Reanudar animación automática
         */
        container.addEventListener('mouseleave', () => {
            console.log('🖱️ Cursor salió - animación reanudada');
            state.isAnimationPaused = false;
            leftTrack.style.animationPlayState = 'running';
            rightTrack.style.animationPlayState = 'running';
        });

        /**
         * Scroll con rueda del ratón
         */
        container.addEventListener('wheel', (e) => {
            if (!state.isAnimationPaused) return;
            
            const now = Date.now();
            if (now - state.lastScrollTime < 150) return; // Cooldown
            state.lastScrollTime = now;
            
            e.preventDefault();
            
            const direction = e.deltaY > 0 ? 1 : -1;
            moveItems(direction);
        }, { passive: false });

        /**
         * Swipe vertical en móvil
         */
        container.addEventListener('touchstart', (e) => {
            state.touchStart = e.touches[0].clientY;
            console.log('👆 Touch start');
            
            if (!state.isAnimationPaused) {
                state.isAnimationPaused = true;
                leftTrack.style.animationPlayState = 'paused';
                rightTrack.style.animationPlayState = 'paused';
            }
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!state.isAnimationPaused) return;
            
            const touchY = e.touches[0].clientY;
            const diff = state.touchStart - touchY;
            
            // Cambiar item cada 80px de movimiento
            if (Math.abs(diff) > 80) {
                const direction = diff > 0 ? 1 : -1;
                moveItems(direction);
                state.touchStart = touchY; // Reset para el próximo movimiento
            }
        }, { passive: true });

        /**
         * Click en imagen para modal
         */
        const setupImageClickHandlers = () => {
            const allImages = container.querySelectorAll('.photo-strip-item img');
            console.log(`✅ Configurando clicks en ${allImages.length} imágenes`);
            
            allImages.forEach((img, idx) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const attemptModal = (retries = 0) => {
                        if (window.undangan?.guest?.modal) {
                            console.log('🔍 Abriendo modal para imagen', idx);
                            window.undangan.guest.modal(this);
                        } else if (retries < 50) {
                            setTimeout(() => attemptModal(retries + 1), 100);
                        } else {
                            console.error('❌ Modal no disponible');
                        }
                    };
                    
                    attemptModal();
                });
            });
        };

        setupImageClickHandlers();
        console.log('✅ Photo strip controls inicializados');
    };

    // Esperar DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initPhotoStripControls, 200);
        });
    } else {
        setTimeout(initPhotoStripControls, 200);
    }
    
    window.addEventListener('load', () => {
        setTimeout(initPhotoStripControls, 200);
    });
})();
