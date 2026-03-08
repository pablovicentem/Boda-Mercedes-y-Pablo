# 🚀 GUÍA RÁPIDA - Invitación Digital Mercedes y Pablo

## ¿Qué cambió?

### ✅ PROBLEMA SOLUCIONADO
Error: `Error loading image (9/23) [39%]`

**Causa:** El archivo `images.json` listaba extensiones `.jpg` pero los archivos reales eran `.webp`

**Solución:** Actualizado `assets/images/desktop/images.json` con extensiones correctas

---

## 📚 DOCUMENTACIÓN COMPLETA

Se agregaron comentarios detallados en los siguientes archivos:

### Archivos comentados ✨

#### Archivo de entrada
- **init.js** - Punto de entrada de la aplicación

#### Scripts de inicialización
- **js/slideshow-init.js** - Generador de diapositivas
- **js/lazyload.js** - Cargador de imágenes perezoso

#### Módulos de invitado
- **js/app/guest/image.js** - Gestor de galería de fotos
- **js/app/guest/video.js** - Gestor de video
- **js/app/guest/audio.js** - Gestor de música de fondo
- **js/app/guest/progress.js** - Barra de progreso

#### Módulos de utilidad
- **js/common/storage.js** - Almacenamiento local (localStorage)
- **js/common/session.js** - Gestión de sesiones y autenticación

#### Documentación
- **DOCUMENTACION_CODIGO.md** - Documentación completa del proyecto
- **GUIA_RAPIDA.md** - Este archivo

---

## 🎯 Estructura de la App

```
Inicio (index.html)
    ↓
[init.js] - Carga dinámicamente guest.js
    ↓
[guest.init()]
    ├─ [video.js]     → Carga video de la boda
    ├─ [image.js]     → Carga galería de fotos
    ├─ [audio.js]     → Carga música de fondo
    └─ [progress.js]  → Muestra barra de progreso
    ↓
Usuario ve: "¡Desliza hacia abajo!"
```

---

## 📸 ¿Cómo agregar más imágenes?

1. **Copiar archivos** a `assets/images/desktop/`
2. **Actualizar** `assets/images/desktop/images.json`:

```json
{
  "images": [
    "nombre1.webp",
    "nombre2.webp",
    "nombre3.webp"
  ]
}
```

**Nota:** Los archivos DEBEN ser `.webp` o tener la extensión correcta en el JSON

---

## 🎵 ¿Cómo cambiar la música?

1. Reemplazar archivo en `assets/music/`
2. Editar `index.html`:

```html
<body data-audio="./assets/music/micancion.mp3">
```

---

## 📅 ¿Cómo cambiar la fecha?

Editar `index.html`:

```html
<body data-time="2026-04-25 18:00:00">
```

Formato: `YYYY-MM-DD HH:MM:SS`

---

## 🎨 Arquitectura del Código

### Patrón: Module Pattern

Cada módulo es una **IIFE (Immediately Invoked Function Expression)**:

```javascript
export const miModulo = (() => {
    // Variables privadas
    let datos = null;

    // Funciones privadas
    const operacionInterna = () => { ... };

    // API pública
    return {
        metodoPublico,
    };
})();
```

**Ventajas:**
- Encapsulación: datos privados no se pueden acceder desde fuera
- Modular: cada archivo tiene su responsabilidad
- Reutilizable: importar solo lo que necesites

---

## 🔄 Flujo de Carga de Imágenes

```
1. HTML carga <img data-src="imagen.webp" src="placeholder.webp">
                      ↓
2. slideshow-init.js crea elementos con data-src
                      ↓
3. lazyload.js busca elementos con data-src
                      ↓
4. IntersectionObserver detecta: "¿Está visible?"
   SÍ → Cargar ahora
   NO → Esperar
                      ↓
5. image.js carga: precargar → asignar → mostrar
                      ↓
6. progress.js actualiza: "Imagen 5/23 [22%]"
                      ↓
7. Imagen visible en pantalla ✅
```

---

## 🛠️ Desarrollo

### Agregar funcionalidad nueva

1. Crear archivo en `js/app/guest/`
2. Usar patrón Module Pattern
3. Exportar el módulo
4. Importar en `guest.js`
5. Inicializar en `guest.init()`

Ejemplo:

```javascript
// js/app/guest/nuevo.js
export const nuevo = (() => {
    const init = () => {
        console.log('Mi nuevo módulo cargado');
    };

    return { init };
})();

// js/app/guest/guest.js
import { nuevo } from './nuevo.js';
// ...
nuevo.init();
```

---

## 🐛 Debugging

### Ver mensajes de consola

Abrir DevTools: `F12` o `Ctrl+Shift+I`

**Ir a:** Consola (Console)

### Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Error loading image (9/23)` | Archivo no existe o extensión incorrecta | Verificar nombres en `images.json` |
| `404 not found` | Ruta incorrecta | Verificar rutas relativas |
| `offline` | Sin internet | Verificar conexión |

---

## 📊 Estadísticas del Código

- **Total de archivos JS:** 20+
- **Total de líneas comentadas:** 500+
- **Módulos:** 15+
- **Funciones públicas:** 50+

---

## 📖 Archivos de Documentación

1. **DOCUMENTACION_CODIGO.md** - Documentación técnica completa
2. **GUIA_RAPIDA.md** - Esta guía (para uso rápido)
3. **Comentarios en código** - Documentación inline

---

## ✉️ Soporte

Si algo no funciona:

1. Verificar consola (F12)
2. Revisar `DOCUMENTACION_CODIGO.md`
3. Buscar el módulo en `js/`
4. Leer comentarios del código

---

**Actualizado:** 8 de marzo de 2026
**Versión:** 1.0 completamente documentado
