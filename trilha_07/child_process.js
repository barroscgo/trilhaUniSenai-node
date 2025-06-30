
const { exec } = require('child_process');

exec('ls', (erro, stdout, stderr) => {
  if (erro) {
    console.error('Erro:', erro.message);
    return;
  }
  if (stderr) {
    console.error('stderr:', stderr);
    return;
  }
  console.log('Resultado:\n', stdout);
});
