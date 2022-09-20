import * as SQLite from "expo-sqlite";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbPizzaria.db");
  return cx;
}

export function obtemTodosItensCarrinho() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = `select * from tbCarrinho`;
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              id: registros.rows.item(n).id,
              descricao: registros.rows.item(n).descricao,
              precoUnitario: registros.rows.item(n).precoUnitario,
              categoria: registros.rows.item(n).categoria,
            };
            retorno.push(obj);
          }
          resolve(retorno);
        });
      },
      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
}

export function excluiItem(id) {
  console.log("Apagando produto " + id);
  return new Promise((resolve, reject) => {
    let query = "delete from tbCarrinho where id=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [id], (tx, resultado) => {
          resolve(resultado.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function limparCarrinho() {
  console.log("Limpando carrinho: ");
  return new Promise((resolve, reject) => {
    let query = "delete from tbCarrinho";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, resultado) => {
          resolve(resultado.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function adicionarVenda(produtoVenda) {
  return new Promise((resolve, reject) => {
    let query =
      "insert into tbVendas(id, idProduto , descricaoProduto, precoUnitarioProduto, categoriaProduto, dataVenda) values (?,?,?,?,?,?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [
            produtoVenda.id,
            produtoVenda.idProduto,
            produtoVenda.descricaoProduto,
            produtoVenda.precoUnitarioProduto,
            produtoVenda.categoriaProduto,
            produtoVenda.dataVenda,
          ],
          (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}
