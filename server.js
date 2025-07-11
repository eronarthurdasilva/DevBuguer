const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//server contato.hmtl na rota de contato 
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

//Processo formulario de contato 
app.post('/contato', (req, res) => {
    const {nome, email, assunto, mensagem} = req.body;
    res.send(`
        <h1>Contato recebido!</h1>
        <p>Obrigado, ${nome}.</p>
        <p>Email: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
        <a href="/">Voltar à página inicial</a>
    `);
});

//Processo de sugestão de lanches (get)
app.get('/sugestoes', (req, res) =>{
    const {nome, ingredientes} = req.query;
    res.send(`
        <h1>Obrigado pela sugestão!</h1>
        <p>Nome do lanche: ${nome}</p>
        <p>Ingredientes: ${ingredientes}</p>
        <a href="/">Voltar à página inicial</a>
    `);
});

//Server o Jsaon do cardápio na rota /api/lanches
app.get('/api/lanches', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'data', 'lanches.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo de lanches.' });
        }
        res.json(JSON.parse(data));
    });
});


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});