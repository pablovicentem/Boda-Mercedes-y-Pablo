/**
 * ARCHIVO: session.js
 * PROPÓSITO: Gestor de sesiones de usuario (Autenticación)
 * 
 * Este módulo maneja:
 * 1. Login/Logout de usuarios
 * 2. Tokens JWT (JSON Web Tokens)
 * 3. Permisos (Admin vs Invitado)
 * 4. Caché de configuración por usuario
 * 
 * Los datos se guardan en localStorage en la tabla 'session'
 */

import { util } from './util.js';
import { storage } from './storage.js';
import { dto } from '../connection/dto.js';
import { request, HTTP_POST, HTTP_GET, HTTP_STATUS_OK } from '../connection/request.js';

export const session = (() => {

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let ses = null;

    /**
     * FUNCIÓN: getToken
     * PROPÓSITO: Obtener el token JWT del usuario actual
     * 
     * El token es una cadena de caracteres que sirve como "credencial"
     * Formato JWT: header.payload.signature (3 partes separadas por puntos)
     * 
     * @returns {string|null} Token JWT o null si no existe
     */
    const getToken = () => ses.get('token');

    /**
     * FUNCIÓN: setToken
     * PROPÓSITO: Guardar un token JWT en la sesión
     * 
     * @param {string} token - Token JWT a guardar
     * @returns {void}
     */
    const setToken = (token) => ses.set('token', token);

    /**
     * FUNCIÓN: login
     * PROPÓSITO: Autenticar un usuario con credenciales
     * 
     * Proceso:
     * 1. Enviar POST a /api/session con credenciales (usuario/contraseña)
     * 2. Si es exitoso, guardar el token retornado
     * 3. Retornar true si login exitoso, false si falla
     * 
     * Ejemplo uso:
     * const exito = await session.login({
     *     usuario: 'admin',
     *     password: 'contraseña123'
     * });
     * 
     * @param {object} body - Datos de login (usuario, password, etc.)
     * @returns {Promise<boolean>} true si login exitoso, false si falla
     */
    const login = (body) => {
        return request(HTTP_POST, '/api/session')
            .body(body)                          // Enviar credenciales
            .send(dto.tokenResponse)             // Esperar respuesta de token
            .then((res) => {
                // Si el servidor retornó código 200 (OK)
                if (res.code === HTTP_STATUS_OK) {
                    // Guardar el token que retornó el servidor
                    setToken(res.data.token);
                }

                // Retornar true solo si fue exitoso
                return res.code === HTTP_STATUS_OK;
            });
    };

    /**
     * FUNCIÓN: logout
     * PROPÓSITO: Cerrar sesión del usuario
     * 
     * Simplemente elimina el token de localStorage
     * 
     * @returns {void}
     */
    const logout = () => ses.unset('token');

    /**
     * FUNCIÓN: isAdmin
     * PROPÓSITO: Verificar si el usuario actual es administrador
     * 
     * Lógica:
     * Un token JWT tiene 3 partes: header.payload.signature
     * Si separamos por ".", un JWT admin tiene 3 partes
     * Si no es admin (o no hay token), solo hay 1-2 partes
     * 
     * @returns {boolean} true si es admin, false si es invitado o sin token
     */
    const isAdmin = () => String(getToken() ?? '.').split('.').length === 3;

    /**
     * FUNCIÓN: guest
     * PROPÓSITO: Cargar configuración específica para un invitado
     * 
     * Proceso:
     * 1. Realizar GET a /api/v2/config con el token del invitado
     * 2. Guardar la configuración en localStorage (tabla 'config')
     * 3. Guardar el token en sesión
     * 4. Retornar la respuesta del servidor
     * 
     * Esto permite que cada invitado tenga:
     * - Nombre personalizado
     * - Configuración específica
     * - Información de asistencia
     * 
     * @param {string} token - Token del invitado
     * @returns {Promise<object>} Respuesta del servidor con configuración
     */
    const guest = (token) => {
        return request(HTTP_GET, '/api/v2/config')
            .withCache(1000 * 60 * 30)           // Cachear 30 minutos
            .withForceCache()                    // Usar caché si está disponible
            .token(token)                        // Enviar token en header
            .send()
            .then((res) => {
                // Verificar si fue exitoso
                if (res.code !== HTTP_STATUS_OK) {
                    throw new Error('failed to get config.');
                }

                // Obtener almacenamiento de configuración
                const config = storage('config');
                
                // Guardar cada dato de configuración
                for (const [k, v] of Object.entries(res.data)) {
                    config.set(k, v);
                }

                // Guardar el token de sesión
                setToken(token);
                
                // Retornar respuesta completa
                return res;
            });
    };

    /**
     * FUNCIÓN: decode
     * PROPÓSITO: Decodificar el payload del JWT
     * 
     * Estructura JWT:
     * header.payload.signature
     * 
     * El payload está en base64 y contiene datos como:
     * {
     *     "usuario": "nombre",
     *     "exp": 1234567890,  // Fecha expiración
     *     "iat": 1234567890   // Fecha creación
     * }
     * 
     * Solo funciona si es admin (JWT válido)
     * 
     * @returns {object|null} Datos decodificados o null si no es admin
     */
    const decode = () => {
        // Si no es admin, no intentar decodificar
        if (!isAdmin()) {
            return null;
        }

        try {
            // Obtener parte media del JWT (payload)
            const payload = getToken().split('.')[1];
            
            // Decodificar de base64 y convertir a objeto JSON
            return JSON.parse(util.base64Decode(payload));
        } catch {
            // Si hay error al decodificar, retornar null
            return null;
        }
    };

    /**
     * FUNCIÓN: isValid
     * PROPÓSITO: Verificar si el token actual es válido
     * 
     * Un token es válido si:
     * 1. Es un JWT válido (3 partes)
     * 2. La fecha de expiración (exp) aún no ha pasado
     * 
     * Comparación:
     * - decode()?.exp = timestamp de expiración del token
     * - Date.now() / 1000 = timestamp actual en segundos
     * Si exp > ahora: token válido
     * 
     * @returns {boolean} true si token válido, false si expirado o inválido
     */
    const isValid = () => {
        // Si no es admin, no es válido
        if (!isAdmin()) {
            return false;
        }

        // Obtener datos del token
        const decoded = decode();
        
        // Verificar si la expiración es mayor que ahora
        return (decoded?.exp ?? 0) > (Date.now() / 1000);
    };

    /**
     * FUNCIÓN: init
     * PROPÓSITO: Inicializar el módulo de sesión
     * 
     * Crea la tabla 'session' en localStorage
     * 
     * @returns {void}
     */
    const init = () => {
        ses = storage('session');
    };

    /**
     * API PÚBLICA DEL MÓDULO
     */
    return {
        init,        // Inicializar sesión
        guest,       // Cargar config de invitado
        isValid,     // ¿Token válido?
        login,       // Login con credenciales
        logout,      // Cerrar sesión
        decode,      // Decodificar JWT
        isAdmin,     // ¿Es admin?
        setToken,    // Guardar token
        getToken,    // Obtener token
    };
})();