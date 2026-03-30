/**
 * ARCHIVO: modal-handler.js
 * PROPÓSITO: Manejador global robusto para abrir modales de imágenes
 * 
 * Este script actúa como intermediario entre los clicks en las imágenes
 * y la función undangan.guest.modal, manejando reintentos si undangan
 * aún no está completamente cargado.
 */

(function() {
    /**
     * Función global que se llamará desde onclick de las imágenes
     * @param {HTMLImageElement} imgElement - La imagen que se hizo click
     */
    window.openImageModal = function(imgElement) {
        const tryOpenModal = (attempts = 0) => {
            const maxAttempts = 50; // 5 segundos máximo (50 * 100ms)
            
            if (window.undangan && window.undangan.guest && window.undangan.guest.modal) {
                console.log('✅ Abriendo modal para imagen:', imgElement.src);
                window.undangan.guest.modal(imgElement);
            } else if (attempts < maxAttempts) {
                // Reintentar después de 100ms
                setTimeout(() => {
                    tryOpenModal(attempts + 1);
                }, 100);
            } else {
                console.error('❌ No se pudo acceder a undangan.guest.modal después de intentar 50 veces');
                alert('Error: El módulo de modalidades aún se está cargando. Por favor, intenta de nuevo.');
            }
        };
        
        tryOpenModal();
    };
    
    console.log('✅ modal-handler.js cargado - window.openImageModal disponible');
})();
