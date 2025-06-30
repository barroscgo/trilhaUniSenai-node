
async function buscarDados() {
  try {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const dados = await resposta.json();
    console.log('Dados recebidos:', dados);
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
  }
}

buscarDados();
