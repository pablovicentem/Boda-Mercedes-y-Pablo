# 🎉 ¡Bienvenido! Empieza Aquí

Tu página de boda está lista. Sigue estos pasos para personalizarla y publicarla.

---

## ⚡ Primeros Pasos (15 minutos)

### 1️⃣ Personaliza la Información Básica
Abre `index.html` con tu editor de texto favorito y busca:
- **Línea ~18**: `Mercedes & Pablo` → Cambiar por vuestros nombres
- **Línea ~19**: `20 de diciembre de 2025` → Vuestra fecha
- **Línea ~41-48**: Horarios y descripción de eventos

### 2️⃣ Cambiar la Ubicación
- **Línea ~99**: Nombre del lugar
- **Línea ~100**: Dirección
- **Línea ~102**: Google Maps (ver guía completa en [PERSONALIZACION.md](PERSONALIZACION.md))

### 3️⃣ Verificar Localmente
```bash
# En tu terminal, dentro de la carpeta del proyecto:
python -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000
```

### 4️⃣ Subir Cambios a GitHub
```bash
git add .
git commit -m "Página de boda personalizada"
git push origin main
```

### 5️⃣ Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main"
5. ¡Listo! Tu sitio estará en: `https://usuario.github.io/Boda-Mercedes-y-Pablo`

---

## 📚 Guías Completas

- **[PERSONALIZACION.md](PERSONALIZACION.md)** - Cómo cambiar colores, fotos, texto
- **[DEPLOY.md](DEPLOY.md)** - Cómo publicar en GitHub Pages
- **[README.md](README.md)** - Información general del proyecto

---

## 🎨 Qué Personalizar

| Elemento | Dónde | Cómo |
|----------|-------|------|
| Nombres | `index.html` línea 18 | Buscar y reemplazar |
| Fecha | `index.html` línea 19 | Cambiar "20 de diciembre" |
| Horarios | `index.html` línea ~40 | Cambiar las horas |
| Ubicación | `index.html` línea ~99 | Cambiar dirección |
| Mapa | `index.html` línea ~102 | Insertar tu mapa de Google Maps |
| Fotos | `index.html` línea ~130 | Cambiar URLs o subir imágenes propias |
| Colores | `css/style.css` línea ~14 | Cambiar valores hexadecimales |
| Redes Sociales | `index.html` línea ~262 | Cambiar URLs de Instagram/Facebook |

---

## 🚀 Estructura del Proyecto

```
Boda-Mercedes-y-Pablo/
├── index.html              ← EDITA AQUÍ (nombres, fechas, ubicación)
├── css/style.css           ← Estilos (colores aquí)
├── js/script.js            ← Lógica del formulario
├── img/                    ← Carpeta para tus fotos
├── README.md               ← Información del proyecto
├── PERSONALIZACION.md      ← Guía detallada
├── DEPLOY.md               ← Cómo publicar
├── _config.yml             ← Configuración Jekyll (no tocar)
└── .nojekyll               ← Control Jekyll (no tocar)
```

---

## ✅ Checklist Rápido

- [ ] Cambiar nombres y fecha en `index.html`
- [ ] Personalizar horarios
- [ ] Agregar tu ubicación
- [ ] Actualizar mapa de Google Maps
- [ ] Cambiar colores en `css/style.css` (opcional)
- [ ] Agregar fotos tuyas
- [ ] Verificar localmente (`python -m http.server 8000`)
- [ ] Hacer push a GitHub
- [ ] Activar GitHub Pages en Settings
- [ ] Compartir URL con invitados

---

## 💡 Tips Importantes

✅ **Haz cambios pequeños y prueba**
- Cambio pequeño → `git push` → Espera 1-2 min → Verifica en navegador

✅ **Usa Ctrl+Shift+R (Windows/Linux) o Cmd+Shift+R (Mac)** para actualizar
- Fuerza una recarga completa sin caché

✅ **Tus datos están seguros**
- Los datos del formulario se guardan en el navegador de cada invitado
- Para integrar con Google Forms, consulta [PERSONALIZACION.md](PERSONALIZACION.md)

✅ **Puedes usar imágenes de internet**
- Starter: Unsplash, Pexels, Pixabay
- O sube tus propias fotos a la carpeta `img/`

---

## 🆘 Problemas?

### No veo cambios después de hacer push
→ Espera 2-3 minutos y haz refresh con Cmd+Shift+R o Ctrl+Shift+R

### GitHub Pages no se activa
→ Verifica que `index.html` está en la raíz y la rama seleccionada tiene tu código

### Los estilos se ven roto
→ Verifica que `css/style.css` existe en la carpeta `css/`

### Quiero editar solo el texto
→ Abre `index.html` con cualquier editor de texto (VS Code, Sublime, Notepad, etc.)

---

## 🎓 Prueba Localmente Primero

```bash
cd /Users/MSR/Documents/repoboda/Boda-Mercedes-y-Pablo
python -m http.server 8000
# Abre http://localhost:8000
```

Así ves los cambios al instante sin tener que hacer push.

---

## 📞 Necesitas Ayuda?

Consulta estas guías:
1. **Cambiar contenido:** [PERSONALIZACION.md](PERSONALIZACION.md)
2. **Publicar en GitHub:** [DEPLOY.md](DEPLOY.md)
3. **Información completa:** [README.md](README.md)

---

## 🎉 ¡Ya Está!

Tu página de boda está lista para ser personalizada y publicada.

**Pasos rápidos:**
1. Edita `index.html` (nombres, fecha, ubicación)
2. Prueba con `python -m http.server 8000`
3. Haz push: `git push origin main`
4. Activa GitHub Pages en Settings
5. ¡Comparte con tus invitados! 💍

---

¡Que disfrutéis preparando la boda! ❤️

