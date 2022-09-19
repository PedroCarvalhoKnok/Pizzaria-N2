import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}

export function obtemDadosUnitariosTodasVendas() {


    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `select id, dataVenda from tbVendas`;
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            dataVenda: registros.rows.item(n).dataVenda
                            // descricao: registros.rows.item(n).descricao,
                            // precoUnitario: registros.rows.item(n).precoUnitario,
                            // categoria: registros.rows.item(n).categoria
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

export function obtemProdutosPorVenda(id) {


    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `select idProduto, descricaoProduto, precoUnitarioProduto, categoriaProduto
            from tbVendas where id=?`;
            tx.executeSql(query, [id],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            idProduto: registros.rows.item(n).idProduto,
                            descricaoProduto: registros.rows.item(n).descricaoProduto,
                            precoUnitarioProduto: registros.rows.item(n).precoUnitarioProduto,
                            categoriaProduto: registros.rows.item(n).categoriaProduto
                            // descricao: registros.rows.item(n).descricao,
                            // precoUnitario: registros.rows.item(n).precoUnitario,
                            // categoria: registros.rows.item(n).categoria
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




