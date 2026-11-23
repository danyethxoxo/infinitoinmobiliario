import fs from 'node:fs';

const read = file => fs.readFileSync(file, 'utf8');
const write = (file, html) => fs.writeFileSync(file, html);
const inject = (file, marker, addition) => {
  const html = read(file);
  if (!html.includes(marker)) throw new Error(`Missing insertion marker in ${file}`);
  write(file, html.replace(marker, addition + marker));
};
const disclaimer = 'Cálculo estimado con fines informativos; la liquidación definitiva siempre la determina el notario público al día de la firma.';

inject('index.html', '</main>', `
<section class="content shell editorial-strip" aria-label="Herramientas para decidir"><div><p class="eyebrow">Herramientas útiles</p><h2>Entender antes de <em>decidir.</em></h2><p>Revisa las variables de una compra, los costos que intervienen en una escritura y el diagnóstico inicial de ISR al vender.</p></div><div class="editorial-actions"><a class="text-link" href="herramientas.html#escrituracion">Gastos de escrituración</a><a class="text-link" href="herramientas.html#isr">Diagnóstico de ISR</a><a class="text-link" href="propiedades.html#zonas">Explorar zonas</a></div></section>
<section class="content shell trust-strip"><p class="eyebrow">KW Premier | Keller Williams</p><h2>Una red comercial. Un proceso claro.</h2><p>Almendra trabaja con análisis comparativo de mercado, alcance mediante la red de agentes y portales, seguimiento de prospectos y coordinación con especialistas. La revisión jurídica y la formalización corresponden al notario público y a las autoridades registrales.</p><a class="text-link" href="conoceme.html">Conoce su método</a></section>`);

inject('conoceme.html', '</main>', `
<section class="content shell"><p class="eyebrow">Manifiesto de trabajo</p><h2>Lo que puedes esperar</h2><div class="manifesto-grid">
<article><span>01</span><h3>Una conversación honesta</h3><p>Empezamos por tus motivos, presupuesto, tiempos y límites. Si una operación tiene un riesgo o un costo relevante, debe ponerse sobre la mesa.</p></article>
<article><span>02</span><h3>Precio con sustento</h3><p>Una recomendación de precio se construye con inmuebles comparables, estado físico, ubicación, competencia activa y respuesta del mercado. No es una promesa de venta.</p></article>
<article><span>03</span><h3>Seguimiento visible</h3><p>La comercialización requiere presentación, difusión, filtrado de interesados, registro de visitas y revisión periódica de resultados.</p></article>
<article><span>04</span><h3>Especialistas cuando hacen falta</h3><p>La oficina puede vincular con notarios, valuadores y brókers hipotecarios. Cada especialista determina lo que corresponde a su ámbito profesional.</p></article>
</div></section>`);

inject('propiedades.html', '</main>', `
<section class="content shell" id="zonas"><p class="eyebrow">Mapa de exploración</p><h2>La zona cambia la decisión.</h2><p>El futuro mapa permitirá explorar inmuebles por alcaldía y colonia, junto con transporte, servicios y contexto de mercado. Activaremos cada capa cuando existan datos vigentes y fuentes identificables. Mientras tanto, estas guías ayudan a comparar ubicaciones.</p><div class="guide-grid"><a href="guia-comprar-rentar-cdmx.html">Comprar o rentar por zona <span>↗</span></a><a href="guia-plusvalia-colonias-cdmx.html">Cómo evaluar la plusvalía <span>↗</span></a><a href="necesitas.html#comprar">Definir mi búsqueda <span>↗</span></a></div></section>`);

inject('necesitas.html', '</main>', `
<section class="content shell" id="diagnostico"><p class="eyebrow">30 segundos para ordenar tus ideas</p><h2>Microdiagnóstico</h2><div class="diagnosis-switch" role="group" aria-label="Selecciona una ruta"><button type="button" data-path="comprar" class="active" aria-pressed="true">Comprar</button><button type="button" data-path="vender" aria-pressed="false">Vender</button><button type="button" data-path="rentar" aria-pressed="false">Rentar</button></div>
<form id="path-form" class="path-form">
 <fieldset class="path-step" data-step="1"><legend>01 / Tu intención</legend><div id="path-first"></div><button class="action-button" type="button" data-next>Continuar →</button></fieldset>
 <fieldset class="path-step" data-step="2" hidden><legend>02 / Tu contexto</legend><div id="path-second"></div><div class="step-actions"><button type="button" data-back>← Volver</button><button class="action-button" type="button" data-next>Continuar →</button></div></fieldset>
 <fieldset class="path-step" data-step="3" hidden><legend>03 / Lo que sigue</legend><div id="path-third"></div><div class="step-actions"><button type="button" data-back>← Volver</button><button class="action-button" type="submit">Ver orientación</button></div></fieldset>
</form><div id="path-result" class="notice" role="status" aria-live="polite" hidden></div><p class="legal-note">La orientación inicial no constituye valuación, aprobación de crédito ni revisión legal.</p></section>`);

inject('herramientas.html', '<section class="content shell" id="isr">', `
<section class="content shell" id="jornada"><p class="eyebrow">CDMX · 2026</p><h2>¿Qué entra en una escritura?</h2><p>La base del impuesto de adquisición puede requerir comparar precio, valor catastral y avalúo. El notario define la base aplicable al expediente. La herramienta desglosará estos cinco conceptos cuando estén verificados sus parámetros:</p><div class="feature-list">
<div class="feature"><b>01</b><h3>ISAI</h3><p>Impuesto de adquisición calculado con tarifa progresiva vigente, no con una tasa única.</p></div>
<div class="feature"><b>02</b><h3>Notaría</h3><p>Honorarios y el IVA que corresponda a los servicios gravados.</p></div>
<div class="feature"><b>03</b><h3>Registro</h3><p>Derechos de inscripción y actos registrales aplicables.</p></div>
<div class="feature"><b>04</b><h3>Avalúo</h3><p>Costo del avalúo requerido por la operación o el financiamiento.</p></div>
<div class="feature"><b>05</b><h3>Constancias</h3><p>Certificados y comprobantes que exija el expediente.</p></div>
</div><div class="notice"><strong>Jornada Notarial</strong><p>La elegibilidad y el porcentaje de reducción dependen del valor catastral, del uso y de las reglas oficiales vigentes. No aplicamos descuentos al total de la escritura sin identificar primero qué conceptos son objeto de reducción. También existe una ruta específica para sucesiones; se revisará con un notario.</p><p>Fuente y fecha de tarifa: pendientes de verificación oficial. ${disclaimer}</p></div></section>`);

inject('herramientas.html', '</main>', `
<section class="content shell"><p class="eyebrow">Para vendedores</p><h2>Si la venta causa ISR</h2><p>El precio de venta no es por sí solo la ganancia gravable. El notario revisa el costo de adquisición actualizado, inversiones en construcción o mejoras comprobables, gastos notariales, impuestos, derechos y comisiones deducibles conforme a la ley. La documentación y las fechas importan.</p><p>En ciertos casos, la ganancia se divide entre los años transcurridos desde la adquisición, hasta el límite legal de 20 años, para el cálculo correspondiente. El diagnóstico de arriba identifica preguntas iniciales; no calcula la retención.</p><p class="source-note">Consulta <a href="https://wwwmat.sat.gob.mx/articulo/31901/articulo-120">SAT, artículo 120 LISR</a> y <a href="https://wwwmat.sat.gob.mx/articulo/31968/articulo-121">SAT, artículo 121 LISR</a>.</p><a class="text-link" href="contacto.html">Revisar el caso con Almendra</a></section>
<section class="content shell"><h2>Guías para cada decisión</h2><p>Lecturas cortas con pasos concretos. Evitamos promedios de precio o plusvalía sin periodo y fuente.</p><div class="guide-grid">
<a href="guia-comprar-rentar-cdmx.html">Comprar o rentar en CDMX <span>↗</span></a>
<a href="guia-fraudes-inmobiliarios.html">Cómo reducir riesgos de fraude <span>↗</span></a>
<a href="guia-credito-hipotecario.html">Infonavit, Cofinavit y banco <span>↗</span></a>
<a href="guia-renta-segura.html">Rentar una propiedad con orden <span>↗</span></a>
<a href="guia-plusvalia-colonias-cdmx.html">Cómo comparar colonias <span>↗</span></a>
<a href="guia-casa-heredada-hipoteca.html">Vender una casa heredada o hipotecada <span>↗</span></a>
</div></section>`);

const faqStart = '<section class="content shell" id="faq">';
const faqPage = read('contacto.html');
const start = faqPage.indexOf(faqStart);
const end = faqPage.indexOf('</section>', start) + '</section>'.length;
if (start < 0 || end < start) throw new Error('FAQ section missing');
const faq = [
 ['proceso','¿Cuánto cobra una inmobiliaria por vender mi casa?','La comisión se acuerda por escrito; no existe una tarifa única aplicable a todas las operaciones. Revisa quién la paga, qué servicios incluye, cómo se comparte entre agentes y cuándo se causa.','necesitas.html#vender','Prepara tu ruta de venta'],
 ['proceso','¿Qué documentos necesito para vender o comprar en CDMX?','Para comenzar: escritura inscrita, identificación, datos fiscales, boletas de predial y agua, y certificado de libertad de gravamen. El notario confirmará el expediente específico y su vigencia.','guia-fraudes-inmobiliarios.html','Revisa el checklist documental'],
 ['proceso','¿Quién paga ISR y escrituración?','Por regla general, el vendedor revisa su ISR y el comprador cubre adquisición y escrituración. La exención, impuestos y derechos definitivos dependen de la operación y los determina el fedatario.','herramientas.html#isr','Haz el diagnóstico ISR'],
 ['proceso','¿Puedo vender una casa con hipoteca vigente?','Sí, puede acordarse el pago del saldo y la cancelación de la hipoteca dentro del cierre. El banco, comprador y notario deben coordinar el procedimiento y los documentos.','guia-casa-heredada-hipoteca.html','Lee la guía'],
 ['proceso','¿Qué pasa si no inscribo la compraventa en el Registro Público?','La inscripción es clave para que el derecho adquirido tenga publicidad y pueda oponerse frente a terceros. Pide al notario confirmar el trámite y su constancia.','guia-fraudes-inmobiliarios.html','Consulta las verificaciones'],
 ['incomodas','¿Por qué me proponen una exclusiva?','Una exclusiva define responsable, plazo, inversión comercial, seguimiento y condiciones de terminación. Su utilidad depende de que esos compromisos estén claros y se cumplan; pide revisar el contrato antes de firmar.','necesitas.html#vender','Evalúa tu estrategia'],
 ['incomodas','¿Por qué contratar a una asesora si puedo publicar gratis?','Publicar un anuncio no resuelve por sí solo la valuación, el filtrado de interesados, la seguridad de las visitas ni la preparación documental. Una asesora puede coordinar esas tareas y mostrarte resultados.','conoceme.html','Conoce el método'],
 ['incomodas','¿Qué pasa si mi propiedad no se vende en 90 días?','Se revisan precio frente a comparables, visitas, comentarios, calidad de presentación y difusión. El ajuste se acuerda con datos; ningún plazo de venta está garantizado.','necesitas.html#vender','Solicita un análisis comparativo']
];
const makeDetails = group => faq.filter(([category]) => category === group).map(([,question,answer,href,label]) => `<details><summary>${question}</summary><p>${answer} <a href="${href}">${label}.</a></p></details>`).join('');
const replacement = `<section class="content shell" id="faq"><h2>Preguntas frecuentes</h2><p>Respuestas directas para anticipar dudas. Cada operación requiere revisar sus documentos y condiciones.</p><div class="faq-tabs" role="group" aria-label="Categorías de preguntas"><button class="faq-tab active" type="button" data-faq="proceso" aria-pressed="true">Dudas del proceso</button><button class="faq-tab" type="button" data-faq="incomodas" aria-pressed="false">Preguntas incómodas</button></div><div class="faq-panel" data-faq-panel="proceso">${makeDetails('proceso')}</div><div class="faq-panel" data-faq-panel="incomodas" hidden>${makeDetails('incomodas')}</div></section>`;
const faqSchema = {
 '@context':'https://schema.org','@type':'FAQPage',
 mainEntity:faq.map(([,name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))
};
write('contacto.html',(faqPage.slice(0,start) + replacement + faqPage.slice(end)).replace('</head>',`<script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head>`));
inject('contacto.html','</main>',`<section class="content shell"><p class="eyebrow">Experiencias reales</p><h2>Tu opinión también ayuda.</h2><p>Las reseñas sobre asesorías, recorridos o estudios de mercado pueden contar cómo fue la atención, incluso antes de cerrar una compraventa. Solo publicaremos opiniones auténticas con permiso de sus autores.</p><div class="notice"><strong>Enlace de reseñas en preparación</strong><p>El acceso a Google Business Profile se añadirá cuando el perfil de Almendra esté creado y verificado. No mostramos testimonios inventados.</p></div></section>`);

const agentSchema = {'@context':'https://schema.org','@type':'RealEstateAgent',name:'Almendra Núñez · Infinito Inmobiliario',url:'https://infinitoinmobiliario.com/',description:'Asesoría inmobiliaria en CDMX con metodología, tecnología y red comercial de KW Premier | Keller Williams.',areaServed:{'@type':'AdministrativeArea',name:'Ciudad de México'}};
for(const file of ['index.html','conoceme.html']){
  write(file,read(file).replace('</head>',`<script type="application/ld+json">${JSON.stringify(agentSchema)}</script></head>`));
}

const guides = [
 {slug:'guia-comprar-rentar-cdmx',title:'¿Comprar o rentar en CDMX?',intro:'Compara horizonte, liquidez y costo total antes de decidir por colonia.',sections:[
  ['¿Qué comparar primero?','El precio de compra no equivale al costo mensual. Revisa enganche, crédito, escrituración, mantenimiento, predial y reparaciones; para renta, depósito, póliza, mudanza y aumentos contractuales.'],
  ['¿Cómo cambia por alcaldía?','Haz la comparación con inmuebles realmente comparables en la colonia y el periodo de búsqueda. Benito Juárez, Coyoacán, Cuauhtémoc y Tlalpan contienen micromercados muy distintos; un promedio de alcaldía puede ocultar diferencias de calle, estado y tipología.'],
  ['¿Cuándo conviene pedir ayuda?','Si piensas quedarte varios años, compara el costo total y el capital que inmovilizas. Si valoras flexibilidad, incorpora el costo de oportunidad del enganche. Usa el diagnóstico para ordenar presupuesto y zona.'] ],source:null},
 {slug:'guia-fraudes-inmobiliarios',title:'¿Cómo reducir riesgos de fraude inmobiliario?',intro:'Una lista de verificaciones antes de entregar anticipos o firmar.',sections:[
  ['¿Qué verificar del inmueble?','Solicita escritura, datos de inscripción, identidad y facultades de quien vende. Pide al notario revisar el certificado de libertad de gravamen y el historial registral que corresponda.'],
  ['¿Qué señales exigen detenerse?','Precio extraordinariamente bajo sin explicación, presión por depositar de inmediato, negativa a mostrar documentos, intermediarios que no acreditan facultades y operaciones de remate o cesión de derechos presentadas como compra ordinaria.'],
  ['¿Cómo proteger el anticipo?','No entregues recursos sin identificar al titular, la cuenta receptora, el inmueble, las condiciones de devolución y la revisión notarial. La documentación de cada caso debe validarse antes de comprometerte.'] ],source:null},
 {slug:'guia-credito-hipotecario',title:'Crédito hipotecario: Infonavit, Cofinavit o banco',intro:'La preaprobación te ayuda a buscar dentro de una capacidad de pago real.',sections:[
  ['¿Qué cambia entre opciones?','Un crédito bancario se evalúa con ingreso, historial y condiciones del banco. Infonavit depende de elegibilidad y condiciones del instituto. Cofinavit combina financiamiento de Infonavit y una entidad financiera; confirma las reglas vigentes de cada producto.'],
  ['¿Qué gastos iniciales debo prever?','Además del enganche, considera avalúo, investigación, escrituración y posibles comisiones o seguros. Solicita una oferta escrita y compara costo anual total, plazo, pagos y penalizaciones.'],
  ['¿Por qué preaprobar antes de visitar?','La precalificación aclara presupuesto, mensualidad y documentos faltantes. Evita apartar una propiedad que no puedes financiar en los términos esperados.'] ],source:'https://portalmx.infonavit.org.mx/wps/portal/infonavitmx/mx2/derechohabientes/quiero_credito/quiero_comprar/'},
 {slug:'guia-renta-segura',title:'Rentar una propiedad con orden en CDMX',intro:'Una guía inicial para propietarios e inquilinos.',sections:[
  ['¿Qué revisar antes de anunciar?','Confirma titularidad, estado físico, inventario, servicios, reglamento del edificio y condiciones de entrega. La renta objetivo debe contrastarse con inmuebles comparables.'],
  ['¿Para qué sirve una póliza jurídica?','Puede incluir investigación del solicitante y apoyo en el contrato o recuperación, según la cobertura contratada. Compara exclusiones, costo, plazo y quién presta el servicio.'],
  ['¿Qué debe aclarar el contrato?','Monto, fecha de pago, depósito, duración, mantenimiento, reparaciones, terminación, incremento de renta y forma de devolver el inmueble. La regla legal vigente debe revisarse al firmar; evita usar un porcentaje de aumento sin fuente y fecha.'] ],source:null},
 {slug:'guia-plusvalia-colonias-cdmx',title:'¿Cómo evaluar la plusvalía de una colonia?',intro:'La plusvalía pasada no garantiza un aumento futuro.',sections:[
  ['¿Qué datos necesito?','Compara cierres verificables o avalúos, oferta activa, tiempo de comercialización, renta, vacancia, estado de edificios y proyectos urbanos con fecha y fuente.'],
  ['¿Por qué importa la microubicación?','Dos departamentos en la misma colonia pueden diferir por calle, ruido, transporte, mantenimiento, orientación y situación legal. Una cifra promedio por metro cuadrado no sustituye comparables directos.'],
  ['¿Qué zonas revisar?','Empieza por la zona que se ajuste a tu presupuesto y trayectos; después contrasta colonias y calles. La guía no asigna rankings de Benito Juárez, Coyoacán, Cuauhtémoc o Tlalpan sin una muestra actual comprobable.'] ],source:null},
 {slug:'guia-casa-heredada-hipoteca',title:'Vender una casa heredada o con hipoteca',intro:'Dos situaciones frecuentes que requieren ordenar documentos antes de fijar fecha de cierre.',sections:[
  ['¿Qué pasa con una herencia?','La sucesión debe identificar herederos y derechos sobre el inmueble. Antes de prometer la venta, consulta con notario el estado del trámite, la adjudicación, impuestos y registro.'],
  ['¿Y si aún hay crédito?','Solicita saldo y requisitos de cancelación al acreedor. Es posible coordinar liquidación y cancelación con la compraventa, si el banco y el notario aprueban el procedimiento concreto.'],
  ['¿Qué preparar para un estudio de mercado?','Ubicación, superficie, distribución, estado físico, escritura, situación sucesoria o hipotecaria y tiempos de los propietarios. El valor comercial debe sustentarse en comparables actuales.'] ],source:null}
];
const base = read('herramientas.html');
const header = base.slice(0,base.indexOf('<main>'));
const footer = base.slice(base.indexOf('</main>') + '</main>'.length);
for(const guide of guides){
 const sections=guide.sections.map(([question,answer])=>`<section class="guide-section"><h2>${question}</h2><p>${answer}</p></section>`).join('');
 const source=guide.source?`<p class="source-note">Fuente complementaria: <a href="${guide.source}">consulta oficial</a>.</p>`:'';
 const html=header.replace(/<title>[^<]*<\/title>/,`<title>${guide.title} | Almendra Núñez</title>`) + `<main class="guide-page shell"><p class="eyebrow">Guía · CDMX</p><h1>${guide.title}</h1><p class="guide-intro">${guide.intro}</p><p class="legal-note">Contenido orientativo. Confirma datos y reglas vigentes antes de una operación.</p><div class="guide-body">${sections}</div>${source}<div class="guide-end"><a class="text-link" href="necesitas.html">Iniciar diagnóstico</a><a class="text-link" href="herramientas.html">Todas las guías</a></div></main>`+footer;
 write(guide.slug+'.html',html);
}
