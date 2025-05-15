document.getElementById('cepForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const cep = document.getElementById('cep').value.replace(/\D/g, '');

  if (!/^[0-9]{8}$/.test(cep)) {
    alert('CEP inválido! Deve conter 8 números.');
    return;
  }

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = 'Buscando...';

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        resultadoDiv.innerHTML = '<p>CEP não encontrado.</p>';
      } else {
        resultadoDiv.innerHTML = `
          <p><strong>CEP:</strong> ${data.cep}</p>
          <p><strong>Rua:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado:</strong> ${data.uf}</p>
        `;
      }
    })
    .catch(() => {
      resultadoDiv.innerHTML = '<p>Erro ao consultar o CEP.</p>';
    });
});
