import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}

export function obtemTodosProdutosVenda(filtroCategoria) {

    let whereCategoriaFiltro = ``;

    if (filtroCategoria)
        whereCategoriaFiltro = ` where categoria = '${filtroCategoria}'`;


    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `select * from tbProdutos${whereCategoriaFiltro}`;
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).descricao,
                            precoUnitario: registros.rows.item(n).precoUnitario,
                            categoria: registros.rows.item(n).categoria
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemTodasCategorias() {


    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `select * from tbCategorias`;
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).descricao
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}



export function adicionarProdutoCarrinho(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbCarrinho(id, descricao ,precoUnitario, categoria) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.id, produto.descricao, produto.precoUnitario, produto.categoria],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function adicionarVenda(venda, produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbVendas(id, idProduto ,descricaoProduto, dataVenda) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [venda.id, produto.id, produto.descricao, venda.dataVenda],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}






