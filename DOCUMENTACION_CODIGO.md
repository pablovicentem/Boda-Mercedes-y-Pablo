# 📖 DOCUMENTACIÓN DEL CÓDIGO - Invitación Digital Mercedes y Pablo

## 📋 Índice de Contenidos
1. [Estructura General](#estructura-general)
2. [Flujo de Inicialización](#flujo-de-inicialización)
3. [Módulos Principales](#módulos-principales)
4. [Módulos Comunes](#módulos-comunes)
5. [Módulos de Conexión](#módulos-de-conexión)
6. [Componentes](#componentes)

---

## 🏗️ Estructura General

```
Boda-Mercedes-y-Pablo/
├── index.html              # Página principal HTML
├── init.js                 # Punto de entrada de la app
├── README.md
├── LICENSE
├── assets/
│   ├── images/
│   │   └── desktop/
│   │       └── images.json # Lista de imágenes (ACTUALIZADO: ahora con .webp)
│   ├── music/
│   └── video/
├── css/
│   ├── animation.css
│   ├── common.css
│   ├── guest.css
│   ├── style.css
│   └── sunset-theme.css
└── js/
    ├── init.js             # Inicializador principal
    ├── main.js             # Lógica RSVP, scroll, etc.
    ├── gallery-init.js     # Generador de galerías
    ├── slideshow-init.js   # Generador de slideshow
    ├── lazyload.js         # Cargador perezoso de imágenes
    ├── app/
    │   ├── admin/          # Módulos de administrador
    │   ├── guest/          # Módulos para invitados
    │   └── components/     # Componentes reutilizables
    ├── common/             # Módulos de utilidad general
    ├── connection/         # Módulos de conexión/API
    └── libs/               # Librerías externas
```

---

## 🚀 Flujo de Inicialización

### 1. **index.html** carga (en orden):
```html
<!-- 1. Recursos externos (Bootstrap, FontAwesome, etc.) -->
<!-- 2. Estilos CSS -->
<!-- 3. Scripts deferred (se ejecutan después del DOM) -->
<script defer src="./js/slideshow-init.js"></script>
<script defer src="./js/lazyload.js"></script>
<script defer src="./init.js"></script>
```

### 2. **slideshow-init.js** ejecuta:
- Lee `assets/images/desktop/images.json`
- Crea elementos `<div>` con clase `slide-desktop`
- Inserta imágenes con atributo `data-src` para lazy loading
- Las imágenes se cargan perezosamente (cuando entran en pantalla)

### 3. **lazyload.js** ejecuta:
- Busca todas las imágenes con `data-src`
- Usa `IntersectionObserver` para detectar cuando están en pantalla
- Carga las imágenes 300px antes de que entren en vista
- Mejora rendimiento: solo carga lo que ves

### 4. **init.js** ejecuta:
```javascript
// Importa dinámicamente el módulo guest
const { guest } = await import('./js/app/guest/guest.js');
// Inicializa toda la aplicación
window.undangan = guest.init();
```

---

## 📦 Módulos Principales

### **js/app/guest/guest.js**
**Propósito:** Módulo principal de la experiencia del invitado

**Funciones clave:**
- `countDownDate()` - Muestra contador regresivo a la boda (días, horas, minutos, segundos)
- `showGuestName()` - Lee el parámetro `to=` de la URL y muestra el nombre personalizado
- `init()` - Inicializa todos los submódulos

**Submódulos que carga:**
- `video.js` - Carga video de la ceremonia
- `image.js` - Carga galería de fotos
- `audio.js` - Reproduce música de fondo
- `progress.js` - Muestra barra de progreso de carga

**Flujo:**
```
1. Usuario ingresa a la página
2. HTML carga y se ejecuta init.js
3. init.js importa guest.js
4. guest.init() inicializa:
   - video.js → carga video
   - image.js → carga imágenes
   - audio.js → carga música
   - progress.js → muestra progreso
5. Cuando todo carga, muestra: "¡Desliza hacia abajo para ver más!"
```

---

### **js/app/guest/image.js**
**Propósito:** Gestiona la carga de imágenes de la galería

**Métodos:**
- `loadedImage(src)` - Precarga una imagen y resuelve promesa
- `appendImage(el, src)` - Asigna imagen al elemento y ajusta dimensiones
- `getByFetch()` - Carga imagen con caché
- `getByDefault()` - Carga imagen simple con onload/onerror

**Cómo funciona:**
```javascript
// Crea una imagen temporal para precargarla
const img = new Image();
img.onload = () => {
    // Cuando carga, asignarla al elemento real
    el.src = img.src;
    progress.complete('image');
};
img.src = src; // Inicia carga
```

---

### **js/app/guest/video.js**
**Propósito:** Maneja carga y reproducción de video

**Características:**
- Detecta si el servidor soporta `Range` (descarga parcial)
- Muestra barra de progreso durante descarga
- Pausa/reproduce automáticamente cuando entra/sale de vista
- Guarda en caché para no descargar de nuevo

**Estados:**
1. Si soporta Range: descarga progresiva con barra
2. Si no: reproduce en streaming directo

---

### **js/app/guest/audio.js**
**Propósito:** Gestiona la música de fondo

**Características:**
- Lee URL de `data-audio` en el `<body>`
- Botón para play/pause (icono de círculo)
- Solo reproduce si hay conexión a internet
- Guarda en caché para evitar descargas repetidas
- Se pausa automáticamente si se pierde conexión

**Botón:**
- Ícono: `fa-circle-pause` cuando toca (girando)
- Ícono: `fa-circle-play` cuando está pausado

---

### **js/app/guest/progress.js**
**Propósito:** Barra de progreso de carga

**Muestra:**
```
Loading image (9/23) [39%]
```

**Métodos:**
- `add()` - Incrementa el total de items a cargar
- `complete(type)` - Marca un item como completado
- `invalid(type)` - Marca error en la carga (barra roja)
- `init()` - Inicializa elementos HTML

---

## 🔧 Módulos Comunes (js/common/)

### **storage.js** - Almacenamiento Local
```javascript
const miStorage = storage('miTabla');
miStorage.set('clave', 'valor');      // Guardar
const valor = miStorage.get('clave');  // Recuperar
miStorage.has('clave');                // Verificar existencia
miStorage.unset('clave');              // Eliminar
miStorage.clear();                     // Vaciar tabla
```

### **session.js** - Gestión de Sesiones
```javascript
session.login(credenciales)  // Login de admin
session.logout()             // Logout
session.isAdmin()            // ¿Es admin?
session.getToken()           // Token JWT
session.decode()             // Decodificar JWT
session.guest(token)         // Cargar config como invitado
```

### **theme.js** - Tema Oscuro/Claro
```javascript
theme.change()               // Alternar tema
theme.isDarkMode()           // ¿Modo oscuro?
theme.onLight()              // Cambiar a claro
theme.onDark()               // Cambiar a oscuro
```

### **language.js** - Idioma y Localización
```javascript
lang.init()                  // Inicializar
lang.setDefault('es')        // Establecer idioma
lang.getLanguage()           // Obtener idioma actual
lang.getCountry()            // Obtener país
```

### **util.js** - Utilidades Generales
```javascript
util.escapeHtml(texto)               // Escapar HTML (XSS)
util.notify(mensaje).success()       // Notificaciones
util.ask(pregunta)                   // Pregunta sí/no
util.safeInnerHTML(el, html)         // HTML seguro
util.changeOpacity(el, isUp)         // Animación opacity
util.timeOut(callback, delay)        // Timeout mejorado
util.debounce(fn, delay)             // Debounce
util.disableButton(btn, mensaje)     // Deshabilitar botón
```

---

## 🔌 Módulos de Conexión (js/connection/)

### **request.js** - Cliente HTTP
```javascript
// Métodos HTTP
export const HTTP_GET = 'GET';
export const HTTP_POST = 'POST';
export const HTTP_PUT = 'PUT';
export const HTTP_PATCH = 'PATCH';
export const HTTP_DELETE = 'DELETE';

// Códigos HTTP
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;

// Uso:
request(HTTP_GET, '/api/data')
    .withCache(1000 * 60 * 30)  // Cachear 30 minutos
    .token(jwtToken)            // Añadir token JWT
    .send()                      // Enviar request
    .then(response => ...)       // Procesar respuesta
```

### **cache.js** - Caché de Datos
```javascript
cache('nombreCache')
    .withForceCache()           // Forzar almacenamiento
    .get(url)                   // Obtener del caché
    .set(url, response)         // Guardar en caché
```

### **dto.js** - Objetos de Transferencia de Datos
Define estructuras de respuesta esperadas del servidor

---

## 🎨 Componentes (js/app/components/)

### **card.js** - Tarjeta de Información
Componente visual para mostrar información estructurada

### **comment.js** - Sistema de Comentarios
Carga y muestra comentarios de la boda

### **like.js** - Sistema de "Me Gusta"
Permite dar like a fotos

### **pagination.js** - Paginación
Componente para navegar entre páginas

### **gif.js** - Gestor de GIFs
Muestra GIFs animados

---

## 📊 Flujo Completo de Carga

```
┌─────────────────────────────────────────────┐
│  Usuario abre la página                     │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  index.html carga                           │
│  - Carga CSS                                │
│  - Carga JavaScript defer                   │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  slideshow-init.js                          │
│  - Lee images.json                          │
│  - Crea elementos slide                     │
│  - Inserta <img data-src="...">             │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  lazyload.js                                │
│  - Busca img[data-src]                      │
│  - Espera a IntersectionObserver            │
│  - Carga imágenes cuando entran en pantalla │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  init.js                                    │
│  - Importa guest.js                         │
│  - Ejecuta guest.init()                     │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  guest.init() inicializa:                   │
│  ├─ video.js      → Carga video             │
│  ├─ image.js      → Carga imágenes          │
│  ├─ audio.js      → Carga música            │
│  └─ progress.js   → Muestra barra           │
└────────────────┬────────────────────────────┘
                 │
┌────────────────▼────────────────────────────┐
│  Página completamente cargada y funcional   │
│  Usuario ve: "Desliza hacia abajo"          │
└─────────────────────────────────────────────┘
```

---

## 🐛 Solución del Problema: Error Loading Image (9/23)

**Problema Original:**
- El archivo `images.json` listaba: `IMG_0281.jpg`, `IMG_1016.jpg`, etc.
- Los archivos reales en la carpeta: `IMG_0281.webp`, `IMG_1016.webp`, etc.
- Las extensiones no coincidían → Error de carga

**Solución Aplicada:**
Actualizar `assets/images/desktop/images.json` con nombres correctos:
```json
{
  "images": [
    "2015-05-07 20.11.21.webp",
    "IMG_0162.webp",
    "IMG_0281.webp",
    "IMG_1016.webp",
    "IMG_1330.webp",
    "IMG_2061.webp",
    "IMG_3401.webp",
    "IMG_5402.webp"
  ]
}
```

---

## 📝 Resumen Ejecutivo

**¿Qué es esta app?**
Una invitación digital interactiva para la boda de Mercedes y Pablo.

**¿Qué hace?**
1. Muestra contador regresivo a la boda
2. Galería de fotos de la pareja
3. Video de la ceremonia/preparación
4. Música de fondo
5. Información de localización y horario
6. Formulario RSVP para confirmar asistencia

**¿Por qué modular?**
- Cada módulo tiene una responsabilidad clara
- Fácil de mantener y actualizar
- Se puede agregar/quitar funcionalidad fácilmente
- Mejor rendimiento (carga solo lo necesario)

**¿Cómo personalizar?**
1. Imágenes: Agregar/quitar archivos en `assets/images/desktop/`
2. Actualizar `images.json` con los nombres
3. Música: Cambiar URL en `data-audio` del `<body>`
4. Fecha/hora: Actualizar `data-time` del `<body>`
5. Texto: Editar HTML en `index.html`

---

## 🔗 Referencias Rápidas

- **Modificar fecha/hora de la boda:** [index.html](index.html#L102) - `data-time="2026-04-25 18:00:00"`
- **Cambiar música:** [index.html](index.html#L102) - `data-audio="./assets/music/..."`
- **Agregar imágenes:** Copiar a `assets/images/desktop/` y actualizar `images.json`
- **Cambiar tema:** Editar `css/sunset-theme.css`

---

**Última actualización:** 8 de marzo de 2026
**Versión:** 1.0 comentada y documentada
