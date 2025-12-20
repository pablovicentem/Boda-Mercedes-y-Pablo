// Simple initialization without module system issues
(async function() {
    try {
        // Dynamic import with proper error handling
        const { guest } = await import('./js/app/guest/guest.js');
        
        // Initialize guest module
        window.undangan = guest.init();
        
        // Trigger page loaded event
        window.dispatchEvent(new Event('load'));
    } catch (error) {
        console.error('Error loading guest module:', error);
        // Fallback: hide loading and show content anyway
        const loading = document.getElementById('loading');
        const root = document.getElementById('root');
        if (loading) loading.style.display = 'none';
        if (root) root.classList.remove('opacity-0');
    }
})();
