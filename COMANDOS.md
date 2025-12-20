# 💻 Comandos Útiles para tu Página de Boda

## 🚀 Ejecutar Localmente

### Opción 1: Python (Recomendado)
```bash
# En la carpeta del proyecto
python -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000

# Para detener: Ctrl+C
```

### Opción 2: Node.js (si tienes instalado)
```bash
# Instalar servidor simple global (solo la primera vez)
npm install -g http-server

# Ejecutar
http-server

# Detenerse: Ctrl+C
```

### Opción 3: VS Code Live Server
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. "Open with Live Server"

---

## 📝 Comandos Git

### Primer setup (si no está configurado)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"
```

### Ver estado
```bash
# Qué archivos han cambiado
git status

# Ver el histórico de cambios
git log --oneline
```

### Guardar cambios locales
```bash
# Agregar todos los cambios
git add .

# O agregar archivo específico
git add index.html

# Ver cambios antes de commit
git diff

# Confirmar cambios
git commit -m "Mensaje describiendo qué cambió"

# Ejemplos de mensajes:
# "Cambié nombres y fecha"
# "Actualicé la ubicación y mapa"
# "Agregué fotos personales"
# "Cambié colores al tema"
```

### Subir a GitHub
```bash
# Subir cambios
git push origin main

# Ver si hay conflictos
git status

# Si hay error, primero tira de cambios remotos
git pull origin main
git push origin main
```

### Ver cambios realizados
```bash
# Ver todas las diferencias
git diff

# Ver qué cambios van a subir
git diff origin/main

# Ver un archivo específico
git show HEAD:index.html
```

---

## 🔍 Verificaciones Útiles

### Verificar que HTML es válido
```bash
# Online en:
# https://validator.w3.org/

# O instalar localmente:
npm install -g html-validator-cli
html-validator index.html
```

### Optimizar imágenes
```bash
# Si tienes ImageMagick instalado:
convert image.jpg -resize 400x400 image-optimized.jpg
```

---

## 📱 Pruebas en Diferentes Dispositivos

### Chrome DevTools
1. Abre `index.html` en Chrome
2. Press `F12` (Dev Tools)
3. Click en el ícono de dispositivo móvil (arriba a la izquierda)
4. Selecciona diferentes tamaños de pantalla

### Usar ngrok para compartir localmente
```bash
# Instalar (solo la primera vez)
brew install ngrok  # Mac
# o choco install ngrok  # Windows con Chocolatey

# Ejecutar servidor local
python -m http.server 8000

# En otra terminal, exponer públicamente
ngrok http 8000

# Verás una URL como:
# https://abc123.ngrok.io
# Comparte esta URL con otros
```

---

## 🎨 Editar Archivos sin Instalar Nada

### Editores Online:
- [Codepen.io](https://codepen.io) - Prueba HTML/CSS/JS online
- [JSFiddle.net](https://jsfiddle.net) - Editor online
- [Replit.com](https://replit.com) - IDE online completo

### Editores Recomendados:
- **VS Code** (Gratis, muy popular) - [Descargar](https://code.visualstudio.com/)
- **Sublime Text** (Pago, pero funciona gratis)
- **Atom** (Gratis, deprecated pero funciona)
- Incluso **Notepad** funciona, pero no es ideal

---

## 🔧 Troubleshooting

### GitHub Pages no se actualiza
```bash
# Forzar actualización en el navegador
# Mac: Cmd+Shift+R
# Windows/Linux: Ctrl+Shift+R

# Ver que los cambios subieron correctamente
git log

# Si no ves tus cambios:
git push origin main --force
```

### Error: "fatal: not a git repository"
```bash
# Dentro de la carpeta, inicializar git
git init

# Agregar el remote
git remote add origin https://github.com/usuario/Boda-Mercedes-y-Pablo.git

# Confirmar
git remote -v
```

### Error al hacer git push
```bash
# Primero tira los cambios del servidor
git pull origin main

# Luego sube
git push origin main

# Si sigue habiendo conflictos, reestablece
git fetch origin
git reset --hard origin/main
```

---

## 📊 Estadísticas y Debugging

### Ver tamaño de archivos
```bash
# Mac/Linux
ls -lh

# Windows
dir

# Tamaño total
du -sh .
```

### Buscar errores en el HTML
```bash
# Ver si hay problemas con los links
grep -n "href=" index.html

# Ver todas las imágenes
grep -n "img src=" index.html

# Ver todos los scripts
grep -n "script src=" index.html
```

### Monitorear cambios en tiempo real (Mac/Linux)
```bash
# Instalar fswatch
brew install fswatch

# Ejecutar cuando cambien archivos
fswatch -o . | xargs -n1 -I {} echo "Cambios detectados"
```

---

## ⚡ Atajos Útiles

### En el editor (VS Code)
```
Ctrl+` (backtick)       - Abrir terminal integrada
Ctrl+Shift+P            - Command Palette
Ctrl+/                  - Comentar/descomentar línea
Ctrl+D                  - Seleccionar palabra
Alt+Up/Down             - Mover línea
Ctrl+H                  - Buscar y reemplazar
```

### En el navegador (Chrome)
```
F12                     - Abrir DevTools
Cmd+Shift+R (Mac)       - Hard refresh (sin caché)
Ctrl+Shift+R (Windows)  - Hard refresh
Right-click > Inspect   - Inspeccionar elemento
```

---

## 📚 Recursos de Referencia

- [HTML Reference](https://developer.mozilla.org/es/docs/Web/HTML)
- [CSS Reference](https://developer.mozilla.org/es/docs/Web/CSS)
- [JavaScript Reference](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Git Cheat Sheet](https://git-scm.com/docs)
- [GitHub Pages Docs](https://pages.github.com/)

---

## 🎓 Aprende Más

Si quieres aprender HTML/CSS/JavaScript:
- [FreeCodeCamp](https://www.freecodecamp.org/) - Cursos gratis
- [Codecademy](https://www.codecademy.com/) - Interactive courses
- [W3Schools](https://www.w3schools.com/) - Referencia rápida
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación oficial

---

## 💡 Tips Finales

✅ **Siempre** haz `git status` antes de trabajar  
✅ **Siempre** prueba localmente primero  
✅ **Siempre** haz commits pequeños (un cambio por commit)  
✅ **Escribe** mensajes de commit claros  
✅ **Espera** 1-2 minutos después de push antes de comprobar GitHub Pages  

---

¿Necesitas ayuda? ¡Consulta los otros archivos de documentación! 📚

