/**
 * ARCHIVO: image.js
 * PROPÓSITO: Gestor de carga de imágenes de la galería
 * 
 * Este módulo es responsable de:
 * 1. Precarga inteligente de imágenes (loadedImage)
 * 2. Asignación de imágenes a elementos HTML con ajuste de tamaño
 * 3. Manejo de errores de carga
 * 4. Actualización de la barra de progreso
 * 
 * Usa dos estrategias de carga:
 * - getByFetch: Para imágenes con data-src (con caché)
 * - getByDefault: Para imágenes src normales
 */

import { progress } from './progress.js';
import { cache } from '../../connection/cache.js';

export const image = (() => {

    /**
     * @type {NodeListOf<HTMLImageElement>|null}
     */
    let images = null;

    /**
     * @type {ReturnType<typeof cache>|null}
     */
    let c = null;

    /**
     * @type {object[]}
     */
    const urlCache = [];

    /**
     * FUNCIÓN: loadedImage
     * PROPÓSITO: Precarga una imagen en memoria antes de mostrarla
     * 
     * Proceso:
     * 1. Crea un objeto Image temporal
     * 2. Establece el src (inicia descarga)
     * 3. Devuelve una Promesa que:
     *    - Se resuelve cuando la imagen carga (onload)
     *    - Se rechaza si hay error (onerror)
     * 
     * Esto es útil para verificar que la imagen existe y se puede
     * cargar antes de asignarla al elemento HTML real
     * 
     * @param {string} src - URL de la imagen a precargar
     * @returns {Promise<HTMLImageElement>} Promesa con la imagen cargada
     */
    const loadedImage = (src) => new Promise((res, rej) => {
        const i = new Image();           // Crear imagen temporal
        i.onload = () => res(i);         // Si carga: resolver con la imagen
        i.onerror = rej;                 // Si falla: rechazar promesa
        i.src = src;                     // Iniciar descarga
    });

    /**
     * FUNCIÓN: appendImage
     * PROPÓSITO: Asignar una imagen cargada a un elemento HTML
     * 
     * Proceso:
     * 1. Precargar la imagen con loadedImage
     * 2. Obtener dimensiones naturales (ancho y alto)
     * 3. Asignar src al elemento
     * 4. Quitar clase opacity-0 (mostrar la imagen)
     * 5. Actualizar barra de progreso
     * 
     * Esto asegura que:
     * - La imagen existe antes de mostrarla
     * - El elemento HTML tiene dimensiones correctas
     * - El ancho no se "tuerce" mientras carga
     * 
     * @param {HTMLImageElement} el - Elemento <img> donde asignar
     * @param {string} src - URL de la imagen
     * @returns {Promise<void>}
     */
    const appendImage = (el, src) => loadedImage(src).then((img) => {
        // Asignar dimensiones reales de la imagen
        el.width = img.naturalWidth;
        el.height = img.naturalHeight;
        
        // Mostrar la imagen (remover clase opacity-0)
        el.classList.remove('opacity-0');
        
        // Asignar la URL al elemento HTML
        el.src = img.src;
        
        // Limpiar imagen temporal
        img.remove();

        // Incrementar contador de progreso
        progress.complete('image');
    });

    /**
     * FUNCIÓN: getByFetch
     * PROPÓSITO: Cargar imagen usando fetch (con caché)
     * 
     * Estrategia:
     * 1. Agrega la imagen a una cola (urlCache)
     * 2. La cola será procesada después por cache.run()
     * 3. Si tiene error, marca como inválida
     * 4. Si carga exitosamente, llama a appendImage
     * 
     * Ventajas:
     * - Cachea la imagen para futuras cargas
     * - Permite procesar múltiples imágenes en paralelo
     * - Control de errores mejorado
     * 
     * @param {HTMLImageElement} el - Elemento <img> a cargar
     * @returns {void}
     */
    const getByFetch = (el) => {
        urlCache.push({
            url: el.getAttribute('data-src'),  // URL de la imagen
            res: (url) => appendImage(el, url), // En caso de éxito
            rej: (err) => {                     // En caso de error
                console.error(err);
                progress.invalid('image');       // Marcar como error en progreso
            },
        });
    };

    /**
     * FUNCIÓN: getByDefault
     * PROPÓSITO: Cargar imagen de forma estándar (sin caché)
     * 
     * Estrategia:
     * 1. Asigna manejadores onload y onerror al elemento
     * 2. Verifica si ya está completamente cargada
     * 3. Si sí: marca como completada
     * 4. Si no: espera a que cargue
     * 
     * Estados:
     * - complete && naturalWidth !== 0: La imagen ya cargó (caché del navegador)
     * - complete && naturalWidth === 0: La imagen falló a cargar
     * - !complete: La imagen aún se está cargando
     * 
     * @param {HTMLImageElement} el - Elemento <img> a cargar
     * @returns {void}
     */
    const getByDefault = (el) => {
        el.onerror = () => progress.invalid('image');
        
        el.onload = () => {
            // Cuando carga, guardar dimensiones
            el.width = el.naturalWidth;
            el.height = el.naturalHeight;
            progress.complete('image');
        };

        // Verificar si ya está cargada (desde caché del navegador)
        if (el.complete && el.naturalWidth !== 0 && el.naturalHeight !== 0) {
            // Ya está completamente cargada
            progress.complete('image');
        } else if (el.complete) {
            // Está "completa" pero sin dimensiones = error
            progress.invalid('image');
        }
    };

    /**
     * FUNCIÓN: hasDataSrc
     * PROPÓSITO: Verificar si hay imágenes con data-src
     * 
     * @returns {boolean} true si hay al menos una imagen con data-src
     */
    const hasDataSrc = () => Array.from(images).some((i) => i.hasAttribute('data-src'));

    /**
     * FUNCIÓN: load
     * PROPÓSITO: Cargar todas las imágenes de la galería
     * 
     * Estrategia en dos fases:
     * 1. Cargar primero imágenes con data-src (fetch con caché)
     * 2. Luego cargar imágenes normales (onload simple)
     * 
     * Esto optimiza rendimiento: las imágenes críticas se cargan primero
     * 
     * @returns {Promise<void>}
     */
    const load = async () => {
        const imgs = Array.from(images);

        /**
         * FUNCIÓN INTERNA: runGroup
         * Carga un grupo de imágenes según un filtro
         * 
         * @param {function} filter - Función que retorna true para imágenes a cargar
         * @returns {Promise<void>}
         */
        const runGroup = async (filter) => {
            urlCache.length = 0;  // Limpiar cola anterior
            
            // Procesar cada imagen según su tipo
            imgs.filter(filter).forEach((el) => 
                el.hasAttribute('data-src') 
                    ? getByFetch(el)      // Con caché
                    : getByDefault(el)    // Sin caché
            );
            
            // Ejecutar la cola de descargas
            await c.run(urlCache, progress.getAbort());
        };

        // Fase 1: Imágenes responsive (data-src)
        if (hasDataSrc()) {
            await runGroup((el) => el.hasAttribute('data-src'));
        }

    /**
     * FUNCIÓN: download
     * PROPÓSITO: Descargar una imagen como archivo
     * 
     * @param {string} blobUrl - URL del blob de la imagen
     * @returns {void}
     */
    const download = (blobUrl) => {
        c.download(blobUrl, `${window.location.hostname}_image_${Date.now()}`);
    };

    /**
     * FUNCIÓN: init
     * PROPÓSITO: Inicializar el módulo de imágenes
     * 
     * @returns {object} API pública del módulo
     */
    const init = () => {
        c = cache('image').withForceCache();
        images = document.querySelectorAll('img');
        images.forEach(progress.add);

        return {
            load,
            download,
            hasDataSrc,
        };
    };

    /**
     * API PÚBLICA DEL MÓDULO
     * Solo expone las funciones que otros módulos necesitan usar
     */
    return {
        init,
    };
})();