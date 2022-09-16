import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}

export async function createTables() {
    return new Promise((resolve, reject) => {

        const queryTbProdutos = `CREATE TABLE IF NOT EXISTS tbProdutos
        (
            id text not null primary key,
            descricao text not null,
            precoUnitario real not null,
            categoria text not null
        )`;


        const queryTbVendas = `CREATE TABLE IF NOT EXISTS tbVendas
        (
            id text not null primary key,
            idProduto text not null,
            descricaoProduto text not null,
            precoUnitarioProduto real not null,
            dataVenda text not null
        )`;

        const queryTbCarrinho = `CREATE TABLE IF NOT EXISTS tbCarrinho
        (
            id text not null primary key,
            descricao text not null,
            precoUnitario real not null,
            categoria text not null
        )`;

        const queryTbCategorias = `CREATE TABLE IF NOT EXISTS tbCategorias
        (
            id text not null primary key,
            descricao text not null
        )`;

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(

                queryTbProdutos, [],
                (tx, resultado) => resolve(true)
            )

            tx.executeSql(
                queryTbVendas, [],
                (tx, resultado) => resolve(true)
            )

            tx.executeSql(
                queryTbCarrinho, [],
                (tx, resultado) => resolve(true)
            )

            tx.executeSql(
                queryTbCategorias, [],
                (tx, resultado) => resolve(true)
            )
           
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};