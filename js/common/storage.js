/**
 * ARCHIVO: storage.js
 * PROPÓSITO: Gestor de almacenamiento local (LocalStorage)
 * 
 * Este módulo proporciona una interfaz limpia para trabajar con localStorage del navegador.
 * Almacena datos en formato JSON con un nombre de tabla (como base de datos simple).
 * 
 * Uso: 
 * const miStorage = storage('miTabla');
 * miStorage.set('clave', 'valor');
 * const valor = miStorage.get('clave');
 */

/**
 * Función: storage
 * Parámetro: table (string) - nombre de la tabla/clave en localStorage
 * Retorna: objeto con métodos para manipular datos
 * 
 * Internamente, storage crea un JSON con pares clave-valor
 * Ejemplo en localStorage: { "miTabla": { "clave1": "valor1", "clave2": "valor2" } }
 * 
 * @param {string} table - Nombre de la tabla/identificador en localStorage
 * @returns {object} Objeto con métodos: get, set, has, unset, clear
 */
export const storage = (table) => {

    /**
     * Función: get
     * Propósito: Recuperar datos almacenados
     * 
     * Comportamiento:
     * - Sin parámetro key: retorna el objeto completo de la tabla
     * - Con parámetro key: retorna solo el valor de esa clave
     * 
     * @param {string|null} [key=null] - Clave específica a recuperar
     * @returns {any} El valor almacenado, o el objeto completo
     */
    const get = (key = null) => {
        // Recuperar el JSON almacenado y convertirlo a objeto
        const data = JSON.parse(localStorage.getItem(table));
        // Si pidió clave específica, retornarla; si no, retornar todo
        return key ? data[String(key)] : data;
    };

    /**
     * Función: set
     * Propósito: Guardar un par clave-valor
     * 
     * Proceso:
     * 1. Obtener el objeto actual de la tabla
     * 2. Añadir/actualizar la clave con el nuevo valor
     * 3. Guardar el objeto actualizado en localStorage
     * 
     * @param {string} key - Nombre de la clave
     * @param {any} value - Valor a guardar (cualquier tipo de dato)
     */
    const set = (key, value) => {
        // Obtener objeto actual
        const data = get();
        // Añadir/actualizar la clave
        data[String(key)] = value;
        // Guardar en localStorage como JSON
        localStorage.setItem(table, JSON.stringify(data));
    };

    /**
     * Función: has
     * Propósito: Verificar si una clave existe
     * 
     * @param {string} key - Clave a verificar
     * @returns {boolean} true si existe, false si no
     */
    const has = (key) => Object.keys(get()).includes(String(key));

    /**
     * Función: unset
     * Propósito: Eliminar una clave específica
     * 
     * Proceso:
     * 1. Verificar si la clave existe
     * 2. Si existe, obtener el objeto, eliminar la clave, guardar cambios
     * 3. Si no existe, no hacer nada
     * 
     * @param {string} key - Clave a eliminar
     */
    const unset = (key) => {
        // Verificar si la clave existe
        if (!has(key)) {
            return;
        }

        // Obtener objeto actual
        const data = get();
        // Eliminar la clave del objeto
        delete data[String(key)];
        // Guardar objeto actualizado
        localStorage.setItem(table, JSON.stringify(data));
    };

    /**
     * Función: clear
     * Propósito: Vaciar toda la tabla (resetear a objeto vacío)
     * 
     * Guarda un objeto JSON vacío {} en localStorage para la tabla
     */
    const clear = () => localStorage.setItem(table, '{}');

    /**
     * Inicialización: Si la tabla no existe, crearla vacía
     */
    if (!localStorage.getItem(table)) {
        clear();
    }

    /**
     * Retornar objeto público con todos los métodos disponibles
     */
    return {
        set,     // Guardar datos
        get,     // Recuperar datos
        has,     // Verificar existencia
        clear,   // Vaciar tabla
        unset,   // Eliminar clave
    };
};