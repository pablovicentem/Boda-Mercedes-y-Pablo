# 💍 Boda de Mercedes & Pablo

¡Bienvenidos a nuestra página web de boda! Esta es una página web moderna, responsiva y personalizable para vuestra boda, alojada en GitHub Pages.

**[Ver la página en vivo](https://pablovicentem.github.io/Boda-Mercedes-y-Pablo)**

---

## ✨ Características

- ✅ Diseño moderno y responsivo (móvil, tablet, desktop)
- ✅ Página principal con información de la boda
- ✅ Sección de cronograma del día
- ✅ Galería de fotos
- ✅ Formulario RSVP integrado
- ✅ Mapa de ubicación
- ✅ Completamente personalizable
- ✅ Alojado gratuitamente en GitHub Pages

---

## 🚀 Cómo Personalizar

### 1. Editar Información de la Boda
Abre `index.html` y busca y reemplaza:
- `Mercedes & Pablo` → vuestros nombres
- `20 de diciembre de 2025` → vuestra fecha
- Los horarios y lugares en la sección de timeline

### 2. Añadir Fotos
- Copia tus fotos a la carpeta `img/`
- Actualiza los nombres de las imágenes en `index.html`:
  - `img/placeholder-1.jpg` → tu foto
  - Y así sucesivamente para todas las fotos

### 3. Actualizar Redes Sociales
En el footer, reemplaza los `#` en:
```html
<a href="https://instagram.com/tuusuario" title="Instagram"><i class="fab fa-instagram"></i></a>
<a href="https://facebook.com/tuusuario" title="Facebook"><i class="fab fa-facebook"></i></a>
```

### 4. Configurar el RSVP con Google Forms (Opcional)
El formulario actualmente guarda datos en el navegador. Para integrar con Google Forms:
1. Crea un formulario en [Google Forms](https://forms.google.com)
2. Obtén el ID del formulario de la URL
3. Usa el ID en la función `sendToGoogleForms()` en `js/script.js`

---

## 📱 Secciones Principales

- **Inicio** - Portada elegante con fecha
- **La Pareja** - Presentación de los novios
- **Evento** - Cronograma y ubicación
- **Galería** - Tus mejores fotos
- **RSVP** - Formulario de confirmación
- **Footer** - Enlaces a redes sociales

---

## 🎨 Colores Personalizados

Los colores están definidos en `css/style.css`. Busca `:root` y modifica:
```css
--primary-color: #d4567a;      /* Rosa principal */
--secondary-color: #f5a5ac;    /* Rosa secundaria */
--dark-color: #2c3e50;         /* Oscuro */
```

---

## 📝 Requisitos para GitHub Pages

✅ **Ya está configurado:**
- `.nojekyll` - Para deshabilitar Jekyll
- `_config.yml` - Configuración de Jekyll
- `index.html` - Página principal

---

## 🌐 Desplegar en GitHub Pages

### Opción 1: Usar la rama `main` (Recomendado)
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: selecciona "Deploy from a branch"
4. Branch: selecciona `main`
5. ¡Listo! Tu sitio estará en `https://usuario.github.io/Boda-Mercedes-y-Pablo`

### Opción 2: Usar la rama `gh-pages`
```bash
# Crea una rama gh-pages
git checkout -b gh-pages

# Haz push de esta rama
git push origin gh-pages

# En GitHub Settings → Pages
# Selecciona la rama gh-pages
```

---

## 💻 Ejecutar Localmente

```bash
# Python 3
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

---

## 📧 Formulario RSVP

El formulario tiene los siguientes campos:
- Nombre completo (requerido)
- Email (requerido)
- Teléfono (opcional)
- Número de asistentes (requerido)
- Confirmación de asistencia (requerido)
- Dietas especiales (opcional)
- Mensaje para los novios (opcional)

Los datos se guardan en localStorage del navegador. Para sincronizar con email o Google Sheets, necesitarás implementar un backend o usar Google Apps Script.

---

## 🔧 Estructura de Archivos

```
Boda-Mercedes-y-Pablo/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos
├── js/
│   └── script.js       # JavaScript
├── img/                # Carpeta para fotos
├── package.json        # Dependencias del proyecto
├── README.md           # Este archivo
├── _config.yml         # Configuración de Jekyll
└── .nojekyll          # Disables Jekyll processing
```

---

## 🎯 Siguiente Pasos

1. **Personaliza la información** - Reemplaza nombres, fechas y lugares
2. **Añade fotos** - Sube tus mejores fotos a la carpeta `img/`
3. **Actualiza redes sociales** - Añade tus perfiles de Instagram y Facebook
4. **Prueba localmente** - Ejecuta `python -m http.server 8000` y visualiza
5. **Haz push a GitHub** - Sube los cambios y verifica en GitHub Pages

---

## 📚 Recursos Útiles

- [GitHub Pages Docs](https://pages.github.com/)
- [Google Forms para RSVP](https://forms.google.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

---

## ❤️ Personalización Avanzada

### Cambiar Fuentes
En `index.html`, busca:
```html
<link href="https://fonts.googleapis.com/css?family=Great+Vibes|Poppins:400,600,700&display=swap" rel="stylesheet">
```
Añade más fuentes desde [Google Fonts](https://fonts.google.com/)

### Agregar Video de Venue
Reemplaza el iframe de Google Maps en `index.html` con:
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="100%" height="400"></iframe>
```

---

## 📞 Soporte

¿Preguntas? Consulta la documentación del proyecto original:
[wedding-website](https://github.com/rampatra/wedding-website)

---

## 📄 Licencia

Inspirado en [wedding-website](https://github.com/rampatra/wedding-website) de [Ram Patra](https://github.com/rampatra)

---

**¡Que disfrutéis preparando vuestra boda! 💍❤️**

---

## 💌 Confirmación de Asistencia

Por favor, confirma tu asistencia antes del **[fecha límite]**.  
[🔗 Confirmar asistencia](#)

---

## 📸 Comparte Tus Fotos

Nos encantaría ver todas vuestras fotos del día.  
Usad el hashtag **#[HashtagDeLaBoda]** en redes sociales.

---

## ❤️ Mensajes para Nosotros

Si quieres dejarnos un mensaje bonito o recuerdo especial, puedes hacerlo aquí:  
[🔗 Dejar mensaje](#)

---

## 🎁 Lista de Bodas

Si deseas hacernos un regalo, aquí tienes nuestra lista:  
[🔗 Lista de bodas](#)

---

## ✨ ¡Gracias por compartir este día con nosotros!

Estamos deseando celebrar juntos y crear recuerdos inolvidables.  
¡Nos vemos pronto! 💖

---

> “El amor no se mira, se siente, y aún más cuando se comparte con quienes más queremos.”
