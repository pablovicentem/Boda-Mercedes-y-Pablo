# 🗂️ MAPA DE ARCHIVOS - Estructura Comentada

## 📁 Estructura Completa del Proyecto

```
Boda-Mercedes-y-Pablo/
│
├── 📄 index.html
│   └── HTML principal con estructura de la invitación
│       └── Atributos data-* para configuración (fecha, música, etc.)
│
├── 📄 init.js                           [✅ COMENTADO]
│   └── Punto de entrada: Importa guest.js dinámicamente
│
├── 📄 README.md
│   └── Información general del proyecto
│
├── 📄 LICENSE
│   └── Licencia del proyecto
│
├── 📄 DOCUMENTACION_CODIGO.md           [✅ DOCUMENTACIÓN]
│   └── Guía técnica completa
│
├── 📄 GUIA_RAPIDA.md                    [✅ DOCUMENTACIÓN]
│   └── Guía rápida de referencia
│
├── 📁 assets/
│   │
│   ├── 📁 images/
│   │   └── 📁 desktop/
│   │       ├── 📄 images.json           [✅ ACTUALIZADO]
│   │       │   └── Lista de imágenes (.webp)
│   │       │
│   │       ├── 📸 2015-05-07 20.11.21.webp
│   │       ├── 📸 IMG_0162.webp
│   │       ├── 📸 IMG_0281.webp
│   │       ├── 📸 IMG_1016.webp
│   │       ├── 📸 IMG_1330.webp
│   │       ├── 📸 IMG_2061.webp
│   │       ├── 📸 IMG_3401.webp
│   │       └── 📸 IMG_5402.webp
│   │
│   ├── 📁 music/
│   │   └── 🎵 Concerning Hobbits.mp3
│   │       └── Música de fondo de la boda
│   │
│   └── 📁 video/
│       └── 🎬 (Carpeta para videos)
│
├── 📁 css/
│   ├── animation.css
│   │   └── Animaciones CSS personalizadas
│   │
│   ├── common.css
│   │   └── Estilos comunes para toda la app
│   │
│   ├── guest.css
│   │   └── Estilos específicos para invitados
│   │
│   ├── style.css
│   │   └── Estilos generales
│   │
│   └── sunset-theme.css
│       └── Tema sunset (colores y estilos oscuros/claros)
│
└── 📁 js/                               [NÚCLEO DE LA APP]
    │
    ├── 📄 admin.js
    │   └── Funciones de administrador
    │
    ├── 📄 gallery-init.js
    │   └── Inicializador de galerías
    │
    ├── 📄 slideshow-init.js             [✅ COMENTADO]
    │   └── Generador de slideshow
    │
    ├── 📄 lazyload.js                   [✅ COMENTADO]
    │   └── Cargador perezoso de imágenes
    │
    ├── 📄 guest.js
    │   └── Módulo principal de invitado
    │
    ├── 📄 main.js
    │   └── Lógica de RSVP y scroll
    │
    ├── 📁 app/
    │   │
    │   ├── 📁 admin/                    [Módulos de administrador]
    │   │   ├── admin.js
    │   │   │   └── Panel de administración
    │   │   │
    │   │   ├── auth.js
    │   │   │   └── Autenticación de admin
    │   │   │
    │   │   └── navbar.js
    │   │       └── Barra de navegación admin
    │   │
    │   ├── 📁 guest/                   [✅ Módulos de invitado]
    │   │   ├── guest.js
    │   │   │   └── Módulo principal
    │   │   │
    │   │   ├── image.js                 [✅ COMENTADO]
    │   │   │   └── Gestor de galería de fotos
    │   │   │
    │   │   ├── video.js                 [✅ COMENTADO - ref.]
    │   │   │   └── Gestor de video
    │   │   │
    │   │   ├── audio.js                 [✅ COMENTADO - ref.]
    │   │   │   └── Gestor de música
    │   │   │
    │   │   └── progress.js              [✅ COMENTADO - ref.]
    │   │       └── Barra de progreso
    │   │
    │   └── 📁 components/              [Componentes reutilizables]
    │       ├── card.js
    │       │   └── Componente tarjeta
    │       │
    │       ├── comment.js
    │       │   └── Sistema de comentarios
    │       │
    │       ├── gif.js
    │       │   └── Gestor de GIFs
    │       │
    │       ├── like.js
    │       │   └── Sistema de likes
    │       │
    │       └── pagination.js
    │           └── Componente paginación
    │
    ├── 📁 common/                      [✅ Módulos de utilidad]
    │   ├── language.js
    │   │   └── Gestión de idioma/localización
    │   │
    │   ├── offline.js
    │   │   └── Detección de modo offline
    │   │
    │   ├── session.js                   [✅ COMENTADO]
    │   │   └── Gestión de sesiones JWT
    │   │
    │   ├── storage.js                   [✅ COMENTADO]
    │   │   └── Wrapper para localStorage
    │   │
    │   ├── theme.js
    │   │   └── Gestor de tema oscuro/claro
    │   │
    │   └── util.js
    │       └── Utilidades generales
    │
    ├── 📁 connection/                  [Módulos de conexión]
    │   ├── cache.js
    │   │   └── Gestor de caché
    │   │
    │   ├── dto.js
    │   │   └── Definiciones de respuesta de servidor
    │   │
    │   └── request.js
    │       └── Cliente HTTP con caché
    │
    └── 📁 libs/                        [Librerías externas]
        ├── bootstrap.js
        │   └── Wrapper de Bootstrap
        │
        ├── confetti.js
        │   └── Animación de confeti
        │
        └── loader.js
            └── Componente de carga
```

---

## 🔄 Flujos Principales

### Flujo 1: Inicialización de la Aplicación

```
index.html carga
    ↓
HTML renderiza (DOM listo)
    ↓
slideshow-init.js ejecuta (defer)
    ├─ Lee images.json
    ├─ Crea <div> para cada imagen
    └─ Inserta <img data-src="...">
    ↓
lazyload.js ejecuta (defer)
    ├─ Busca todas las img[data-src]
    ├─ Configura IntersectionObserver
    └─ Espera a que entren en pantalla
    ↓
init.js ejecuta (defer)
    ├─ Importa dinámicamente guest.js
    └─ Llama a guest.init()
    ↓
guest.init() ejecuta
    ├─ video.init()
    │   └─ Prepara carga de video
    ├─ image.init()
    │   └─ Busca elementos con clase 'photo'
    ├─ audio.init()
    │   └─ Prepara música de fondo
    └─ Retorna API pública
    ↓
Aplicación lista para interacción ✅
```

### Flujo 2: Carga de Imágenes

```
Usuario ve imagen en pantalla
    ↓
IntersectionObserver detecta "visible"
    ↓
lazyload.js dispara loadImage()
    ↓
Imagen temporal precarga
    ↓
Si exitoso: asignar src al elemento
Si falla: mostrar error
    ↓
image.js actualiza progreso
    ├─ progress.complete('image')
    └─ Barra: "5/23 [22%]"
    ↓
Imagen visible en página ✅
```

### Flujo 3: Autenticación (Admin)

```
Admin ingresa credenciales
    ↓
session.login({ user, password })
    ↓
POST /api/session con credenciales
    ↓
Servidor retorna JWT token
    ↓
session.setToken(token)
    ├─ Guardar en localStorage
    └─ Tabla: 'session'
    ↓
session.isAdmin() verifica JWT
    ├─ Decodifica token
    └─ Revisa exp (expiración)
    ↓
Si válido: acceso a panel admin ✅
Si expirado: pedir re-login
```

---

## 📊 Dependencias entre Módulos

```
index.html
    │
    └─→ init.js
        └─→ guest.js
            ├─→ video.js
            │   └─→ cache.js
            │       └─→ request.js
            │
            ├─→ image.js
            │   └─→ cache.js
            │       └─→ request.js
            │
            ├─→ audio.js
            │   └─→ cache.js
            │
            ├─→ progress.js
            │
            ├─→ util.js
            ├─→ storage.js
            ├─→ theme.js
            ├─→ lang.js
            ├─→ session.js
            │   └─→ storage.js
            │       └─→ util.js
            │
            └─→ comment.js
```

---

## 📝 Qué Comenta Cada Archivo

### ✅ Comentados completamente

#### [init.js](init.js)
- Qué es: Punto de entrada
- Comentarios: Estructura general, flujo de inicialización

#### [js/slideshow-init.js](js/slideshow-init.js)
- Qué es: Generador de diapositivas
- Comentarios: Lectura JSON, creación de elementos, lazy loading

#### [js/lazyload.js](js/lazyload.js)
- Qué es: Cargador perezoso
- Comentarios: IntersectionObserver, precargas, fallbacks

#### [js/app/guest/image.js](js/app/guest/image.js)
- Qué es: Gestor de galería
- Comentarios: Precarga, cache, estrategias de carga, ajuste de dimensiones

#### [js/common/storage.js](js/common/storage.js)
- Qué es: Wrapper de localStorage
- Comentarios: Get, set, has, unset, clear

#### [js/common/session.js](js/common/session.js)
- Qué es: Gestor de sesiones
- Comentarios: JWT, login, isAdmin, validación de tokens

### 📖 Referenciados en documentación

- [js/app/guest/video.js](js/app/guest/video.js)
  - Documentado en DOCUMENTACION_CODIGO.md
  - Explicación: Carga, caché, progreso, streaming

- [js/app/guest/audio.js](js/app/guest/audio.js)
  - Documentado en DOCUMENTACION_CODIGO.md
  - Explicación: Play/pause, offline detection, caché

- [js/app/guest/progress.js](js/app/guest/progress.js)
  - Documentado en DOCUMENTACION_CODIGO.md
  - Explicación: Barra de progreso, errores, estados

---

## 🎯 Cómo Usar Esta Estructura

### Para entender el código:
1. Leer `DOCUMENTACION_CODIGO.md` (visión general)
2. Leer `GUIA_RAPIDA.md` (referencia rápida)
3. Leer comentarios en archivos específicos
4. Revisar este mapa para context

### Para modificar:
1. Identificar el módulo a cambiar
2. Buscar el archivo en `js/`
3. Leer comentarios del archivo
4. Hacer cambios
5. Probar en navegador (F12 para errores)

### Para agregar:
1. Crear archivo en carpeta apropiada
2. Usar patrón Module Pattern
3. Importar en módulo padre
4. Agregar comentarios
5. Actualizar documentación

---

## 🔗 Referencias Cruzadas

| Archivo | Importa de | Exporta a |
|---------|-----------|-----------|
| init.js | guest.js | (global window) |
| guest.js | video, image, audio, progress | init.js |
| image.js | cache, progress | guest.js |
| video.js | cache, progress | guest.js |
| audio.js | cache, progress | guest.js |
| storage.js | - | session, theme, lang |
| session.js | storage, util, request | guest.js |
| request.js | pool, cacheWrapper | guest.js |
| cache.js | request | image, video, audio |

---

## 📚 Archivos de Documentación

1. **index.html** - Estructura HTML comentada en línea
2. **init.js** - Flujo de inicialización
3. **DOCUMENTACION_CODIGO.md** - Referencia técnica (500+ líneas)
4. **GUIA_RAPIDA.md** - Guía de uso rápido
5. **MAPA_ARCHIVOS.md** - Este archivo (estructura y relaciones)
6. **Comentarios en código** - Explicaciones en cada archivo

---

## ✨ Cambios Realizados

### Problema Solucionado
- ❌ Error loading image (9/23) [39%]
- ✅ Actualizado `assets/images/desktop/images.json`
- ✅ Nombres de archivos con extensión correcta (.webp)

### Documentación Agregada
- ✅ 500+ líneas de comentarios
- ✅ 3 archivos de documentación
- ✅ Explicaciones en español
- ✅ Ejemplos de código
- ✅ Flujos visuales

---

**Última actualización:** 8 de marzo de 2026
**Versión:** 1.0 completamente mapeado y documentado
