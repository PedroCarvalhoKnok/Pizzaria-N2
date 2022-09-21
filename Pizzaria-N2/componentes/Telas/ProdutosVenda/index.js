import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './styles';
import ProdutoVenda from '../../ProdutoVenda';
import {
    obtemTodasCategorias,
    adicionarProdutoCarrinho,
    obtemTodosProdutosVenda
} from '../../../services/ProdutosVenda/dbservices';




export default function ProdutosVenda({navigation}) {
    const [id, setId] = useState();
    const [descricaoProduto, setDescricaoProduto] = useState();
    const [idProduto, setIdProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [produtosVenda, setProdutosVenda] = useState([])
    const [categoria, setCategoria] = useState([])
    const [categorias, setCategorias] = useState([])

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

    function confirmaAdicionarCarrinho(produtoVenda) {
       
        
        Alert.alert('Atenção', `Confirmar a adição do produto ${produtoVenda.descricao} no carrinho ?`,
            [
                {
                    text: 'Sim',
                    onPress: () => adicionarCarrinho(produtoVenda),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ])


    }


    async function adicionarCarrinho(produtoVenda) {

        try {

            console.log(produtoVenda);
           
            let resposta = (await adicionarProdutoCarrinho(produtoVenda));

            if (resposta)
                Alert.alert(`${produtoVenda.descricao} adicionado no carrinho com sucesso!`);
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
                categorias.splice(0,0, { descricao: '', id: '0'});
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
            setProdutosVenda(produtos);
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.mainTitle}>
                <MaterialIcons onPress={() => {navigation.navigate('Home')}} name="arrow-back" size={32} color="white" />
                <Text style={{fontSize: 20}}>Catálogo</Text>
                <Ionicons onPress={() => {navigation.navigate('Carrinhos')}} name="cart" size={32} color="white" />
            </View>


            <Text style={styles.legend}>Filtrar por Categoria</Text>

            <Picker
                selectedValue=''
                style={styles.pickerStyle}
                onValueChange={(itemValue) => filtrarProdutosCategoria(itemValue)}>
                {
                    categorias.map((categoria, index) =>
                    (
                        <Picker.Item key={index} label={categoria.descricao} value={categoria.descricao} />
                    ))
                }

            </Picker>

            <TouchableOpacity onPress={() => { filtrarProdutosCategoria() }} style={styles.btnCarregar}><MaterialIcons name="search" size={32} color="white" /></TouchableOpacity>


            <Text style={styles.legend}>Produtos Disponíveis</Text>
            <ScrollView style={{marginTop: 20}}>
                {
                    produtosVenda.map((produtoVenda, index) =>
                    (
                        <ProdutoVenda produtoVenda={produtoVenda} key={index.toString()} confirmaAdicionarCarrinho={confirmaAdicionarCarrinho}></ProdutoVenda>
                    ))
                }
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}


