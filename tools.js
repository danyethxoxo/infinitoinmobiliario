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
  result.innerHTML = eligibility + note + '<p>Cálculo estimado con fines informativos; la liquidación definitiva siempre la determina el notario público al día de la firma.</p>';
});

document.querySelectorAll('.faq-tab').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.faq-tab').forEach(tab => {
    const active = tab === button;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.faq-panel').forEach(panel => panel.hidden = panel.dataset.faqPanel !== button.dataset.faq);
}));
