const chatbox = document.getElementById('chatbox');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function adicionarMensagem(texto, classe) {
  const div = document.createElement('div');
  div.classList.add('message', classe);
  div.textContent = texto;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function buscarResposta(texto) {
  try {
    const res = await fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: texto }),
    });
    const data = await res.json();
    return data.answer || "Desculpe, não encontrei resposta para sua pergunta.";
  } catch {
    return "Erro ao conectar com o servidor.";
  }
}

chatForm.addEventListener('submit', async e => {
  e.preventDefault();

  const pergunta = userInput.value.trim();
  if (!pergunta) return;

  adicionarMensagem(pergunta, 'user');
  userInput.value = '';

  adicionarMensagem('Buscando resposta...', 'bot');

  const resposta = await buscarResposta(pergunta);

  const mensagens = document.querySelectorAll('.message.bot');
  mensagens[mensagens.length - 1].remove();

  adicionarMensagem(resposta, 'bot');
});
