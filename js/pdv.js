/* Função para carregar os produtos */
function carregarProdutos() {
    //Pegando a div onde os produtos serão inseridos
    const divProd = document.getElementById('resumo-prod-content');
    divProd.innerHTML = ''; // Limpando o conteúdo anterior


    //Pegando os produtos do localStorage
    const dados = JSON.parse(localStorage.getItem('produtos')) || [];

    //Inserindo os dados na resumo-prod-content
    for (let i = 0; i < dados.length; i++) 
        divProd.innerHTML += `
            <div class="resumo-prod-item">
                <div>
                    <span>${dados[i].nome}</span>
                    <span>R$${dados[i].precoUnitario.toFixed(2)}</span>
                </div>
                <div>
                    <i class="fa-solid fa-cart-plus icone-acao" onclick="adicionarProduto(${dados[i].id});"></i>
                </div>
            </div>
        `;
}

/* Chamar a execução da carregarProdutos() */
carregarProdutos();

/* Array em memória para controlar dados do cupom */
let cupom = [];

/* Funçao para carregar na tabela os dados do cupom */

function carregarCupom() {
    //Pegando a div onde o cupom serão inseridos
    let divCupom = document.getElementById('resumo-cupom-content');
    divCupom.innerHTML = ''; // Limpando o conteúdo anterior

    //Inserindo os dados na resumo-cupom-content
    for (let i = 0; i < cupom.length; i++) 
        divCupom.innerHTML += `
            <div class="resumo-cupom-item">
                <div class="w25">
                    <i class="fa-solid fa-trash icone-acao" onclick="removerProduto(${cupom[i].id});"></i>
                </div>

                <div class="esquerda">
                    <span>${cupom[i].quantidade}</span>
                    <span>
                        ${cupom[i].nome}
                        (${cupom[i].preco.toFixed(2)})
                    </span>
                </div>

                <div class="w120dir">
                R$ ${cupom[i].total.toFixed(2)}
                </div>
            </div>
        `;

}

/* Função apra adicionar produto ao cupom*/

function adicionarProduto(id) {
    //pegar os dados de produto do local storage
    let dados = JSON.parse(localStorage.getItem('produtos')) || [];

    //obter o produto clicado
    let produto = dados.filter(p => p.id == id)[0];

    //tentando achar o produto no cupom
    let produtoExistente = cupom.find(p => p.id == id);

    //se o produto nao existir no cupom, adicionar
    if (!produtoExistente) {
        cupom.push(
            {
                id: produto.id,
                nome: produto.nome,
                preco: produto.precoUnitario,
                quantidade: 1,
                total: produto.precoUnitario * 1
            }
        );
    }

    //senão (se ja existir) atualizar a quantidade e o total
    else {
        produtoExistente.quantidade++; //aumentar a quantidade +1
        produtoExistente.total = produtoExistente.preco * produtoExistente.quantidade; //atualizar o total
    }

    //recarregar o cupom
    carregarCupom();
    atualizarTotais();
}
//Funçao de calcular o total das vendas

function calcularTotalVendas() {
    let total = 0;
    for (let i = 0; i < cupom.length; i++) 
        total += cupom[i].total;
    
        return total;
}

//Funçao de calcular o desconto

function calcularDesconto(valor) {
    let desconto = 0;

    if (valor >= 5000) 
        desconto = valor * 5/100;
    else if (valor >= 2000)
        desconto = valor * 3/100;
    else if (valor >= 1000)
        desconto = valor * 1/100;

    return desconto;
    
}

//Função para atualizar os totais

function atualizarTotais() {
    //Obtendo os cards para atualizar os valores
    let tProdutos = document.getElementById('tProdutos');
    let tDesconto = document.getElementById('tDescontos');
    let tTotal = document.getElementById('tTotal');

    //Calculando os valores
    let totalVendas = calcularTotalVendas();
    let totalDesconto = calcularDesconto(totalVendas);
    let totalFinal = totalVendas - totalDesconto;

    //Atualizando os valores nos cards
    tProdutos.innerText = `R$ ${totalVendas.toFixed(2)}`;
    tDesconto.innerText = `R$ ${totalDesconto.toFixed(2)}`;
    tTotal.innerText = `R$ ${totalFinal.toFixed(2)}`;


}

/* Função para excluir produtos do cupom */

function removerProduto(id) {
    //Remover o produto do array cupom
    cupom = cupom.filter(p => p.id != id);

    //Recarregar o cupom
    carregarCupom();
    atualizarTotais();
}