function soma(a, b, callback) {
  const resultado = a + b;
  callback(resultado);
}

soma(3, 4, (resultado) => {
  console.log('Resultado da soma:', resultado);
});
