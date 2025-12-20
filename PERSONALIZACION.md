# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar completamente tu página de boda.

---

## 📋 Cambios Rápidos (5 minutos)

### 1. Tu Nombre y Fecha
**Archivo:** `index.html`

Busca y reemplaza:
- `Mercedes & Pablo` → vuestros nombres
- `20 de diciembre de 2025` → vuestra fecha
- `Nos casamos` → mensaje personalizador

### 2. Horarios del Día
**Archivo:** `index.html` (sección "El Gran Día")

```html
<p class="time">3:00 PM</p>
<p>Bienvenida de los invitados</p>
```

Cambia las horas y descripciones según tu cronograma.

### 3. Ubicación
**Archivo:** `index.html`

```html
<p><strong>Salón de Celebraciones</strong></p>
<p>Calle Principal, 123<br>Ciudad, CP 12345</p>
```

Reemplaza con tu dirección real.

### 4. Mapa de Google Maps
**Archivo:** `index.html`

Busca `<iframe src="https://www.google.com/maps..."`

1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu ubicación
3. Haz clic en "Compartir"
4. Selecciona "Insertar un mapa"
5. Copia el `<iframe>`
6. Reemplaza el existente en `index.html`

### 5. Redes Sociales
**Archivo:** `index.html` (footer)

```html
<a href="https://instagram.com/tuusuario" title="Instagram">
    <i class="fab fa-instagram"></i>
</a>
```

Actualiza:
- Tus URLs de redes sociales
- O quita los que no uses

---

## 🖼️ Personalización de Imágenes

### Opción 1: Imágenes Locales (Recomendado)
1. Copia tus fotos a la carpeta `img/`
2. Edita `index.html` - sección "Galería"
3. Reemplaza las URLs de unsplash con tu carpeta:

```html
<!-- Antes -->
<img src="https://images.unsplash.com/..." alt="Foto 1">

<!-- Después -->
<img src="img/mi-foto-1.jpg" alt="Foto 1">
```

### Opción 2: Fotos de Internet
Mantén las URLs de unsplash o:
- [Pexels](https://pexels.com) - Fotos gratis
- [Pixabay](https://pixabay.com) - Más fotos gratis
- [Unsplash](https://unsplash.com) - Colección enorme

---

## 🎨 Personalización de Colores

**Archivo:** `css/style.css`

Busca la sección `:root` al principio:

```css
:root {
    --primary-color: #d4567a;      /* Rosa principal */
    --secondary-color: #f5a5ac;    /* Rosa secundaria */
    --dark-color: #2c3e50;         /* Color oscuro */
    --light-color: #ecf0f1;        /* Color claro */
}
```

### Colores Predefinidos por Tema:

**Tema Romántico (Rosa)**
```css
--primary-color: #d4567a;
--secondary-color: #f5a5ac;
```

**Tema Clásico (Oro)**
```css
--primary-color: #d4af37;
--secondary-color: #ffd700;
```

**Tema Moderno (Azul)**
```css
--primary-color: #2c5aa0;
--secondary-color: #5b9bd5;
```

**Tema Natural (Verde)**
```css
--primary-color: #2d5016;
--secondary-color: #6ba876;
```

Para encontrar colores: [Color Picker](https://htmlcolorcodes.com/)

---

## ✏️ Personalización de Texto

### Sección "La Pareja"
**Archivo:** `index.html`

```html
<h3>Mercedes</h3>
<p>La novia</p>
```

Reemplaza con algo más personal:
```html
<h3>Mercedes</h3>
<p>Ingeniera, amante del viaje y del arte</p>
```

### Mensajes Personalizados
Busca y personaliza:
- "Nos casamos" → "Nos decimos sí"
- "¡Nos casamos!" → Mensaje custom
- Cualquier otro texto que quieras cambiar

---

## 🔤 Cambiar Tipografía

**Archivo:** `index.html` (en la cabeza)

```html
<link href="https://fonts.googleapis.com/css?family=Great+Vibes|Poppins:400,600,700&display=swap" rel="stylesheet">
```

Tipografías bonitas para bodas:
- **Elegante:** Playfair Display, Cinzel, Cormorant Garamond
- **Romántica:** Great Vibes, Satisfy, Dancing Script
- **Moderna:** Poppins, Montserrat, Inter

Cómo cambiar:
1. Ve a [Google Fonts](https://fonts.google.com/)
2. Selecciona 2 fuentes (una para títulos, otra para texto)
3. Copia el `<link>` y reemplaza el existente
4. Actualiza los nombres en `css/style.css`:

```css
h1, h2, h3 {
    font-family: 'Tu Fuente Elegida', cursive;
}

body {
    font-family: 'Tu Fuente de Texto', sans-serif;
}
```

---

## 📱 Prueba en Móvil

1. Abre el sitio en tu teléfono
2. Prueba todos los formularios
3. Verifica que las fotos se ven bien
4. Comprueba que los enlaces funcionan

---

## 🤝 Información de la Pareja

Edita en `index.html`:

```html
<div class="pareja-card">
    <div class="pareja-image mercedes"></div>
    <h3>Mercedes</h3>
    <p>La novia</p>
</div>
```

Puedes añadir más información editable:
- Edad
- Profesión
- Hobby favorito
- Cómo os conocisteis

---

## 🌐 Cambiar Idioma

El sitio está en español. Para traducir:
1. Reemplaza todo el texto en `index.html`
2. Dirección: si es RTL, edita `css/style.css`
3. Fechas: formatea según tu idioma

---

## 💌 Personalizar Formulario RSVP

**Archivo:** `index.html`

Puedes agregar más campos:

```html
<div class="form-group">
    <label for="acompanante">¿Traerás acompañante?</label>
    <input type="text" id="acompanante" name="acompanante">
</div>
```

O quitar campos que no necesites.

---

## 🎬 Agregar Video

Reemplaza el mapa con un video de tu venue:

```html
<iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    width="100%" 
    height="450" 
    style="border-radius: 12px;">
</iframe>
```

---

## 📧 Integración con Email

Para recibir RSVPs por email, opciones:

1. **Google Forms** (Gratis, recomendado)
   - Crea un formulario en Google Forms
   - Las respuestas se guardan automáticamente
   - Recibe notificaciones por email

2. **Formspree** (Gratis hasta 50 envíos)
   - Servicio que integra formularios

3. **Backend Personalizado** (Avanzado)
   - Requiere servidor

---

## 🚀 Probar Cambios Localmente

```bash
# En la carpeta del proyecto
python -m http.server 8000

# Luego abre:
# http://localhost:8000
```

Cada vez que guardes un archivo, simplemente recarga la página en el navegador.

---

## 📤 Publicar Cambios

```bash
git add .
git commit -m "Actualización de datos de la boda"
git push origin main
```

¡GitHub Pages se actualiza automáticamente!

---

## 🎓 Tips de Diseño

1. **Usa máximo 2-3 colores** - Menos es más
2. **Letra grande** - Fácil de leer en móvil
3. **Espacios en blanco** - No sobrecargues
4. **Fotos de calidad** - Es lo que verán tus invitados
5. **Prueba en móvil** - 80% accederán desde teléfono

---

## ✅ Checklist de Personalización

- [ ] Actualizar nombres y fecha
- [ ] Cambiar horarios del día
- [ ] Agregar ubicación real
- [ ] Insertar mapa de Google Maps
- [ ] Añadir tus fotos
- [ ] Personalizar colores
- [ ] Actualizar redes sociales
- [ ] Personalizar tipografía (opcional)
- [ ] Probar en móvil
- [ ] Hacer push a GitHub

---

¡Tu página de boda está lista para ser personalizada! 💍✨

