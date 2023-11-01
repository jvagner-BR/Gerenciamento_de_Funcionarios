let funcionarios = [];
let cargos = [];

function recarregarPagina() {
  location.reload();
}

function limparFuncionarios() {
  const funcionariosTableBody = document.getElementById(
    "funcionariosTableBody"
  );
  funcionariosTableBody.innerHTML = ""; // Remove todos os elementos dentro do tbody
}

function preencherFuncionarios() {
  limparFuncionarios(); // Limpa a tabela antes de preenchê-la novamente

  const funcionariosTableBody = document.getElementById(
    "funcionariosTableBody"
  );

  fetch("funcionarios.php")
    .then((response) => response.json())
    .then((data) => {
      funcionarios = data;

      funcionarios.forEach((funcionario) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td width="auto">${funcionario.id}</td>
          <td width="auto">${funcionario.nome}</td>
          <td width="auto">${funcionario.sobrenome}</td>
          <td width="auto">${funcionario.cargo}</td>
          <td width="auto">${funcionario.nascimento}</td>
          <td width="auto">${funcionario.salario}</td>
          <td width="auto">
            <button id="buttonTable" onclick="editarFuncionario(${funcionario.id})">Editar</button>
            <button id="buttonTable2" onclick="excluirFuncionario(${funcionario.id})">Excluir</button>
          </td>
        `;
        funcionariosTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de funcionários: ", error);
    });
}

function preencherCargosTabela() {
  const cargosTableBody = document.getElementById("cargosTableBody");

  fetch("getCargos.php?action=getCargos")
    .then((response) => response.json())
    .then((data) => {
      cargos = data;
      data.forEach((cargo) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td width="auto">${cargo.id}</td>
          <td width="auto">${cargo.descricao}</td>
          <td width="auto">
            <button id="buttonTable" onclick="editarCargo(${cargo.id})">Editar</button>
            <button id="buttonTable2" onclick="excluirCargo(${cargo.id})">Excluir</button>
          </td>
        `;
        cargosTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar a lista de cargos: ", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // Cadastro e edição de funcionário
  document
    .getElementById("cadastroFuncionarioForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const modoFormulario = document.getElementById("modoFormulario").value;

      // Obtenha os valores do formulário
      const formData = new FormData(this);
      formData.append(
        "action",
        modoFormulario === "criacao"
          ? "cadastrarFuncionario"
          : "editarFuncionario"
      ); // Ação depende do modo

      if (modoFormulario === "criacao" || modoFormulario === "edicao") {
        fetch("cadastro.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            alert(data); // Exiba a resposta do servidor
          })
          .catch((error) => {
            console.error("Erro na solicitação: ", error);
          });
          recarregarPagina();
      }
    });

  document
    .getElementById("cadastroCargoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const modoFormulario = document.getElementById("modoFormulario2").value;

      // Obtenha os valores do formulário
      const formData = new FormData(this);
      formData.append(
        "action",
        modoFormulario === "criacao" ? "cadastrarCargo" : "editarCargo"
      ); // Ação depende do modo

      if (modoFormulario === "criacao" || modoFormulario === "edicao") {
        fetch("cadastro.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            alert(data); // Exiba a resposta do servidor

          })
          .catch((error) => {
            console.error("Erro na solicitação: ", error);
          });
      }
    });

  // Obter lista de cargos
  const cargoSelect = document.getElementById("cargo");

  function preencherCargos() {
    fetch("getCargos.php?action=getCargos")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((cargo) => {
          const option = document.createElement("option");
          option.value = cargo.id;
          option.textContent = cargo.descricao;
          cargoSelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar a lista de cargos: ", error);
      });
  }

  // Chame a função para preencher os cargos assim que a página for carregada
  preencherCargos();

 

  

  // Chame a função para preencher a tabela de funcionários assim que a página for carregada
  preencherFuncionarios();

  

  // Chame a função para preencher os cargos assim que a página for carregada
  preencherCargosTabela();
});

function editarFuncionario(id) {
  // Obtenha o elemento do modo do formulário
  const modoFormulario = document.getElementById("modoFormulario");

  // Defina o modo do formulário como "edicao"
  modoFormulario.value = "edicao";

  // Defina o ID do funcionário a ser editado no campo "funcionarioId"
  document.getElementById("funcionarioId").value = id;

  // Obtenha os elementos do formulário existente
  const formulario = document.getElementById("cadastroFuncionarioForm");
  console.log("ID recebido:", id);
  console.log("Funcionarios:", funcionarios);
  // Encontre o funcionário com o ID correspondente na variável global funcionarios
  const funcionario = funcionarios.find((f) => f.id == id);

  // Verifique se o funcionário foi encontrado
  if (funcionario) {
    // Preencha o formulário com os dados do funcionário
    formulario.elements.nome.value = funcionario.nome;
    formulario.elements.sobrenome.value = funcionario.sobrenome;
    formulario.elements.cargo.value = funcionario.cargo;
    formulario.elements.nascimento.value = funcionario.nascimento;
    formulario.elements.salario.value = funcionario.salario;

    // Atualize o rótulo do botão "Salvar Alterações"
    const botaoSalvar = document.getElementById("btnForm");
    botaoSalvar.textContent = "Salvar Alterações";
    botaoSalvar.style.display = "block"; // Exibe o botão "Salvar Alterações"
  } else {
    alert("Funcionário não encontrado. Verifique o ID fornecido.");
  }
}

function editarCargo(id) {
  // Obtenha o elemento do modo do formulário
  const modoFormulario2 = document.getElementById("modoFormulario2");

  // Defina o modo do formulário como "edicao"
  modoFormulario2.value = "edicao";

  // Defina o ID do funcionário a ser editado no campo "funcionarioId"
  document.getElementById("cargoId").value = id;

  // Obtenha os elementos do formulário existente
  const formulario2 = document.getElementById("cadastroCargoForm");
  console.log("ID recebido:", id);
  console.log("Descrição:", cargos);
  // Encontre o funcionário com o ID correspondente na variável global funcionarios
  const cargo = cargos.find((c) => c.id == id);

  // Verifique se o funcionário foi encontrado
  if (cargo) {
    // Preencha o formulário com os dados do funcionário
    formulario2.elements.descricao.value = cargo.descricao;

    // Atualize o rótulo do botão "Salvar Alterações"
    const botaoSalvar = document.getElementById("btnForm2");
    botaoSalvar.textContent = "Salvar Alterações";
    botaoSalvar.style.display = "block"; // Exibe o botão "Salvar Alterações"
  } else {
    alert("Cargo não encontrado. Verifique o ID fornecido.");
  }
}

// Função para excluir um funcionário
function excluirFuncionario(id) {
  if (confirm("Tem certeza de que deseja excluir este funcionário?")) {
    // Montar os dados para a solicitação
    const formData = new FormData();
    formData.append("action", "excluirFuncionario");
    formData.append("id", id);

    // Enviar a solicitação para excluir o funcionário
    fetch("cadastro.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Exiba a resposta do servidor
        preencherFuncionarios();
      })
      .catch((error) => {
        console.error("Erro na solicitação: ", error);
      });
    //recarregarPagina();
  }
}

function excluirCargo(id) {
  if (confirm("Tem certeza de que deseja excluir este Cargo?")) {
    // Montar os dados para a solicitação
    const formData = new FormData();
    formData.append("action", "excluirCargo");
    formData.append("id", id);

    console.log("ID recebido:", id);

    // Enviar a solicitação para excluir o funcionário
    fetch("cadastro.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Exiba a resposta do servidor
        //preencherCargosTabela();
      })
      .catch((error) => {
        console.error("Erro na solicitação: ", error);
      });

    //
  }
}
