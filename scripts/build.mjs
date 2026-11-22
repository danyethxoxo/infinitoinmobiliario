import fs from 'node:fs';

const nav = [
  ['index.html', 'Inicio'],
  ['conoceme.html', 'Conóceme'],
  ['propiedades.html', 'Propiedades'],
  ['necesitas.html', '¿Qué necesitas?'],
  ['herramientas.html', 'Herramientas'],
  ['contacto.html', 'Contacto']
];
const brand = 'Almendra Núñez <span>•</span> Infinito Inmobiliario';
const support = 'Asesoría personalizada en bienes raíces en CDMX, respaldada por la metodología, tecnología y red comercial de KW Premier | Keller Williams.';
const disclaimer = 'Cálculo estimado con fines informativos; la liquidación definitiva siempre la determina el notario público al día de la firma.';
const pages = [
  {
    file:'index.html', title:'Inicio', eyebrow:'Almendra Núñez · CDMX',
    headline:'Decisiones inmobiliarias con <em>criterio.</em>',
    description:support,
    cta:'Descubre qué necesitas', href:'necesitas.html',
    body:`<section class="route-grid" aria-label="Explora el sitio">
      <a class="route-card reveal" href="necesitas.html#comprar"><span class="number">01 / COMPRAR</span><div><h2>Encuentra</h2><p>Comienza con tu presupuesto, tu zona y tus prioridades.</p></div></a>
      <a class="route-card reveal" href="necesitas.html#vender"><span class="number">02 / VENDER</span><div><h2>Valora</h2><p>Conoce cómo se prepara una estrategia de venta basada en comparables.</p></div></a>
      <a class="route-card reveal" href="herramientas.html"><span class="number">03 / ENTENDER</span><div><h2>Calcula</h2><p>Explora herramientas y guías antes de tomar una decisión.</p></div></a>
    </section>`
  },
  {
    file:'conoceme.html', title:'Conóceme', eyebrow:'Almendra Núñez',
    headline:'Acompañamiento con <em>método.</em>',
    description:'Mi trabajo empieza por entender tu objetivo, explicar las opciones con claridad y ordenar cada paso de la operación.',
    cta:'Explora las herramientas', href:'herramientas.html',
    body:`<section class="content shell"><h2>Mi forma de trabajar</h2><p>${support}</p><div class="feature-list">
      <div class="feature reveal"><b>01</b><h3>Transparencia</h3><p>Presentar datos, condiciones y riesgos para que puedas decidir con información.</p></div>
      <div class="feature reveal"><b>02</b><h3>Valuación real</h3><p>Comparar inmuebles y actividad de mercado antes de definir una estrategia comercial.</p></div>
      <div class="feature reveal"><b>03</b><h3>Proceso ordenado</h3><p>Dar seguimiento a prospectos, documentación y etapas de comercialización.</p></div>
    </div><p class="notice">La red de agentes y los portales amplían el alcance comercial. Cuando la operación lo requiere, coordinamos la vinculación con notarios, brókers hipotecarios y valuadores. La certeza jurídica del acto corresponde al notario público y a la validación registral.</p></section>`
  },
  {
    file:'propiedades.html', title:'Mis propiedades', eyebrow:'Inventario',
    headline:'Espacios para lo que <em>sigue.</em>',
    description:'Aquí se mostrarán los inmuebles vigentes asociados a Almendra Núñez una vez confirmado el identificador de inventario y sus permisos de publicación.',
    cta:'Definir mi búsqueda', href:'necesitas.html#comprar',
    body:`<section class="content shell"><h2>Selección en preparación</h2><p>El catálogo y el mapa por zona se activarán con datos verificados del inventario KW Premier. No publicamos fichas de ejemplo como si fueran propiedades disponibles.</p><a class="text-link" href="necesitas.html#comprar">Comenzar una búsqueda</a></section>`
  },
  {
    file:'necesitas.html', title:'¿Qué necesitas hoy?', eyebrow:'Tu punto de partida',
    headline:'Primero, entendamos <em>tu objetivo.</em>',
    description:'Elige la ruta que corresponde a tu momento. Cada una comienza con las preguntas que realmente cambian la decisión.',
    cta:'Ver herramientas', href:'herramientas.html',
    body:`<section class="content shell"><h2>Tres caminos</h2><div class="feature-list">
      <article class="feature reveal" id="comprar"><b>01 / COMPRAR</b><h3>¿Para qué zona te alcanza?</h3><p>Presupuesto, tipo de crédito y alcaldía deseada son el comienzo. La estimación de enganche y escrituración se habilitará cuando estén verificadas las tarifas oficiales.</p><a class="text-link" href="herramientas.html#escrituracion">Ver escrituración</a></article>
      <article class="feature reveal" id="vender"><b>02 / VENDER</b><h3>¿Cuánto vale tu propiedad?</h3><p>Colonia, superficie, distribución y situación documental permiten preparar un estudio comparativo de mercado; una cifra automática no sustituye ese estudio.</p><a class="text-link" href="herramientas.html#isr">Revisar posible exención ISR</a></article>
      <article class="feature reveal" id="rentar"><b>03 / RENTAR</b><h3>¿Cómo avanzar con claridad?</h3><p>Para propietarios: documentos, perfil del inquilino y póliza jurídica. Para inquilinos: requisitos, presupuesto y tiempos.</p><a class="text-link" href="contacto.html">Conocer el siguiente paso</a></article>
    </div></section>`
  },
  {
    file:'herramientas.html', title:'Herramientas y guías', eyebrow:'Información para decidir',
    headline:'Los números también cuentan <em>la historia.</em>',
    description:'Herramientas orientativas y guías para entender costos, impuestos y documentos antes de firmar.',
    cta:'Ir al simulador ISR', href:'#isr',
    body:`<section class="content shell" id="escrituracion"><h2>Escrituración CDMX</h2><div class="notice"><strong>Tarifas 2026 en verificación</strong><p>El cálculo de ISAI, derechos registrales y beneficios de Jornada Notarial se habilitará cuando confirmemos los parámetros en el Código Fiscal y la Gaceta Oficial vigentes. Aquí se mostrará la fecha exacta de cada fuente.</p><p>${disclaimer}</p></div></section>
    <section class="content shell" id="isr"><h2>Diagnóstico de exención ISR</h2><p>Responde tres preguntas para conocer qué revisar con el notario.</p>
      <form id="isr-form" class="diagnostic">
        <label>¿Es tu casa habitación y puedes acreditarlo?<select name="home" required><option value="">Selecciona</option><option value="yes">Sí</option><option value="no">No</option></select></label>
        <label>¿Aplicaste esta exención en los últimos 3 años?<select name="prior" required><option value="">Selecciona</option><option value="yes">Sí</option><option value="no">No</option></select></label>
        <label>Precio estimado de venta (MXN)<input name="price" type="number" min="1" step="1" inputmode="numeric" required placeholder="Ej. 4500000"></label>
        <button class="action-button" type="submit">Ver orientación</button>
      </form><div id="isr-result" class="notice" role="status" aria-live="polite" hidden></div>
      <p class="legal-note">${disclaimer} La exención requiere formalización ante fedatario público. El límite legal es 700,000 UDIS y no se fija en pesos: depende del valor oficial de la UDI de la fecha.</p>
      <p class="source-note">Fuentes: <a href="https://wwwmat.sat.gob.mx/articulo/15199/articulo-93">SAT, artículo 93 LISR</a> · <a href="https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CP150&locale=es&sector=26">Banco de México, valor de UDIS</a></p>
    </section>`
  },
  {
    file:'contacto.html', title:'Contacto', eyebrow:'Hablemos',
    headline:'Una buena decisión empieza con <em>una conversación.</em>',
    description:'Cuéntale a Almendra si quieres comprar, vender o rentar en CDMX.',
    cta:'Ver preguntas frecuentes', href:'#faq',
    body:`<section class="content shell"><h2>Contacto directo</h2><p>Estamos confirmando los canales públicos de Almendra. El formulario y WhatsApp contextual se habilitarán con sus datos oficiales.</p></section>
    <section class="content shell" id="faq"><h2>Preguntas frecuentes</h2><div class="faq-tabs" role="group" aria-label="Categorías de preguntas"><button class="faq-tab active" type="button" data-faq="proceso" aria-pressed="true">Dudas del proceso</button><button class="faq-tab" type="button" data-faq="incómodas" aria-pressed="false">Preguntas incómodas</button></div>
      <div class="faq-panel" data-faq-panel="proceso">
        <details><summary>¿Quién paga el ISR y los gastos de escrituración?</summary><p>En general, el vendedor revisa su ISR y el comprador cubre adquisición y escrituración. El notario determina los importes aplicables a la operación concreta. <a href="herramientas.html#isr">Revisa el diagnóstico ISR.</a></p></details>
        <details><summary>¿Qué documentos necesito para vender en CDMX?</summary><p>Empieza por escritura inscrita, identificación, datos fiscales y comprobantes de predial y agua. El expediente exacto depende del inmueble y lo revisa el notario. <a href="necesitas.html#vender">Inicia tu ruta de venta.</a></p></details>
        <details><summary>¿Puedo vender si aún tengo hipoteca?</summary><p>Sí puede estructurarse una venta con liquidación y cancelación de hipoteca durante el cierre, sujeta a las condiciones del acreedor y del notario. <a href="necesitas.html#vender">Prepara tu diagnóstico.</a></p></details>
      </div><div class="faq-panel" data-faq-panel="incómodas" hidden>
        <details><summary>¿Por qué trabajar con una asesora si puedo publicar gratis?</summary><p>Publicar es solo una parte: también hay que definir precio, filtrar interesados, preparar documentación y dar seguimiento. <a href="conoceme.html">Conoce la metodología de Almendra.</a></p></details>
        <details><summary>¿Por qué me proponen un contrato de exclusiva?</summary><p>Una exclusiva puede dar claridad sobre inversión comercial, responsabilidades y seguimiento. Sus términos se deben explicar y acordar antes de firmar. <a href="necesitas.html#vender">Revisa tu ruta de venta.</a></p></details>
        <details><summary>¿Qué pasa si mi propiedad no se vende en 90 días?</summary><p>Se revisan precio, visitas, respuesta del mercado y presentación para ajustar la estrategia. Los plazos y compromisos concretos deben constar en el acuerdo de servicio. <a href="necesitas.html#vender">Empieza con un estudio comparativo.</a></p></details>
      </div></section>`
  }
];
function escape(value){return value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')}
for(const page of pages){
  const links=nav.map(([url,label])=>`<a href="${url}"${page.file===url?' aria-current="page"':''}${url==='contacto.html'?' class="nav-cta"':''}>${label}</a>`).join('');
  const hero=`<section class="${page.file==='index.html'?'hero':'page-hero'} shell"><p class="eyebrow reveal">${page.eyebrow}</p><h1 class="reveal">${page.headline}</h1><div class="${page.file==='index.html'?'hero-bottom':'bottom subline'} reveal"><p>${page.description}</p><a class="text-link" href="${page.href}">${page.cta}</a></div></section>`;
  const html=`<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#050505"><meta name="robots" content="noindex"><meta name="description" content="${escape(page.description)}"><title>${page.title} | Almendra Núñez · Infinito Inmobiliario</title><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="motion.css"><link rel="stylesheet" href="content.css"><script defer src="site.js"></script><script defer src="tools.js"></script></head><body><header><a class="brand" href="index.html" aria-label="Almendra Núñez, inicio">INFINITO<span>•</span><br>INMOBILIARIO</a><button class="menu-button" aria-controls="site-nav" aria-expanded="false">Menú</button><nav id="site-nav" aria-label="Navegación principal">${links}</nav></header><main>${hero}${page.body}</main><footer><a class="brand" href="index.html">${brand}</a><small>Asesoría inmobiliaria en CDMX.</small><div class="links"><a href="conoceme.html">Conóceme</a><a href="herramientas.html">Herramientas</a><a href="contacto.html#faq">Preguntas frecuentes</a></div></footer></body></html>`;
  fs.writeFileSync(page.file,html);
}
for(const [oldPage,target] of [['comprar.html','necesitas.html#comprar'],['vender.html','necesitas.html#vender'],['rentar.html','necesitas.html#rentar'],['asesora.html','conoceme.html']]){
  fs.writeFileSync(oldPage,`<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><meta name="robots" content="noindex"><link rel="canonical" href="https://infinitoinmobiliario.com/${target}"><title>Redirigiendo | Infinito Inmobiliario</title></head><body><p>Esta sección cambió de dirección. <a href="${target}">Ir a la página actual</a>.</p></body></html>`);
}
