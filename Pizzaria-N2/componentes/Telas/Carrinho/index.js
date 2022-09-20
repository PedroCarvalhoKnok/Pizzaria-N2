import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import styles from "./styles";
import Carrinho from "../../Carrinho";
import {
  obtemTodosItensCarrinho,
  adicionarVenda,
  excluiItem,
  limparCarrinho,
} from "../../../services/Carrinho/dbservices";

export default function Carrinhos({ navigation }) {
  const [id, setId] = useState();
  const [descricaoProduto, setDescricaoProduto] = useState();
  const [idProduto, setIdProduto] = useState();
  const [dataVenda, setDataVenda] = useState();
  const [itensCarrinho, setItensCarrinho] = useState([]);

  useEffect(() => {
    processamentoUseEffect();
    console.log("useEffect");
  }, []);

  async function processamentoUseEffect() {
    console.log("UseEffect...");
    await carregaDados();
  }

  function criarNovoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  function dataFormatada() {
    var dataAtual = new Date();
    var data =
      dataAtual.getDate() +
      "/" +
      formataMes(dataAtual.getMonth() + 1) +
      "/" +
      dataAtual.getFullYear() +
      " " +
      dataAtual.getHours() +
      ":" +
      dataAtual.getMinutes() +
      ":" +
      dataAtual.getSeconds();

    return data;
  }

  function formataMes(mes){
    return mes = mes < 10 ? `0${mes}`: mes;
    
  }

  async function efetivarVenda() {

    try {
      let idVenda = criarNovoId();
      let dataVenda = dataFormatada();

      itensCarrinho.forEach(async (item) => {

        console.log({
          id: idVenda,
          idProduto: item.id,
          descricaoProduto: item.descricao,
          precoUnitarioProduto: item.precoUnitario,
          categoriaProduto: item.categoria,
          dataVenda: dataVenda,
        });
        

        let resposta = await adicionarVenda({
          id: idVenda,
          idProduto: item.id,
          descricaoProduto: item.descricao,
          precoUnitarioProduto: item.precoUnitario,
          categoriaProduto: item.categoria,
          dataVenda: dataVenda,
        });

        if (resposta){
           Alert.alert(`${item.descricao} inserido com sucesso.` );
           await removerItem(item.id)
        }
        else 
           Alert.alert(`${item.descricao} não foi inserido corretamente!`);
       
      });

      Keyboard.dismiss();
      alert("Dados salvos com sucesso!!!");
      await carregaDados();
    } catch (e) {
      Alert.alert(e);
    }
  }

  function confirmaEfetivarVenda() {
    Alert.alert("Atenção", `Confirma a efetivação da venda?`, [
      {
        text: "Sim",
        onPress: () => efetivarVenda(),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function confirmaRemoverItem(id) {
    console.log(id);
    const item = itensCarrinho.find((item) => item.id == id);
    console.log(item);
    Alert.alert("Atenção", `Confirma a remoção do item ${item.descricao} ${item.categoria} do carrinho?`, [
      {
        text: "Sim",
        onPress: () => removerItem(id),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function confirmaLimparCarrinho() {

    Alert.alert("Atenção", `Confirma a limpeza de todo o carrinho?`, [
      {
        text: "Sim",
        onPress: () => efetivarLimparCarrinho(),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivarLimparCarrinho() {
    try {
      await limparCarrinho();
      Keyboard.dismiss();
      await carregaDados();
      alert(`Carrinho limpo com sucesso!!!`);
    } catch (e) {
      alert(e);
    }
  }



  async function removerItem(id) {
    try {
      await excluiItem(id);
      Keyboard.dismiss();
      await carregaDados();
      alert(`Item ${id} apagado com sucesso!!!`);
    } catch (e) {
      alert(e);
    }
  }

  async function carregaDados() {
    try {
      await obtemTodosItensCarrinho().then((carrinhoResponse) => {
        let itensCarrinho = carrinhoResponse;
        console.log(itensCarrinho);
        setItensCarrinho(itensCarrinho);
      });
    } catch (e) {
      alert(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Meu Carrinho</Text>
      <TouchableOpacity style={styles.botao}
        onPress={() => navigation.navigate('Home')}>
        <Text>Menu</Text>
      </TouchableOpacity>

      <View style={styles.sideBtns}>
        <TouchableOpacity
          onPress={async () => {
            confirmaEfetivarVenda();
          }}
          style={styles.btnSalvar}
        >
          <Text>Efetivar venda</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            confirmaLimparCarrinho();
          }}
          style={styles.btnSalvar}
        >
          <Text>Limpar Carrinho</Text>
        </TouchableOpacity>
        </View>

        <ScrollView>
          {itensCarrinho.map((item, index) => (
            <Carrinho
              item={item}
              key={index.toString()}
              confirmaRemoverItem={confirmaRemoverItem}
            ></Carrinho>
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
      );
}
