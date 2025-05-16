const express = require('express');
const app = express();
const fs = require('fs');
const { json } = require('stream/consumers');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // isso garante que ele olhe para a pasta views

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
  console.log('Request received !');
  res.render('index', { nome: 'Maria' });
});

// Passo 4: adicionar uma rota adicional para mostrar outra view dinâmica
app.get('/sobre', (req, res) => {

  const dados = {
    nome: 'João',
    idade: 30,
    cidade: 'São Paulo'
  };
  // Passando dados para a view
  res.render('sobre', { dados });
});

// Middleware para verificar se o usuário está autenticado
app.use((req, res, next) => {
  // Aqui você pode verificar se o usuário está autenticado
  // Por exemplo, verificando um token de autenticação ou uma sessão
  const isAuthenticated = true; // Substitua isso pela sua lógica de autenticação

  if (isAuthenticated) {
    next(); // Se o usuário estiver autenticado, continue para a próxima rota
  } else {
    res.status(401).send('Acesso não autorizado'); // Se não estiver autenticado, retorne um erro
  }
}
);

// Rota principal
app.get('/dashboard', (req, res) => {
  res.send('Bem vindo ao painel de controle!');
});

app.get('/main', (req, res) => {
  res.send('Página inicial aberta para todos!');
}
);

// Lendo um arquivo de forma assíncrona
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }
  console.log('Conteúdo do arquivo:', data);
}
);
// Lendo um arquivo de forma síncrona
try {
  const data = fs.readFileSync('data.txt', 'utf8');
  console.log('Conteúdo do arquivo (síncrono):', data);
}
catch (error) {
  console.error('Erro ao ler o arquivo:', error);
}

// Escrevendo um arquivo de forma assíncrona
const conteudo = 'Este é um novo conteúdo para o arquivo.';
fs.writeFile('data.txt', conteudo, (err) => {
  if (err) {
    console.error('Erro ao escrever no arquivo:', err);
    return;
  }
  console.log('Arquivo escrito com sucesso!');
}
);
// Escrevendo um arquivo de forma síncrona
try {
  fs.writeFileSync('saida_sync.txt', conteudo);
  console.log('Arquivo escrito com sucesso (síncrono)!');
}
catch (error) {
  console.error('Erro ao escrever no arquivo (síncrono):', error);
}

// Acrescentando conteúdo a um arquivo de forma assíncrona
const conteudoAdicional = '\nEste é um conteúdo adicional.';
fs.appendFile('data.txt', conteudoAdicional, (err) => {
  if (err) {
    console.error('Erro ao acrescentar conteúdo ao arquivo:', err);
    return;
  }
  console.log('Conteúdo acrescentado com sucesso!');
}
);
// Acrescentando conteúdo a um arquivo de forma síncrona
try {
  fs.appendFileSync('saida_sync.txt', conteudoAdicional);
  // console.log('Conteúdo acrescentado com sucesso (síncrono)!');
}
catch (error) {
  console.error('Erro ao acrescentar conteúdo ao arquivo (síncrono):', error);
}

// Criando um diretório de forma assíncrona
fs.mkdir('novo_diretorio', (err) => {
  if (err) {
    console.error('Erro ao criar diretório:', err);
    return;
  }
  // console.log('Diretório criado com sucesso!');
}
);
// Criando um diretório de forma síncrona
try {
  fs.mkdirSync('novo_diretorio_sync');
  // console.log('Diretório criado com sucesso (síncrono)!');
}
catch (error) {
  console.error('Erro ao criar diretório (síncrono):', error);
}
// Removendo um diretório de forma assíncrona
fs.rmdir('novo_diretorio', (err) => {
  if (err) {
    console.error('Erro ao remover diretório:', err);
    return;
  }
  // console.log('Diretório removido com sucesso!');
}
);
// Removendo um diretório de forma síncrona
try {
  fs.rmdirSync('novo_diretorio_sync');
  console.log('Diretório removido com sucesso (síncrono)!');
}
catch (error) {
  console.error('Erro ao remover diretório (síncrono):', error);
}

// Listando arquivos de um diretório
fs.readdir('./views', (err, files) => {
  if (err) {
    console.error('Erro ao ler diretório:', err);
    return;
  }
  console.log('Arquivos no diretório:', files);
}
);

// Lendo um arquivo JSON
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo JSON:', err);
    return;
  }
  const jsonData = JSON.parse(data); // converte o conteúdo JSON para um objeto JavaScript, isso é necessário para manipular os dados
  console.log('Conteúdo do arquivo JSON:', jsonData);
}
);

// Escrevendo um arquivo JSON
// const jsonConteudo = {
//   nome: 'Maria',
//   idade: 25,
//   cidade: 'Rio de Janeiro'
// };
// fs.writeFile('saida.json', JSON.stringify(jsonConteudo, null, 2), (err) => {
//   if (err) {
//     console.error('Erro ao escrever o arquivo JSON:', err);
//     return;
//   }
//   console.log('Arquivo JSON escrito com sucesso!');
// }
// );

// Manipulando os dados do JSON
// fs.readFile('saida.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Erro ao ler o arquivo JSON:', err);
//     return;
//   }

//   const jsonData = JSON.parse(data);
//   // modificando os dados
//   jsonData.idade = 40;
//   fs.writeFile('saida.json', JSON.stringify(jsonData, null, 2), (err) => {
//     if (err) {
//       console.error('Erro ao escrever o arquivo JSON:', err);
//       return;
//     }
//     console.log('Arquivo JSON atualizado com sucesso!');
//   });
// });

app.get('/json', (req, res) => {
  const jsonData = {
    nome: 'Maria',
    idade: 25,
    cidade: 'Rio de Janeiro'
  };
  res.json(jsonData);
})

// Passo 5: configurar a porta do servidor
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
