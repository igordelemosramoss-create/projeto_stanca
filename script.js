const WHATSAPP_NUM = '5554984071736';
const EMAIL_EMPRESA = 'stanca.imp@gmail.com';

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enviarEmail() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const tel = document.getElementById('tel').value.trim();
  const servico = document.getElementById('servico').value;
  const msg = document.getElementById('msg').value.trim();

  if (!nome || !email) {
    alert('Por favor, preencha pelo menos nome e e-mail.');
    return;
  }

  const subject = encodeURIComponent('Solicitação de Orçamento - Stanca Impermeabilizações');
  const body = encodeURIComponent(
    `Nome: ${nome}\nE-mail do cliente: ${email}\nTelefone: ${tel || 'Não informado'}\nServiço: ${servico || 'Não selecionado'}\n\nMensagem:\n${msg || 'Sem detalhes adicionais.'}`
  );

  window.location.href = `mailto:${EMAIL_EMPRESA}?subject=${subject}&body=${body}`;
  document.getElementById('successMsg').style.display = 'block';
}

function abrirWhatsapp() {
  const texto = 'Olá! Gostaria de solicitar um orçamento com a Stanca Impermeabilizações.';
  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(texto)}`, '_blank');
}

function abrirWhatsappOrcamento() {
  const nome = document.getElementById('nome').value.trim();
  const servico = document.getElementById('servico').value;
  const msg = document.getElementById('msg').value.trim();

  let texto = 'Olá! Gostaria de solicitar um orçamento.';
  if (nome) texto += ` Me chamo ${nome}.`;
  if (servico) texto += ` Preciso de: ${servico}.`;
  if (msg) texto += ` Detalhes: ${msg}`;

  window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(texto)}`, '_blank');
}
