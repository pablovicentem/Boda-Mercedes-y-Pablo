/**
 * TEST SCRIPT: verify-setup.js
 * Script de verificación para asegurar que todos los módulos están cargados correctamente
 */

(function() {
    console.log('\n=== VERIFICACIÓN DE SETUP ===\n');
    
    // Verificar modal-handler
    if (typeof window.openImageModal === 'function') {
        console.log('✅ window.openImageModal disponible');
    } else {
        console.error('❌ window.openImageModal NO disponible');
    }
    
    // Verificar que slideshow-controls.js intente inicializar
    setTimeout(() => {
        if (typeof window.undangan === 'undefined') {
            console.warn('⚠️ window.undangan aún no está disponible (puede estar cargándose)');
        } else {
            console.log('✅ window.undangan disponible');
            if (window.undangan.guest && window.undangan.guest.modal) {
                console.log('✅ window.undangan.guest.modal disponible');
            } else {
                console.error('❌ window.undangan.guest.modal NO disponible');
            }
        }
    }, 3000);
    
    // Verificar que el contenedor del carrusel existe
    setTimeout(() => {
        const container = document.querySelector('.photo-strips-container');
        if (container) {
            console.log('✅ .photo-strips-container encontrado');
            const images = container.querySelectorAll('img');
            console.log(`✅ ${images.length} imágenes encontradas en el carrusel`);
        } else {
            console.error('❌ .photo-strips-container NO encontrado');
        }
    }, 2000);
    
    console.log('=== FIN VERIFICACIÓN ===\n');
})();
