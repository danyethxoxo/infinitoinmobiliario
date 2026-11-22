# Infinito Inmobiliario

Sitio independiente para una asesora inmobiliaria. Se publicará en GitHub Pages bajo `infinitoinmobiliario.com` y usará el proyecto Supabase `kwpremier web` (`iloetojomzqtadkithtv`) para consultar el inventario autorizado.

## Estado

Prototipo visual multipágina basado en la referencia Lumera y en el fondo animado proporcionado. La asesora titular, su fotografía, contacto y el filtro exacto de sus propiedades se definirán antes de activar el catálogo y los formularios.

## Desarrollo

`node scripts/build.mjs` genera las siete páginas HTML. El sitio se publica desde la raíz de `main` en GitHub Pages.

## Principios técnicos

- Separar los datos propios de este sitio de las tablas y permisos de KW Premier y Confort4.
- Mostrar solo inmuebles publicados y asociados a la asesora confirmada.
- Mantener claves privadas y datos de prospectos fuera del código público.
- Verificar las políticas RLS antes de cualquier lectura directa desde el navegador.
