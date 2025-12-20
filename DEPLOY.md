# 🚀 Guía de Deploy - GitHub Pages

## ¿Tu repositorio ya es un GitHub Pages?

Verifica en GitHub Settings → Pages. Si ves una URL como `https://usuario.github.io/Boda-Mercedes-y-Pablo`, ¡ya está configurado!

---

## Pasos para Activar GitHub Pages

### 1. En tu Repositorio en GitHub

```
Settings → Pages
```

### 2. Selecciona la Rama de Publicación

- **Source:** Deploy from a branch
- **Branch:** `main` (o la rama donde esté tu código)
- **Folder:** `/ (root)` - esto publicará desde la raíz del repo

### 3. Guarda los Cambios

GitHub Pages se desplegará automáticamente en:
```
https://pablovicentem.github.io/Boda-Mercedes-y-Pablo
```

---

## ✅ Verificar que el Deploy Funcionó

1. Espera 1-2 minutos
2. Ve a **Settings → Pages** en GitHub
3. Deberías ver una URL de tu sitio en vivo
4. Abre la URL en tu navegador

---

## 📝 Hacer Cambios

Cada vez que hagas un commit y push:

```bash
git add .
git commit -m "Actualizado contenido de la boda"
git push origin main
```

GitHub Pages se actualizará automáticamente en **1-2 minutos**.

---

## 🆘 Problemas Comunes

### La página muestra un 404
- Verifica que `index.html` está en la raíz del repositorio
- Asegúrate de que la rama seleccionada en Settings es donde está el código

### Los estilos CSS no carga
- Verifica que los paths relativos en `index.html` son correctos:
  - `css/style.css` ✅
  - `/css/style.css` ❌

### No veo cambios después de hacer push
- Espera 2-3 minutos (GitHub Pages necesita tiempo)
- Hard refresh: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows)

---

## 📊 Dominio Personalizado (Opcional)

Si quieres usar `midominio.com` en lugar de `github.io`:

1. Compra un dominio
2. Ve a **Settings → Pages**
3. Escribe tu dominio en "Custom domain"
4. Sigue las instrucciones de DNS

---

## 🔒 Privacidad

- El repositorio puede ser **público** o **privado**
- GitHub Pages funciona igual en ambos casos
- Cualquiera con el URL puede ver tu web de boda

---

## 📱 Mobile First

Tu sitio ya es responsivo (funciona en móviles). Pruébalo en tu teléfono abriendo la URL.

---

¡Listo! Tu página de boda estará en vivo. 🎉💍

