# Infinito Inmobiliario

Sitio independiente de Almendra Núñez para asesoría inmobiliaria en CDMX. Publicación en GitHub Pages con dominio infinitoinmobiliario.com.

## Páginas

Inicio, Conóceme, Propiedades, ¿Qué necesitas?, Herramientas y Contacto. Las rutas antiguas de Comprar, Vender, Rentar y Asesora redirigen a la nueva arquitectura.

`node scripts/build.mjs` genera el HTML principal y ejecuta `scripts/enrich.mjs` para incorporar guías, diagnósticos, FAQ y metadatos. `styles.css`, `motion.css` y `content.css` contienen la presentación; `site.js` y `tools.js` contienen interacciones.

Las seis guías cubren compra frente a renta, prevención de fraude, crédito hipotecario, renta, comparación de colonias y venta de inmuebles heredados o hipotecados. Los tres microdiagnósticos orientan sin presentar una valuación automática, una aprobación de crédito ni un dictamen legal. El contenido evita publicar precios por metro cuadrado sin muestra actual y fuente identificable.

## Datos fiscales

`tarifas-cdmx-2026.json` separa ISAI, RPP y Jornada Notarial del código. Los parámetros están vacíos hasta verificar el Código Fiscal y la Gaceta Oficial vigentes. `udi-oficial.json` conserva valor, fecha y fuente oficial de Banxico. El simulador de ISR multiplica 700,000 por el valor verificado de la UDI; mientras no exista un dato oficial cargado, no presenta tope en pesos.

El diagnóstico no determina ISR. El notario público revisa la exención, la ganancia, las deducciones y la retención definitiva.

## Publicación pendiente

El catálogo requiere el identificador de Almendra en el inventario KW Premier y verificación de permisos. Foto, video, WhatsApp, formulario y perfil de Google Business requieren datos autorizados. El sitio mantiene `noindex` mientras esas piezas están incompletas.
