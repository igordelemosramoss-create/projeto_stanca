const WHATSAPP_NUM = '5554984071736';
const EMAIL_EMPRESA = 'stanca.imp@gmail.com';

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getServicosSelecionados() {
  const marcados = [...document.querySelectorAll('input[name="servico"]:checked')].map(i => i.value);
  const outro = document.getElementById('outroTexto').value.trim();
  return marcados.map(v => (v === 'Outro' && outro ? `Outro: ${outro}` : v));
}

document.addEventListener('change', (e) => {
  if (e.target.matches('input[name="servico"][value="Outro"]')) {
    const grupo = document.getElementById('outroGroup');
    const campo = document.getElementById('outroTexto');
    grupo.style.display = e.target.checked ? 'block' : 'none';
    campo.required = e.target.checked;
    if (!e.target.checked) campo.value = '';
  }
});

async function enviarOrcamento(e) {
  e.preventDefault();
  const btn = document.getElementById('btnEnviar');
  const ok = document.getElementById('successMsg');
  const erro = document.getElementById('errorMsg');
  ok.style.display = 'none';
  erro.style.display = 'none';

  if (document.getElementById('honey').value) return; // anti-spam

  const servicos = getServicosSelecionados();
  if (servicos.length === 0) {
    alert('Selecione pelo menos um tipo de serviço.');
    return;
  }

  const dados = {
    _subject: 'Novo pedido de orçamento - Stanca Impermeabilizações',
    _template: 'table',
    _captcha: 'false',
    Nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    Telefone: document.getElementById('tel').value.trim() || 'Não informado',
    Serviços: servicos.join(', '),
    Detalhes: document.getElementById('msg').value.trim() || 'Sem detalhes adicionais.'
  };

  btn.disabled = true;
  btn.textContent = 'Enviando...';
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${EMAIL_EMPRESA}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error('Falha no envio');
    ok.style.display = 'block';
    document.getElementById('orcForm').reset();
    document.getElementById('outroGroup').style.display = 'none';
  } catch (err) {
    erro.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar orçamento';
  }
}

function abrirWhatsapp() {
  const texto = 'Olá! Gostaria de solicitar um orçamento com a Stanca Impermeabilizações.';
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(texto)}`, '_blank');
}

function abrirWhatsappOrcamento() {
  const nome = document.getElementById('nome').value.trim();
  const servicos = getServicosSelecionados();
  const msg = document.getElementById('msg').value.trim();

  let texto = 'Olá! Gostaria de solicitar um orçamento.';
  if (nome) texto += ` Me chamo ${nome}.`;
  if (servicos.length) texto += ` Preciso de: ${servicos.join(', ')}.`;
  if (msg) texto += ` Detalhes: ${msg}`;

  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(texto)}`, '_blank');
}
