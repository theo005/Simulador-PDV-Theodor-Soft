/* adicionando dados ficticios de produtos ao local storage */

function gerarProdutosMock() {
    //verificar se a chave produtos ja existe no local storage
    const produtosExistem = localStorage.getItem('produtos');


    // se nao existir, adicionar os produtos
    if (!produtosExistem) {
        const produtosMock = [
            {
                id: 1,
                nome: "Camiseta Básica Branca",
                estoque: 120,
                precoUnitario: 39.90,
                categoria: "Roupas"
            },
            {
                id: 2,
                nome: "Calças Jeans Slim",
                estoque: 60,
                precoUnitario: 129.90,
                categoria: "Roupas"
            },
            {
                id: 3,
                nome: "Tênis Esportivo Preto/Vermelho",
                estoque: 50,
                precoUnitario: 299.90,
                categoria: "Calçados"
            },
            {
                id: 4,
                nome: "Relógio de Pulso Digital",
                estoque: 80,
                precoUnitario: 199.90,
                categoria: "Acessórios"
            },
            {
                id: 5,
                nome: "Mochila Couro Sintético",
                estoque: 40,
                precoUnitario: 89.90,
                categoria: "Acessórios"
            }
        ];

        //Salvando os dados de produtos no local storage
        localStorage.setItem('produtos', JSON.stringify(produtosMock));
    }
}

gerarProdutosMock();