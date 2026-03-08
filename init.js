/**
 * ARCHIVO: init.js
 * PROPÓSITO: Punto de entrada principal de la aplicación
 * 
 * Este archivo es el responsable de iniciar toda la aplicación de la invitación digital.
 * Se ejecuta cuando el HTML termina de cargar y realiza las siguientes funciones:
 * 1. Importa dinámicamente el módulo "guest" (invitado)
 * 2. Inicializa el módulo guest
 * 3. Dispara el evento de carga para activar otros componentes
 * 4. Maneja errores si algo falla durante la carga
 */

(async function() {
    try {
        // Importar dinámicamente el módulo principal "guest" desde ./js/app/guest/guest.js
        // Esto se hace de forma asincrónica para permitir que la página cargue primero
        const { guest } = await import('./js/app/guest/guest.js');
        
        // Inicializar el módulo guest - configura todos los elementos de la invitación
        // El resultado se guarda en window.undangan para acceso global
        window.undangan = guest.init();
        
        // Disparar evento 'load' para notificar a otros scripts que la aplicación está lista
        window.dispatchEvent(new Event('load'));
    } catch (error) {
        // Si hay error durante la carga, registrarlo en la consola
        console.error('Error loading guest module:', error);
        
        // Plan B: ocultar el indicador de carga y mostrar el contenido de todas formas
        // para que el usuario no vea una pantalla vacía
        const loading = document.getElementById('loading');
        const root = document.getElementById('root');
        if (loading) loading.style.display = 'none';
        if (root) root.classList.remove('opacity-0');
    }
})();
