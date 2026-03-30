/**
 * TEST SCRIPT: verify-setup.js
 * Script de verificación para asegurar que todos los módulos están cargados correctamente
 */

(function() {
    console.log('\n' + '='.repeat(50));
    console.log('VERIFICACIÓN DEL SISTEMA DE GALERÍA');
    console.log('='.repeat(50) + '\n');
    
    // Verificar modal-handler
    if (typeof window.openImageModal === 'function') {
        console.log('✅ window.openImageModal disponible');
    } else {
        console.error('❌ window.openImageModal NO disponible');
    }
    
    // Verificar que slideshow-controls.js intente inicializar
    setTimeout(() => {
        if (typeof window.undangan === 'undefined') {
            console.warn('⚠️  window.undangan aún no está disponible (puede estar cargándose)');
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
            console.log('💡 Tip: Pasa el cursor sobre el carrusel para pausar la animación');
            console.log('💡 Tip: Usa la rueda del ratón para desplazarte entre fotos');
            console.log('💡 Tip: Haz click en cualquier foto para verla en grande');
        } else {
            console.error('❌ .photo-strips-container NO encontrado');
        }
    }, 2000);
    
    // Verificar componentes de comentarios
    setTimeout(() => {
        const comments = document.getElementById('comments');
        const pagination = document.getElementById('pagination');
        if (!comments) {
            console.log('ℹ️  Elemento #comments no encontrado (comentarios deshabilitados)');
        }
        if (!pagination) {
            console.log('ℹ️  Elemento #pagination no encontrado (paginación deshabilitada)');
        }
    }, 2000);
    
    console.log('\n' + '='.repeat(50) + '\n');
})();
