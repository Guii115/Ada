// Função para buscar os dados da API
function buscardados() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        // Demora de 2 segundos para receber os dados
        setTimeout(() => {
        exibirdados(data);
        }, 2000);
      });
  }
  
  function exibirdados(data) {
    const tableBody = document.querySelector('#data-table tbody');
    
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.completed ? 'Concluído' : 'Pendente'}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  buscardados();