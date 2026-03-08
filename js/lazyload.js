/**
 * ARCHIVO: lazyload.js
 * PROPÓSITO: Cargador de imágenes perezoso (Lazy Load)
 * 
 * Este script mejora el rendimiento de la página cargando imágenes solo cuando
 * el usuario las necesita (cuando están cerca de aparecer en la pantalla).
 * 
 * Funciona con imágenes que tengan el atributo data-src en lugar de src:
 * Ejemplo: <img data-src="imagen.webp" src="placeholder.webp" />
 * 
 * El script usa IntersectionObserver (estándar moderno) para detectar cuando
 * una imagen está cerca de la pantalla y cargarla en ese momento.
 */

(function() {
    /**
     * Función: onLoad
     * Propósito: Marcar una imagen como cargada y limpiar atributos temporales
     * 
     * Cuando una imagen termina de cargar:
     * 1. Añade la clase 'is-loaded' (para CSS personalizado)
     * 2. Elimina el atributo 'data-src' (ya no lo necesita)
     * 3. Elimina el atributo 'data-srcset' (si existe)
     * 
     * @param {HTMLImageElement} img - El elemento <img> cargado
     */
    const onLoad = (img) => {
        img.classList.add('is-loaded');
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
    };

    /**
     * Función: loadImage
     * Propósito: Cargar una imagen desde su data-src
     * 
     * Proceso:
     * 1. Obtiene la ruta desde el atributo 'data-src'
     * 2. Crea una imagen temporal para precargarla
     * 3. Cuando se cargue, asigna la ruta al <img> real
     * 4. Si hay error, intenta usar el atributo 'data-srcset'
     * 5. En cualquier caso, marca la imagen como cargada
     * 
     * @param {HTMLImageElement} img - El elemento <img> a cargar
     */
    const loadImage = (img) => {
        // Obtener la ruta de imagen desde el atributo data-src
        const src = img.getAttribute('data-src');
        
        // Si no hay data-src, no hacer nada
        if (!src) return;

        // Crear una imagen temporal para precargarla antes de mostrarla
        const newImg = new Image();
        
        // Cuando la imagen carga correctamente
        newImg.onload = function() {
            img.src = src; // Asignar la ruta verdadera al <img>
            onLoad(img); // Marcar como cargada
        };
        
        // Si hay error cargando la imagen
        newImg.onerror = function() {
            // Intentar usar srcset como alternativa
            const srcset = img.getAttribute('data-srcset');
            if (srcset && srcset !== src) {
                img.srcset = srcset;
            }
            img.src = src; // Asignar src de todas formas (puede haber fallado)
            onLoad(img); // Marcar como cargada
        };
        
        // Iniciar carga de la imagen temporal
        newImg.src = src;
    };

    /**
     * Función: init
     * Propósito: Inicializar el sistema de lazy loading
     * 
     * Proceso:
     * 1. Busca todas las imágenes con atributo data-src
     * 2. Si el navegador soporta IntersectionObserver:
     *    - Crea un observador que vigila el viewport
     *    - Cuando una imagen entra en vista (300px antes), la carga
     *    - Deja de vigilar la imagen después de cargarla
     * 3. Si no soporta IntersectionObserver (navegadores antiguos):
     *    - Carga todas las imágenes inmediatamente
     */
    const init = () => {
        // Buscar todas las imágenes con el atributo data-src
        const images = Array.from(document.querySelectorAll('img[data-src]'));
        
        // Verificar si el navegador soporta IntersectionObserver (estándar moderno)
        if ('IntersectionObserver' in window) {
            /**
             * IntersectionObserver vigila si los elementos están visibles en pantalla
             * 
             * Opciones:
             * - rootMargin: '300px 0px' = cargar imágenes 300px ANTES de que entren en pantalla
             * - threshold: 0.01 = considerar visible si aunque sea 1% es visible
             */
            const io = new IntersectionObserver((entries, obs) => {
                // Para cada elemento observado
                entries.forEach((entry) => {
                    // Si el elemento está visible (o va a estarlo)
                    if (entry.isIntersecting) {
                        // Cargar la imagen
                        loadImage(entry.target);
                        // Dejar de observar esta imagen (ya se cargó)
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '300px 0px',
                threshold: 0.01
            });

            // Comenzar a observar cada imagen
            images.forEach((img) => io.observe(img));
        } else {
            // Plan B: Si el navegador es muy antiguo, cargar todas las imágenes ya
            images.forEach(loadImage);
        }
    };

    /**
     * Ejecutar init cuando el DOM esté listo
     * 
     * Si el DOM ya está cargado, ejecutar init inmediatamente.
     * Si aún se está cargando, esperar al evento DOMContentLoaded.
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Ejecutar también en window.load por seguridad
    window.addEventListener('load', init);
})();
