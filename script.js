// Arrays para armazenar receitas, despesas e funcionários
let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

// Função para alternar entre as abas
function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Função para cadastrar lançamento
document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const detalhes = document.getElementById("detalhes").value;
    const data = document.getElementById("data").value;
    const hora = new Date().toLocaleTimeString();
    
    const lancamento = { tipo, descricao, valor, detalhes, data, hora };

    if (tipo === 'receita') {
        receitas.push(lancamento);
        localStorage.setItem('receitas', JSON.stringify(receitas));
    } else {
        despesas.push(lancamento);
        localStorage.setItem('despesas', JSON.stringify(despesas));
    }

    atualizarLancamentos();
    atualizarRelatorio();
    e.target.reset();
});

// Função para exibir os lançamentos
function atualizarLancamentos() {
    const listaReceitas = document.getElementById("listaReceitas");
    const listaDespesas = document.getElementById("listaDespesas");

    listaReceitas.innerHTML = '';
    listaDespesas.innerHTML = '';

    receitas.forEach((receita, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Descrição:</strong> ${receita.descricao} <br>
            <strong>Valor:</strong> R$ ${receita.valor.toFixed(2)} <br>
            <strong>Detalhes:</strong> ${receita.detalhes} <br>
            <strong>Data:</strong> ${receita.data} <br>
            <strong>Hora:</strong> ${receita.hora} <br>
            <button class="delete-btn" onclick="excluirLancamento('receita', ${index})">Excluir</button>
        `;
        listaReceitas.appendChild(li);
    });

    despesas.forEach((despesa, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Descrição:</strong> ${despesa.descricao} <br>
            <strong>Valor:</strong> R$ ${despesa.valor.toFixed(2)} <br>
            <strong>Detalhes:</strong> ${despesa.detalhes} <br>
            <strong>Data:</strong> ${despesa.data} <br>
            <strong>Hora:</strong> ${despesa.hora} <br>
            <button class="delete-btn" onclick="excluirLancamento('despesa', ${index})">Excluir</button>
        `;
        listaDespesas.appendChild(li);
    });
}

// Função para excluir lançamento
function excluirLancamento(tipo, index) {
    if (tipo === 'receita') {
        receitas.splice(index, 1);
        localStorage.setItem('receitas', JSON.stringify(receitas));
    } else {
        despesas.splice(index, 1);
        localStorage.setItem('despesas', JSON.stringify(despesas));
    }
    atualizarLancamentos();
    atualizarRelatorio();
}

// Função para alternar a visibilidade de receitas e despesas
function toggleLancamentos(tipo) {
    if (tipo === 'receitas') {
        const listaReceitas = document.getElementById("listaReceitas");
        const btnReceitas = document.getElementById("showReceitasBtn");
        if (listaReceitas.style.display === 'none') {
            listaReceitas.style.display = 'block';
            btnReceitas.textContent = 'Ocultar Receitas';
        } else {
            listaReceitas.style.display = 'none';
            btnReceitas.textContent = 'Mostrar Receitas';
        }
    } else {
        const listaDespesas = document.getElementById("listaDespesas");
        const btnDespesas = document.getElementById("showDespesasBtn");
        if (listaDespesas.style.display === 'none') {
            listaDespesas.style.display = 'block';
            btnDespesas.textContent = 'Ocultar Despesas';
        } else {
            listaDespesas.style.display = 'none';
            btnDespesas.textContent = 'Mostrar Despesas';
        }
    }
}

// Função para cadastrar funcionário
document.getElementById("formFuncionario").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const nome = document.getElementById("nomeFuncionario").value;
    const cargo = document.getElementById("cargoFuncionario").value;
    const salario = parseFloat(document.getElementById("salarioFuncionario").value);
    const horario = document.getElementById("horarioFuncionario").value;
    
    const funcionario = { nome, cargo, salario, horario };
    funcionarios.push(funcionario);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    atualizarFuncionarios();
    e.target.reset();
});

// Função para exibir os funcionários cadastrados
function atualizarFuncionarios() {
    const listaFuncionarios = document.getElementById("listaFuncionarios");
    listaFuncionarios.innerHTML = '';

    funcionarios.forEach((funcionario, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Nome:</strong> ${funcionario.nome} <br>
            <strong>Cargo:</strong> ${funcionario.cargo} <br>
            <strong>Salário:</strong> R$ ${funcionario.salario.toFixed(2)} <br>
            <strong>Horário:</strong> ${funcionario.horario} <br>
            <button class="delete-btn" onclick="excluirFuncionario(${index})">Excluir</button>
        `;
        listaFuncionarios.appendChild(li);
    });
}

// Função para excluir funcionário
function excluirFuncionario(index) {
    funcionarios.splice(index, 1);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    atualizarFuncionarios();
}

// Função para atualizar o relatório de registros
function atualizarRelatorio() {
    const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0);
    const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
    const saldo = totalReceitas - totalDespesas;

    document.getElementById("totalReceitas").innerHTML = `Total de Receitas: R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById("totalDespesas").innerHTML = `Total de Despesas: R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById("saldo").innerHTML = `Saldo: R$ ${saldo.toFixed(2)}`;
}

// Inicializar os dados ao carregar a página
atualizarLancamentos();
atualizarFuncionarios();
atualizarRelatorio();
