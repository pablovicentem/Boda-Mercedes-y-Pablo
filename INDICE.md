# 📖 Índice de Documentación - Boda Mercedes & Pablo

Bienvenido a tu página de boda. Aquí tienes un mapa de toda la documentación disponible.

---

## 🚀 EMPIEZA AQUÍ

### Para Empezar Rápido (15 minutos)
→ Lee: **[INICIO.md](INICIO.md)**

Incluye:
- Primeros pasos
- Qué cambiar primero
- Cómo probar localmente
- Cómo activar GitHub Pages

---

## 📚 DOCUMENTACIÓN COMPLETA

### 1. 🎨 Personalización
**Archivo:** [PERSONALIZACION.md](PERSONALIZACION.md)

Cómo cambiar:
- Nombres y fecha
- Horarios del día
- Ubicación y mapa
- Fotos
- Colores del tema
- Tipografía
- Información de la pareja
- Idioma y campos del formulario

**Tiempo:** 30-60 minutos

---

### 2. 🚀 Publicar en GitHub Pages
**Archivo:** [DEPLOY.md](DEPLOY.md)

Incluye:
- Cómo activar GitHub Pages
- Pasos de publicación
- Verificar que funciona
- Problemas comunes
- Dominio personalizado (opcional)

**Tiempo:** 5-10 minutos

---

### 3. 💻 Comandos Útiles
**Archivo:** [COMANDOS.md](COMANDOS.md)

Referencia de:
- Comandos Python/Node para servidor local
- Comandos Git
- Verificaciones útiles
- Pruebas en dispositivos
- Troubleshooting

**Uso:** Consultar cuando necesites un comando específico

---

### 4. 🖼️ Cómo Agregar Fotos
**Archivo:** [IMAGENES.md](IMAGENES.md)

Cómo:
- Usar imágenes locales
- Usar imágenes de internet
- Optimizar fotos
- Servicios de imágenes gratuitas

**Tiempo:** 10-15 minutos

---

### 5. 📋 Información General del Proyecto
**Archivo:** [README.md](README.md)

Incluye:
- Características del sitio
- Estructura del proyecto
- Requisitos para GitHub Pages
- Recursos útiles

**Lectura:** Informativa

---

### 6. 🔧 Resumen Técnico
**Archivo:** [TECNICO.md](TECNICO.md)

Para desarrolladores:
- Tecnologías utilizadas
- Estructura de datos
- Cómo integrar Google Forms
- Mejoras futuras
- Debugging

**Para:** Desarrolladores o usuarios técnicos

---

## 🎯 FLUJO RECOMENDADO

### Primero (15 min)
1. Lee **INICIO.md** - Entiende qué tienes
2. Abre **index.html** en tu editor
3. Personaliza nombres, fecha, ubicación

### Después (30 min)
4. Lee **PERSONALIZACION.md** - Detalles
5. Personaliza colores, fotos, más detalles
6. Prueba localmente: `python -m http.server 8000`

### Antes de Publicar (10 min)
7. Verifica que todo se ve bien
8. Lee **DEPLOY.md** - Pasos de publicación
9. Activa GitHub Pages en Settings

### Lanzamiento (5 min)
10. Haz push a GitHub: `git push origin main`
11. Espera 1-2 minutos
12. Comparte URL con invitados: `https://usuario.github.io/Boda-Mercedes-y-Pablo`

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
Boda-Mercedes-y-Pablo/
│
├── 📄 DOCUMENTACIÓN (archivos .md)
│   ├── INICIO.md              ← EMPIEZA AQUÍ
│   ├── PERSONALIZACION.md     ← Cómo personalizar
│   ├── DEPLOY.md              ← Cómo publicar
│   ├── COMANDOS.md            ← Comandos útiles
│   ├── IMAGENES.md            ← Cómo agregar fotos
│   ├── TECNICO.md             ← Info técnica
│   ├── README.md              ← Información general
│   └── INDICE.md              ← Este archivo
│
├── 🌐 PÁGINA WEB
│   ├── index.html             ← Página principal (EDITA AQUÍ)
│   ├── css/
│   │   └── style.css          ← Estilos (edita para colores)
│   ├── js/
│   │   └── script.js          ← Lógica JavaScript
│   └── img/                   ← Carpeta para tus fotos
│
├── ⚙️ CONFIGURACIÓN
│   ├── _config.yml            ← Configuración Jekyll
│   ├── .nojekyll              ← Control Jekyll
│   ├── package.json           ← Metadatos del proyecto
│   ├── .gitignore             ← Archivos ignorados en Git
│   └── .git/                  ← Control de versiones Git
│
└── 📁 PLANTILLAS (creadas por Jekyll)
    └── _layouts/              ← Plantillas HTML (no necesarias)
```

---

## ⚡ RESPUESTAS RÁPIDAS

### P: ¿Cómo cambio el nombre de la pareja?
**R:** Edita `index.html`, línea ~18. Busca "Mercedes & Pablo" y reemplaza.
Archivo: [INICIO.md](INICIO.md#primeros-pasos)

---

### P: ¿Cómo agrego mis fotos?
**R:** Copia fotos a carpeta `img/` o usa URLs de internet.
Archivo: [IMAGENES.md](IMAGENES.md)

---

### P: ¿Cómo cambio los colores?
**R:** Edita `css/style.css` línea ~14 en `:root { --primary-color: ... }`
Archivo: [PERSONALIZACION.md](PERSONALIZACION.md#personalización-de-colores)

---

### P: ¿Cómo publico en GitHub Pages?
**R:** Settings → Pages → Branch: main → Espera 1-2 min
Archivo: [DEPLOY.md](DEPLOY.md)

---

### P: ¿Cómo pruebo localmente?
**R:** `python -m http.server 8000` luego abre `http://localhost:8000`
Archivo: [COMANDOS.md](COMANDOS.md)

---

### P: ¿Qué es GitHub Pages?
**R:** Un servicio gratis de GitHub para hospedar sitios web estáticos.
Archivo: [DEPLOY.md](DEPLOY.md#qué-es-github-pages)

---

### P: ¿Cómo guardo cambios en Git?
**R:** `git add .` → `git commit -m "mensaje"` → `git push origin main`
Archivo: [COMANDOS.md](COMANDOS.md#guardar-cambios-locales)

---

### P: ¿Es gratis?
**R:** Sí, completamente gratis. GitHub Pages no cuesta nada.
Archivo: [README.md](README.md#destacados)

---

## 🎨 ARCHIVOS PRINCIPALES A EDITAR

| Archivo | Qué cambiar | Dificultad |
|---------|------------|-----------|
| `index.html` | Nombres, fechas, ubicación, texto | Fácil |
| `css/style.css` | Colores, tipografía, espaciado | Media |
| `js/script.js` | Lógica de formulario | Difícil |

---

## ✅ CHECKLIST DE PUBLICACIÓN

- [ ] He personalizado `index.html` (nombres, fecha, ubicación)
- [ ] He testeado localmente con `python -m http.server 8000`
- [ ] He hecho `git add .` y `git commit -m "..."`
- [ ] He hecho `git push origin main`
- [ ] He activado GitHub Pages en Settings → Pages
- [ ] He esperado 1-2 minutos y comprobado la URL
- [ ] He compartido la URL con los invitados

---

## 🔗 ENLACES ÚTILES

### Documentación
- [HTML Reference](https://developer.mozilla.org/es/docs/Web/HTML)
- [CSS Reference](https://developer.mozilla.org/es/docs/Web/CSS)
- [JavaScript Reference](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Git Docs](https://git-scm.com/docs)
- [GitHub Pages](https://pages.github.com/)

### Herramientas Online
- [Color Picker](https://htmlcolorcodes.com/)
- [Coolors.co](https://coolors.co/) - Paletas de color
- [Fonts Google](https://fonts.google.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) - Fotos gratis

### Servicios para Bodas
- [Google Forms](https://forms.google.com/) - Recopilar RSVPs
- [Google Maps](https://maps.google.com/) - Ubicaciones
- [Canva](https://www.canva.com/) - Diseño gráfico

---

## 🆘 AYUDA

### Si tienes dudas:
1. Busca la palabra clave en los archivos `.md`
2. Consulta la tabla de "Respuestas Rápidas" arriba
3. Lee el archivo `.md` más relevante
4. Prueba en el navegador con F12 (DevTools)

### Errores Comunes:
- GitHub Pages no se actualiza → Espera 2-3 min y haz refresh con Cmd+Shift+R
- Estilos CSS no cargan → Verifica que `css/style.css` existe
- Formulario no funciona → Abre F12 en el navegador y mira la consola

---

## 🎓 PRÓXIMOS PASOS

1. ✅ Leer **[INICIO.md](INICIO.md)** (ahora)
2. ✅ Personalizar `index.html`
3. ✅ Probar localmente
4. ✅ Leer **[PERSONALIZACION.md](PERSONALIZACION.md)** para detalles
5. ✅ Leer **[DEPLOY.md](DEPLOY.md)** antes de publicar
6. ✅ Publicar en GitHub Pages
7. ✅ Compartir con invitados

---

## 📞 CONTACTO

¿Problemas? Consults:
- [Proyecto Original](https://github.com/rampatra/wedding-website)
- [GitHub Pages Help](https://github.com/contact/report-content)
- [Stack Overflow](https://stackoverflow.com/) - Para preguntas técnicas

---

**Última actualización:** 20 de diciembre de 2025

**Basado en:** [wedding-website](https://github.com/rampatra/wedding-website) de Ram Patra

¡Que disfrutéis preparando vuestra boda! 💍❤️

