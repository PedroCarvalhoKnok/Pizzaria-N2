import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert, Picker } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './componentes/Produto/styles';
import ProdutoVenda from '../../ProdutoVenda';
import {
    obtemTodasCategorias,
    adicionarProdutoCarrinho,
    adicionarVenda,
    obtemTodosProdutosVenda
} from './services/ProdutosVenda/dbservices';




export default function ProdutosVenda() {
    const [id, setId] = useState();
    const [descricaoProduto, setDescricaoProduto] = useState();
    const [idProduto, setIdProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [produtosVenda, setProdutosVenda] = useState([])
    const [categorias, setCategorias] = useState([])
    let tabelasCriadas = false;

    useEffect(
        () => {
            processamentoUseEffect();
            console.log('useEffect');
        }, []);


    async function processamentoUseEffect() {

        console.log("UseEffect...");
        await carregaDados();
    }

    function criarNovoId() {

        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);

    }


    async function adicionarCarrinho(produtoVenda) {

        try {

            let resposta = (await adicionarProdutoCarrinho(produtoVenda));

            if (resposta)
                Alert.alert(`${produtoVenda} adicionado no carrinho com sucesso!`);
            else
                Alert.alert('Falhou miseravelmente!');


            Keyboard.dismiss();
            alert('Dados salvos com sucesso!!!');
            await carregaDados();
        }
        catch (e) {
            alert(e);
        }

    }

    async function carregaDados() {
        try {
            obtemTodosProdutosVenda().then((vendasResponse) => {

                let vendas = vendasResponse;
                console.log(vendas)
                setProdutosVenda(vendas);
            })

            obtemTodasCategorias().then((categoriasResponse) => {

                let categorias = categoriasResponse;
                console.log(categorias)
                setCategorias(categorias);
            })

        } catch (e) {
            alert(e);
        }
    }

    async function filtrarProdutosCategoria(categoria) {

        await obtemTodosProdutosVenda(categoria).then((produtosResponse) => {

            let produtos = produtosResponse;
            console.log(produtos)
            setProdutos(produtos);
        })

    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Gerenciamento de Vendas</Text>

            <View style={styles.sideBtns}>

                <Text style={styles.legend}>Categoria</Text>

                <Picker
                    selectedValue={selectedValue}
                    style={styles.selectStyle}
                    onValueChange={(itemValue) => filtrarProdutosCategoria(itemValue)}>
                    {
                        categorias.map((categoria, index) =>
                        (
                            <Picker.Item label={categoria} value={categoria} />
                        ))
                    }

                </Picker>

                <TouchableOpacity onPress={() => { filtrarListaChamados() }} style={styles.btnCarregar}><Text>Listar Todos</Text></TouchableOpacity>

            </View>



            <ScrollView>
                {
                    produtosVenda.map((produtoVenda, index) =>
                    (
                        <ProdutoVenda produtoVenda={produtoVenda} key={index.toString()} adicionarCarrinho={adicionarCarrinho}></ProdutoVenda>
                    ))
                }
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}


