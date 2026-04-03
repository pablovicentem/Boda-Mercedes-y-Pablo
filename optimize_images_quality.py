#!/usr/bin/env python3
"""
Script para optimizar imágenes WebP manteniendo la máxima calidad visual
Reduce tamaño de archivo pero mantiene alta fidelidad visual
"""

from PIL import Image
import os
import sys

def optimize_webp(input_path, max_width=None, max_height=None, quality=88):
    """
    Optimiza una imagen WebP reduciendo dimensiones si es necesario
    pero manteniendo alta calidad visual (quality 85-92)
    
    Args:
        input_path: Ruta al archivo de imagen
        max_width: Ancho máximo (None = sin límite)
        max_height: Alto máximo (None = sin límite)  
        quality: Calidad WebP (85-95 para alta calidad, default 88)
    """
    try:
        img = Image.open(input_path)
        original_size = os.path.getsize(input_path)
        width, height = img.size
        
        # Calcular si necesita redimensionar
        needs_resize = False
        ratio = 1.0
        
        if max_width and width > max_width:
            ratio = min(ratio, max_width / width)
            needs_resize = True
        
        if max_height and height > max_height:
            ratio = min(ratio, max_height / height)
            needs_resize = True
        
        if needs_resize:
            new_width = int(width * ratio)
            new_height = int(height * ratio)
            
            # Usar LANCZOS para la mejor calidad de redimensionado
            img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Guardar con alta calidad WebP
            img_resized.save(input_path, 'webp', quality=quality, method=6)
            
            new_size = os.path.getsize(input_path)
            saved = original_size - new_size
            saved_percent = (saved / original_size) * 100 if original_size > 0 else 0
            
            print(f"✓ {os.path.basename(input_path)}")
            print(f"  {width}x{height} → {new_width}x{new_height}")
            print(f"  {original_size//1024}KB → {new_size//1024}KB (ahorro: {saved//1024}KB / {saved_percent:.1f}%)")
        else:
            # Aunque no redimensione, recomprimir con calidad óptima puede ahorrar espacio
            img.save(input_path, 'webp', quality=quality, method=6)
            new_size = os.path.getsize(input_path)
            
            if new_size < original_size:
                saved = original_size - new_size
                saved_percent = (saved / original_size) * 100
                print(f"✓ {os.path.basename(input_path)} (recompresión)")
                print(f"  {width}x{height} (sin cambio)")
                print(f"  {original_size//1024}KB → {new_size//1024}KB (ahorro: {saved//1024}KB / {saved_percent:.1f}%)")
            else:
                print(f"○ {os.path.basename(input_path)} - ya óptimo ({width}x{height}, {original_size//1024}KB)")
        
        return True
        
    except Exception as e:
        print(f"✗ Error con {input_path}: {e}")
        return False

def main():
    print("=" * 70)
    print("OPTIMIZACIÓN DE IMÁGENES WEBP - ALTA CALIDAD")
    print("=" * 70)
    print()
    
    total_before = 0
    total_after = 0
    processed = 0
    
    # 1. Imagen principal (std.webp) - Reducir a 960px manteniendo calidad 90
    print("📸 IMAGEN PRINCIPAL:")
    print("-" * 70)
    img_path = 'assets/images/std.webp'
    if os.path.exists(img_path):
        size_before = os.path.getsize(img_path)
        total_before += size_before
        optimize_webp(img_path, max_width=960, max_height=960, quality=90)
        total_after += os.path.getsize(img_path)
        processed += 1
        print()
    
    # 2. Imagen de fondo (atardecer.webp) - Reducir a 1920px calidad 88
    print("🌅 IMAGEN DE FONDO:")
    print("-" * 70)
    bg_path = 'assets/images/atardecer.webp'
    if os.path.exists(bg_path):
        size_before = os.path.getsize(bg_path)
        total_before += size_before
        optimize_webp(bg_path, max_width=1920, max_height=1920, quality=88)
        total_after += os.path.getsize(bg_path)
        processed += 1
        print()
    
    # 3. Fotos de perfil (cewe.webp, pablo.webp) - 600px calidad 90
    print("👤 FOTOS DE PERFIL:")
    print("-" * 70)
    for name in ['cewe.webp', 'pablo.webp']:
        profile_path = f'assets/images/{name}'
        if os.path.exists(profile_path):
            size_before = os.path.getsize(profile_path)
            total_before += size_before
            optimize_webp(profile_path, max_width=600, max_height=600, quality=90)
            total_after += os.path.getsize(profile_path)
            processed += 1
    print()
    
    # 4. Otros (dylan.webp, placeholder.webp) - mantener pequeños
    print("🖼️  OTRAS IMÁGENES:")
    print("-" * 70)
    for name in ['dylan.webp', 'placeholder.webp']:
        other_path = f'assets/images/{name}'
        if os.path.exists(other_path):
            size_before = os.path.getsize(other_path)
            total_before += size_before
            optimize_webp(other_path, max_width=400, max_height=400, quality=88)
            total_after += os.path.getsize(other_path)
            processed += 1
    print()
    
    # 5. Galería de fotos - Reducir a 1200px máximo, calidad 85
    print("🖼️  GALERÍA (desktop/):")
    print("-" * 70)
    gallery_dir = 'assets/images/desktop'
    if os.path.exists(gallery_dir):
        gallery_files = sorted([f for f in os.listdir(gallery_dir) if f.endswith('.webp')])
        for filename in gallery_files:
            filepath = os.path.join(gallery_dir, filename)
            size_before = os.path.getsize(filepath)
            total_before += size_before
            optimize_webp(filepath, max_width=1200, max_height=900, quality=85)
            total_after += os.path.getsize(filepath)
            processed += 1
    
    # Resumen final
    print()
    print("=" * 70)
    print("RESUMEN DE OPTIMIZACIÓN")
    print("=" * 70)
    print(f"Archivos procesados: {processed}")
    print(f"Tamaño antes:  {total_before / (1024*1024):.2f} MB")
    print(f"Tamaño después: {total_after / (1024*1024):.2f} MB")
    saved_mb = (total_before - total_after) / (1024*1024)
    saved_percent = ((total_before - total_after) / total_before * 100) if total_before > 0 else 0
    print(f"Ahorro total:  {saved_mb:.2f} MB ({saved_percent:.1f}%)")
    print()
    print("✅ Optimización completada con éxito!")
    print("   Calidad visual mantenida al máximo (85-90% WebP)")
    print()

if __name__ == '__main__':
    if not os.path.exists('assets/images'):
        print("Error: No se encuentra la carpeta assets/images/")
        print("Ejecuta este script desde la raíz del proyecto")
        sys.exit(1)
    
    main()
