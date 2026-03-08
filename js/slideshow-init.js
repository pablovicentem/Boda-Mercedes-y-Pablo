/**
 * ARCHIVO: slideshow-init.js
 * PROPÓSITO: Generador dinámico de presentación de diapositivas
 * 
 * Este script es responsable de:
 * 1. Cargar la lista de imágenes desde assets/images/desktop/images.json
 * 2. Crear elementos de diapositivas (slides) con cada imagen
 * 3. Configurar las imágenes con atributo data-src para carga perezosa (lazy loading)
 * 4. Insertar las diapositivas en el contenedor #slideshow-container del HTML
 * 
 * El archivo images.json contiene un array de nombres de archivos de imagen
 * Las imágenes se cargan con carga perezosa para mejorar el rendimiento
 */

/**
 * Función: initializeSlideshow
 * Propósito: Cargar imágenes y crear las diapositivas
 * 
 * Proceso:
 * 1. Hace fetch a ./assets/images/desktop/images.json
 * 2. Extrae el array de nombres de imágenes
 * 3. Para cada imagen, crea un div <div> con clase 'slide-desktop'
 * 4. Dentro del div, crea un elemento <img> con:
 *    - data-src: la ruta verdadera de la imagen (para lazy loading)
 *    - src: una imagen placeholder (carga rápida)
 * 5. Añade el slide al contenedor #slideshow-container
 * 
 * @returns {Promise<void>}
 */
const initializeSlideshow = async () => {
    try {
        // Descargar el archivo JSON con la lista de imágenes
        const response = await fetch('./assets/images/desktop/images.json');
        const data = await response.json();
        const images = data.images;

        // Obtener el contenedor donde se insertarán las diapositivas
        const container = document.getElementById('slideshow-container');
        
        // Si no existe el contenedor, salir sin hacer nada
        if (!container) return;

        /**
         * Para cada imagen en el array:
         * 1. Crea un div con posición absoluta (para que se superpongan)
         * 2. Crea una imagen con data-src (para lazy loading)
         * 3. Añade el div al contenedor
         */
        images.forEach(image => {
            // Crear el contenedor de la diapositiva
            const slideDiv = document.createElement('div');
            slideDiv.className = 'position-absolute h-100 w-100 slide-desktop';
            slideDiv.style.opacity = '0'; // Invisible al principio (CSS hace la animación)

            // Crear elemento de imagen
            const img = document.createElement('img');
            img.src = './assets/images/placeholder.webp'; // Imagen placeholder rápida
            img.setAttribute('data-src', `./assets/images/desktop/${image}`); // Ruta real para lazy loading
            img.alt = 'bg'; // Texto alternativo
            img.className = 'bg-cover-home'; // Clase CSS para estilos
            img.style.maskImage = 'none';
            img.style.opacity = '20%'; // Nivel de transparencia

            // Insertar imagen dentro del div
            slideDiv.appendChild(img);
            // Insertar div dentro del contenedor
            container.appendChild(slideDiv);
        });

    } catch (error) {
        // Registrar cualquier error durante la carga
        console.error('Error loading slideshow images:', error);
    }
};

/**
 * Inicialización: esperar a que el DOM esté completamente cargado
 * 
 * Si el DOM ya está cargado (document.readyState !== 'loading'),
 * ejecutar initializeSlideshow inmediatamente.
 * Si aún se está cargando, esperar al evento DOMContentLoaded.
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlideshow);
} else {
    initializeSlideshow();
}
