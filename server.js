const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Suas credenciais do Google
const GOOGLE_API_KEY = 'AIzaSyCJKfeGc-aaF9aook4XYJOrbAjBSrdrmNo';
const GOOGLE_CSE_ID = '51fd4a1c0694f49a4';

app.post('/search', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Pergunta é obrigatória' });

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(question)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.json({ answer: 'Desculpe, não encontrei resultados para sua pergunta.' });
    }

    const results = data.items.slice(0, 3);
    const answer = results.map(item => `🔹 ${item.title}\n${item.snippet}`).join('\n\n');

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar na web.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
