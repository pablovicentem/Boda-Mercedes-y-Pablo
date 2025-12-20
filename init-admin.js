// Simple initialization for admin panel
(async function() {
    try {
        // Dynamic import with proper error handling
        const { admin } = await import('./js/app/admin/admin.js');
        
        // Initialize admin module
        window.undangan = admin.init();
        
        // Trigger page loaded event
        window.dispatchEvent(new Event('load'));
    } catch (error) {
        console.error('Error loading admin module:', error);
    }
})();
