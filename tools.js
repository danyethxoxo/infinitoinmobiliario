const money = value => new Intl.NumberFormat('es-MX', {style:'currency',currency:'MXN',maximumFractionDigits:0}).format(value);
const form = document.querySelector('#isr-form');
form?.addEventListener('submit', async event => {
  event.preventDefault();
  const result = document.querySelector('#isr-result');
  const data = new FormData(form);
  const price = Number(data.get('price'));
  if (!Number.isFinite(price) || price <= 0) return;
  result.hidden = false;
  let note = '';
  try {
    const response = await fetch('udi-oficial.json', {cache:'no-store'});
    if (!response.ok) throw new Error('UDI unavailable');
    const udi = await response.json();
    const date = udi.date ? new Date(`${udi.date}T12:00:00`) : null;
    if (udi.value > 0 && date && !Number.isNaN(date.getTime()) && date <= new Date()) {
      const cap = 700000 * udi.value;
      note = `<p>Cálculo de referencia con valor de UDI al ${new Intl.DateTimeFormat('es-MX').format(date)}: <strong>${money(cap)}</strong> por 700,000 UDIS. <a href="${udi.source}">Fuente oficial: Banco de México</a>.</p>`;
      if (data.get('home') === 'yes' && data.get('prior') === 'no')
        note += price <= cap
          ? '<p>El precio indicado está dentro del límite de referencia. La operación podría cumplir el requisito de monto para exención total.</p>'
          : `<p>El precio supera el límite. Esto no elimina toda la exención; el excedente representa aproximadamente ${new Intl.NumberFormat('es-MX',{style:'percent',maximumFractionDigits:1}).format((price-cap)/price)} del precio. El notario determinará la ganancia gravable y las deducciones proporcionales.</p>`;
    } else {
      note = '<p>El valor diario oficial de la UDI aún no está cargado o confirmado. Por eso no mostramos un tope en pesos ni una conclusión basada en el monto. <a href="https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?accion=consultarCuadro&idCuadro=CP150&locale=es&sector=26">Consulta la UDI en Banco de México</a>.</p>';
    }
  } catch {
    note = '<p>No fue posible consultar el valor verificado de la UDI. El límite de referencia es 700,000 UDIS; consulta el valor de la fecha de firma con el notario.</p>';
  }
  const eligibility = data.get('home') !== 'yes'
    ? '<strong>Tu caso requiere revisión individual.</strong><p>La exención consultada se refiere a la casa habitación acreditable.</p>'
    : data.get('prior') === 'yes'
      ? '<strong>No se cumple la condición de tres años.</strong><p>Si ya aplicaste esta exención durante los tres años anteriores, consulta con el notario el ISR que corresponda.</p>'
      : '<strong>Posible candidatura a exención.</strong><p>La acreditación de casa habitación y la operación deben revisarse ante fedatario público.</p>';
  result.innerHTML = eligibility + note + '<p>Cálculo estimado con fines informativos; la liquidación definitiva siempre la determina el notario público al día de la firma.</p><p><a href="contacto.html">¿Qué documentos y facturas conviene revisar antes de vender? Continúa con Almendra.</a></p>';
});

document.querySelectorAll('.faq-tab').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.faq-tab').forEach(tab => {
    const active = tab === button;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.faq-panel').forEach(panel => panel.hidden = panel.dataset.faqPanel !== button.dataset.faq);
}));

const pathForm = document.querySelector('#path-form');
if (pathForm) {
  const first = document.querySelector('#path-first');
  const second = document.querySelector('#path-second');
  const third = document.querySelector('#path-third');
  const pathResult = document.querySelector('#path-result');
  const paths = {
    comprar: [
      '<label>Presupuesto máximo aproximado (MXN)<input name="budget" type="number" min="1" step="1" inputmode="numeric" required placeholder="Tu presupuesto"></label>',
      '<label>¿Cómo planeas pagar?<select name="credit" required><option value="">Selecciona</option><option value="bancario">Crédito bancario</option><option value="infonavit">Infonavit o Cofinavit</option><option value="contado">Recursos propios</option></select></label>',
      '<label>Alcaldía o zona que te interesa<input name="zone" maxlength="80" required placeholder="Ej. Coyoacán"></label>'
    ],
    vender: [
      '<label>Colonia del inmueble<input name="colony" maxlength="80" required placeholder="Ej. Del Valle"></label>',
      '<label>Superficie construida aproximada (m²)<input name="area" type="number" min="1" step="1" required placeholder="Ej. 95"></label><label>Recámaras<select name="rooms" required><option value="">Selecciona</option><option>1</option><option>2</option><option>3</option><option>4 o más</option></select></label>',
      '<label>Situación documental<select name="deed" required><option value="">Selecciona</option><option value="inscrita">Escritura inscrita</option><option value="hipoteca">Hipoteca vigente</option><option value="sucesion">Sucesión o herencia en trámite</option><option value="revisar">Necesito revisarlo</option></select></label>'
    ],
    rentar: [
      '<label>¿Cuál es tu papel?<select name="role" required><option value="">Selecciona</option><option value="propietario">Soy propietario</option><option value="inquilino">Busco rentar</option></select></label>',
      '<label>Zona principal<input name="rentzone" maxlength="80" required placeholder="Alcaldía o colonia"></label>',
      '<label>¿Qué te preocupa más?<select name="concern" required><option value="">Selecciona</option><option value="documentos">Documentos y requisitos</option><option value="tiempo">Tiempo para concretar</option><option value="seguridad">Seguridad de la operación</option></select></label>'
    ]
  };
  let currentPath = 'comprar';
  let step = 1;
  function renderPath() {
    [first.innerHTML, second.innerHTML, third.innerHTML] = paths[currentPath];
    document.querySelectorAll('.path-step').forEach(fieldset => fieldset.hidden = Number(fieldset.dataset.step) !== step);
    pathResult.hidden = true;
  }
  document.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click', () => {
    currentPath = button.dataset.path;
    step = 1;
    document.querySelectorAll('[data-path]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    renderPath();
  }));
  pathForm.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
    const active = pathForm.querySelector(`.path-step[data-step="${step}"]`);
    if (![...active.querySelectorAll('input, select')].every(input => input.reportValidity())) return;
    step = Math.min(step + 1, 3);
    renderPathStep();
  }));
  pathForm.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => {
    step = Math.max(step - 1, 1);
    renderPathStep();
  }));
  function renderPathStep() {
    document.querySelectorAll('.path-step').forEach(fieldset => fieldset.hidden = Number(fieldset.dataset.step) !== step);
    pathForm.querySelector(`.path-step[data-step="${step}"]`)?.scrollIntoView({behavior:'smooth',block:'center'});
  }
  pathForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(pathForm);
    let message = '';
    if (currentPath === 'comprar') {
      message = `<strong>Tu búsqueda empieza por capacidad de compra y zona.</strong><p>Presupuesto indicado: ${money(Number(data.get('budget')))}. Forma de pago: ${data.get('credit')}. Zona de interés: ${escapeHtml(data.get('zone'))}. Antes de elegir inmueble, confirma preaprobación, enganche y gastos de escrituración con fuentes vigentes.</p><a href="herramientas.html#escrituracion">Revisa los costos de escrituración</a> · <a href="guia-credito-hipotecario.html">Lee la guía de crédito</a>`;
    } else if (currentPath === 'vender') {
      message = `<strong>El siguiente paso es un estudio comparativo, no una cifra automática.</strong><p>Colonia: ${escapeHtml(data.get('colony'))}; superficie: ${Number(data.get('area'))} m²; recámaras: ${escapeHtml(data.get('rooms'))}. Situación documental: ${escapeHtml(data.get('deed'))}. Reúne escritura, información física y comparables recientes para revisar precio y tiempos.</p><a href="herramientas.html#isr">Revisa posible exención ISR</a> · <a href="guia-casa-heredada-hipoteca.html">Casos especiales</a>`;
    } else {
      const role = data.get('role') === 'propietario' ? 'propietario' : 'inquilino';
      message = `<strong>Ruta de renta para ${role}.</strong><p>Zona: ${escapeHtml(data.get('rentzone'))}. Prioridad: ${escapeHtml(data.get('concern'))}. Revisa condiciones, documentos, estado del inmueble y contrato antes de comprometer recursos.</p><a href="guia-renta-segura.html">Abrir checklist de renta</a>`;
    }
    pathResult.innerHTML = message + '<p>Esta orientación no constituye valuación, aprobación de crédito ni dictamen jurídico.</p>';
    pathResult.hidden = false;
    pathResult.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  renderPath();
}
function escapeHtml(value) {
  return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
}
