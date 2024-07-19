const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Simulação de um banco de dados de contatos
const contatosDB = [
  {
    nome: 'Jose das Coves',
    segmento: 'Mercearia',
    email: 'teste1@gmail.com',
    informacao: 'Teste aaaa'
  }
];

// Endpoint para buscar contato por e-mail
app.get('/api/contatos', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'O parâmetro de consulta "email" é obrigatório.' });
  }
  
  const contatoIndex = contatosDB.findIndex(c => c.email === email);

  if (contatoIndex !== -1) {
    const contato = { ...contatosDB[contatoIndex], index: contatoIndex }; // Adiciona o índice ao objeto de contato
    res.json([contato]); // Retorna um array com o objeto de contato
  } else {
    res.status(404).json({ status: 'error', message: 'Nenhum contato encontrado para o e-mail fornecido.' });
  }
});



// Endpoint para receber dados do formulário via POST
app.post('/api/', (req, res) => {
  const formData = req.body;
  contatosDB.push(formData);
  console.log('Dados do formulário recebidos:', formData);
  res.json({ status: '201', message: 'Formulário recebido com sucesso.' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
