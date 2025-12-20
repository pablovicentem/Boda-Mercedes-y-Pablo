# 📋 Resumen Técnico del Proyecto

Tu página de boda está completa. Aquí está lo que se creó:

---

## 📁 Archivos Creados

### Página Principal
- **index.html** (241 líneas)
  - HTML semántico con estructura completa
  - Secciones: Inicio, Pareja, Evento, Galería, RSVP
  - Responsivo (móvil, tablet, desktop)
  - Formulario RSVP funcional
  - Integración con Google Maps

### Estilos
- **css/style.css** (600+ líneas)
  - Mobile-first responsive design
  - Variables CSS personalizables
  - Animaciones suaves
  - Tema rosa/romántico (fácil de cambiar)
  - Compatible con todos los navegadores modernos

### JavaScript
- **js/script.js** (80+ líneas)
  - Manejo del formulario RSVP
  - Guardado de datos en localStorage
  - Scroll suave
  - Animaciones al scroll
  - Integración preparada para Google Forms

### Configuración
- **_config.yml** - Configuración Jekyll para GitHub Pages
- **.nojekyll** - Desabilita procesamiento Jekyll
- **package.json** - Metadatos del proyecto
- **.gitignore** - Archivos ignorados en Git

### Documentación
- **README.md** - Guía completa del proyecto
- **INICIO.md** - Empieza aquí (primeros pasos)
- **PERSONALIZACION.md** - Cómo personalizar todo
- **DEPLOY.md** - Cómo publicar en GitHub Pages
- **COMANDOS.md** - Comandos útiles
- **IMAGENES.md** - Cómo agregar fotos

---

## 🎨 Características Técnicas

### Frontend
- ✅ HTML5 semántico
- ✅ CSS3 (Flexbox, Grid, Variables)
- ✅ JavaScript Vanilla (sin dependencias)
- ✅ Responsive Design
- ✅ Animaciones CSS
- ✅ Scroll behavior suave
- ✅ Formularios HTML5 nativos

### Integración
- ✅ Font Awesome Icons (6.0)
- ✅ Google Fonts (Great Vibes, Poppins)
- ✅ Google Maps embed
- ✅ Unsplash/Pexels para imágenes
- ✅ localStorage para datos RSVP

### Performance
- ✅ Sin dependencias npm (cero overhead)
- ✅ CSS minifiable
- ✅ Lazy loading de imágenes
- ✅ Carga de fuentes asincrónica
- ✅ Optimizado para móvil

### Accesibilidad
- ✅ HTML semántico
- ✅ ARIA labels cuando es necesario
- ✅ Contraste de colores accesible
- ✅ Navegación por teclado
- ✅ Responsive para todos los tamaños

---

## 🎯 Secciones Incluidas

1. **Navbar** - Navegación sticky
2. **Hero** - Banner elegante con llamada a acción
3. **Pareja** - Presentación de los novios
4. **Evento** - Timeline del día
5. **Ubicación** - Información y mapa
6. **Galería** - Grid de 6 fotos (Unsplash por defecto)
7. **RSVP** - Formulario completo
8. **Footer** - Links sociales

---

## 📱 Responsividad

- ✅ Desktop: optimizado para pantallas 1000px+
- ✅ Tablet: optimizado para pantallas 768px-999px
- ✅ Móvil: optimizado para pantallas <767px
- ✅ Tiny móvil: optimizado para <480px
- ✅ Tested en Chrome, Firefox, Safari, Edge

---

## 🔧 Cómo Personalizar (Resumen Técnico)

### Cambiar Tema de Colores
```css
/* css/style.css línea ~14 */
:root {
    --primary-color: #nuevo-color;
    --secondary-color: #nuevo-color;
    --dark-color: #nuevo-color;
}
```

### Agregar Nuevas Secciones
1. Agregar HTML en `index.html`
2. Agregar CSS en `css/style.css`
3. Actualizar navbar si es necesario
4. Probar responsividad

### Integrar Google Forms para RSVP
1. Crear formulario en Google Forms
2. Obtener el ID del formulario
3. Actualizar función `sendToGoogleForms()` en `js/script.js`
4. Mapear los campos correctamente

### Usar Imagen de Hero Personalizada
Reemplaza en HTML:
```html
<!-- Antes -->
<section id="inicio" class="hero">

<!-- Después -->
<section id="inicio" class="hero" style="background-image: url('tu-imagen.jpg');">
```

Y en CSS:
```css
.hero {
    background: linear-gradient(...), url(...);
    background-size: cover;
    background-position: center;
}
```

---

## 📊 Estructura de Datos RSVP

Cuando alguien completa el formulario, se guarda en localStorage como:

```javascript
{
    nombre: "Juan García",
    email: "juan@example.com",
    telefono: "+34 666 555 444",
    numPersonas: "2",
    asistencia: "Sí",
    dietasEspeciales: "Sin gluten",
    mensaje: "¡Os vemos allí!",
    timestamp: "2025-12-01T10:30:00.000Z"
}
```

Para exportar estos datos, implementa un endpoint backend o usa Google Forms.

---

## 🚀 Pasos para Publicar

1. **Personalizar** `index.html` con tu información
2. **Probar** localmente: `python -m http.server 8000`
3. **Hacer commit**: `git add . && git commit -m "..."`
4. **Hacer push**: `git push origin main`
5. **Activar Pages**: GitHub → Settings → Pages
6. **Esperar**: 1-2 minutos para que se publique
7. **Compartir**: URL será `https://usuario.github.io/Boda-Mercedes-y-Pablo`

---

## 🔐 Seguridad

- ✅ No hay datos sensibles almacenados en el servidor
- ✅ Los datos del formulario se guardan localmente en el navegador
- ✅ No hay comunicación con servidores externos (excepto fuentes y mapas)
- ✅ HTTPS automático en GitHub Pages
- ✅ No hay vulnerabilidades CSRF ya que no hay backend

---

## 📈 Posibles Mejoras Futuras

- Agregar galería con lightbox
- Integración con Google Sheets
- Animaciones más complejas
- Sistema de comentarios
- Contador de días para la boda
- Carrusel de fotos
- Video background en hero

---

## 🐛 Debugging

### Ver la consola del navegador
```javascript
// Ctrl+Shift+I (Windows/Linux) o Cmd+Option+I (Mac)
// Ver logs, errores y warnings

// En js/script.js está comentado para debug:
// console.log('RSVP Data:', data);
```

### Ver datos guardados
```javascript
// En la consola del navegador:
JSON.parse(localStorage.getItem('rsvps'))
```

### Limpiar localStorage
```javascript
// En la consola del navegador:
localStorage.clear()
```

---

## 📚 Archivos que NO debes tocar

- **.git/** - Control de versiones de Git
- **_config.yml** - Configuración Jekyll
- **.nojekyll** - Control Jekyll (déjalo vacío)

---

## 🎓 Tecnologías Utilizadas

- **HTML5** - Semántica web
- **CSS3** - Estilos modernos
- **JavaScript ES6** - Lógica del formulario
- **Jekyll** - Para GitHub Pages
- **Google Fonts API** - Tipografía
- **Font Awesome** - Iconografía
- **Git** - Control de versiones

---

## 📞 Soporte Técnico

Si algo no funciona:

1. Comprueba `git status` - ¿hay cambios sin guardar?
2. Revisa la consola del navegador (F12) - ¿hay errores?
3. Consulta [COMANDOS.md](COMANDOS.md) - ¿necesitas un comando específico?
4. Lee [PERSONALIZACION.md](PERSONALIZACION.md) - ¿instrucciones paso a paso?
5. Ve [DEPLOY.md](DEPLOY.md) - ¿problemas de publicación?

---

## ✅ Checklist de Deployment

- [ ] Todos los nombres personalizados
- [ ] Fecha y hora actualizadas
- [ ] Ubicación con mapa real
- [ ] Fotos propias agregadas
- [ ] Redes sociales actualizadas
- [ ] Colores personalizados (opcional)
- [ ] Testeado en móvil
- [ ] Commits hechos a Git
- [ ] Push a GitHub completado
- [ ] GitHub Pages activado
- [ ] URL compartida con invitados

---

**Proyecto creado basado en:** [wedding-website](https://github.com/rampatra/wedding-website)

**Adaptado para:** Mercedes & Pablo - Boda 2025

**Alojado en:** GitHub Pages

¡Que lo disfrutéis! 💍❤️

