import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}

export function obtemTodosProdutos(filtroCategoria) {

    let whereCategoriaFiltro = ``;

    if (filtroCategoria === 'A')
        whereCategoriaFiltro = ` where situacao = 'Atendido'`;

    if (filtroCategoria === 'P')
        whereCategoriaFiltro = ` where situacao = 'Pendente'`;


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

export function adicionaProduto(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProdutos(id, descricao ,precoUnitario, categoria) values (?,?,?,?)';
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


export function alteraProduto(produto) {
    console.log('começando o método alteraproduto');
    return new Promise((resolve, reject) => {
        let query = 'update tbProdutos set descricao=?, precoUnitario=?, categoria=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.descricao, produto.precoUnitario, produto.categoria, produto.id],
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


export function excluiProduto(id) {
    console.log('Apagando produto ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
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


export function excluiTodosProdutos() {
    console.log("Apagando todos os produtos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
