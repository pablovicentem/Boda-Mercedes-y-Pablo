# 🔄 Cómo Usar Git y GitHub

Instrucciones específicas para tu proyecto de boda.

---

## 📌 Tu Situación Actual

- ✅ El repositorio ya existe en GitHub
- ✅ Está configurado como GitHub Pages
- ✅ La rama principal es `main`
- ✅ El sitio se publicará en: `https://usuario.github.io/Boda-Mercedes-y-Pablo`

---

## 🚀 Flujo Básico (Repetir para cada cambio)

### 1. Ver Cambios
```bash
# En tu carpeta del proyecto
git status

# Deberías ver archivos modificados o sin rastrear
```

### 2. Agregar Cambios
```bash
# Agregar TODO
git add .

# O agregar solo algunos archivos
git add index.html
git add css/style.css
```

### 3. Confirmar Cambios
```bash
# Ver cambios antes de confirmar
git diff

# Confirmar con mensaje
git commit -m "Cambié nombres y fecha de la boda"

# Ejemplos de buenos mensajes:
# "Personalicé información de la pareja"
# "Cambié colores del tema a azul"
# "Agregué fotos personales"
# "Actualicé ubicación y mapa"
```

### 4. Subir a GitHub
```bash
# Subir cambios
git push origin main

# Espera 1-2 minutos para que GitHub Pages se actualice
```

### 5. Verificar
- Abre tu navegador
- Ve a `https://usuario.github.io/Boda-Mercedes-y-Pablo`
- Actualiza con Cmd+Shift+R (Mac) o Ctrl+Shift+R (Windows)
- Verifica los cambios

---

## 📊 Ver Historial

### Ver todos tus commits
```bash
git log

# Ver de forma más legible
git log --oneline

# Ver con detalles
git log --oneline --graph
```

### Ver qué cambió
```bash
# Cambios no confirmados
git diff

# Cambios confirmados sin subir
git diff origin/main

# Cambios en un archivo específico
git diff index.html
```

---

## 🔧 Tareas Comunes

### Si cometiste un error en el último commit
```bash
# Añadir cambios al último commit sin crear uno nuevo
git add .
git commit --amend --no-edit

# Luego subir con force
git push origin main --force
```

### Si quieres deshacer cambios en un archivo
```bash
# Deshacer cambios en un archivo específico
git checkout -- index.html

# Deshacer todos los cambios
git checkout -- .
```

### Si alguien más hizo cambios
```bash
# Descargar cambios remotos
git pull origin main

# Luego haz tus cambios y sube
git add .
git commit -m "Mi mensaje"
git push origin main
```

---

## 🚨 Problemas Comunes

### "error: Your local changes to the following files would be overwritten by merge"
```bash
# Guarda tus cambios
git stash

# Actualiza desde GitHub
git pull origin main

# Recupera tus cambios
git stash pop
```

### "fatal: not a git repository"
```bash
# Asegúrate de estar en la carpeta correcta
cd /Users/MSR/Documents/repoboda/Boda-Mercedes-y-Pablo

# Verifica que existe .git
ls -la | grep ".git"
```

### "push rejected"
```bash
# Alguien hizo cambios remotos, actualiza primero
git pull origin main

# Resuelve conflictos si es necesario
# Luego sube
git push origin main
```

---

## 💡 Tips Profesionales

✅ **Haz commits pequeños** - Un cambio por commit
```bash
# ✅ Bien: cambio específico
git commit -m "Cambié fecha a 20 de diciembre"

# ❌ Mal: demasiados cambios
git commit -m "Cambios varios"
```

✅ **Mensajes claros** - Describe qué y por qué
```bash
# ✅ Bien
git commit -m "Agregué fotos personales a la galería"

# ❌ Mal
git commit -m "update"
```

✅ **Antes de empezar** - Verifica el estado
```bash
git status  # siempre haz esto
```

✅ **Frecuencia** - Haz push regularmente
```bash
# No dejes cambios sin subir por días
# Sube cada vez que termines un cambio importante
```

---

## 🔐 Configurar Autenticación

Si GitHub pide contraseña cada vez:

### Opción 1: Token Personal (Recomendado)
```bash
# GitHub mostrará un campo de contraseña
# Usa un Personal Access Token en lugar de contraseña
# Ve a GitHub → Settings → Developer settings → Personal access tokens
```

### Opción 2: SSH Key (Avanzado)
```bash
# Generar clave SSH (solo una vez)
ssh-keygen -t ed25519 -C "tu.email@example.com"

# Seguir las instrucciones

# Agregar clave pública a GitHub
# Ve a GitHub → Settings → SSH and GPG keys
# Agregar tu clave pública (~/.ssh/id_ed25519.pub)

# Cambiar URL a SSH
git remote set-url origin git@github.com:usuario/Boda-Mercedes-y-Pablo.git
```

---

## 📱 Resumen Rápido

Para cada cambio:
```bash
git status
git add .
git commit -m "Tu mensaje aquí"
git push origin main
# Espera 1-2 minutos
# Refresh el navegador con Cmd+Shift+R
```

¡Eso es todo! 🎉

---

## 🆘 Necesitas Ayuda?

```bash
# Ver ayuda de git
git help

# Ver ayuda de un comando específico
git help push
git help pull
git help commit

# Ver estado detallado
git status -v

# Ver logs bonitos
git log --oneline --graph --all
```

---

¡Ahora puedes mantener tu página de boda actualizada fácilmente! 💍

