import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './styles';
import Produto from '../../Produto';
import {
    obtemTodosProdutos,
    adicionaProduto,
    alteraProduto,
    excluiProduto,
    excluiTodosProdutos,
    obtemTodasCategorias
} from '../../../services/Produtos/dbservices';




export default function Produtos({ navigation }) {
    const [id, setId] = useState();
    const [descricao, setDescricao] = useState();
    const [precoUnitario, setPrecoUnitario] = useState();
    const [categoria, setCategoria] = useState();
    const [produtos, setProdutos] = useState([])
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


    async function salvarProduto() {

        console.log('teste' + id)

        let novoRegistro = id == undefined;


        console.log(novoRegistro)

        let produtoObj = {
            id: novoRegistro ? criarNovoId() : id,
            descricao: descricao,
            precoUnitario: precoUnitario,
            categoria: categoria
        };

        console.log(produtoObj)

        try {
            if (novoRegistro) {
                let resposta = (await adicionaProduto(produtoObj));

                if (resposta)
                    Alert.alert(`${produtoObj.descricao} adicionado com sucesso!`);
                else
                    Alert.alert('Falhou miseravelmente!');
            }
            else {
                let resposta = await alteraProduto(produtoObj);

                if (resposta)
                    Alert.alert(`${produtoObj.descricao} Alterado com sucesso!`);
                else
                    Alert.alert('Falhou miseravelmente!');
            }
            Keyboard.dismiss();
            alert('Dados salvos com sucesso!!!');
            limparCampos();
            await carregaDados();
        }
        catch (e) {
            alert(e);
        }

    }

    async function carregaDados() {
        try {
            obtemTodosProdutos().then((produtosResponse) => {

                let produtos = produtosResponse;
                console.log(produtos)
                setProdutos(produtos);
            })

            obtemTodasCategorias().then((categoriasResponse) => {

                let categorias = categoriasResponse;
                console.log(categorias)

                if (categorias.length > 0)
                    setCategoria(categorias[0].descricao);

                setCategorias(categorias);
            })

        } catch (e) {
            alert(e);
        }
    }

    function carregaEditar(id) {
        const produtoEdit = produtos.find(produto => produto.id == id);
        console.log(produtoEdit);
        if (produtoEdit != undefined) {
            setId(produtoEdit.id);
            setDescricao(produtoEdit.descricao);
            setPrecoUnitario(produtoEdit.precoUnitario.toString());
            setCategoria(produtoEdit.categoria);
        }

        console.log(produtoEdit);
    }

    async function limparCampos() {
        setPrecoUnitario(0);
        setDescricao("");
        setId(undefined);
        setCategoria("");
        Keyboard.dismiss();
    }

    async function efetivaExcluiTodosProdutos() {
        try {
            let resposta = await excluiTodosProdutos();
            console.log(resposta)
            if (resposta)
                Alert.alert('produtos excluidos com sucesso')
            else
                Alert.alert('N??o h?? dados para serem excluidos')

            await carregaDados();
        }
        catch (e) {
            alert(e);
        }
    }

    function confirmaApagarTudo() {

        Alert.alert('Aten????o', `Confirma a remo????o de todos os produtos?`,
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaExcluiTodosProdutos()
                },
                {
                    text: 'N??o',
                    style: 'cancel',
                }
            ])

    }


    function apagaElemento(id) {
        console.log(id)
        const produto = produtos.find(produto => produto.id == id);
        console.log(produto);
        Alert.alert('Aten????o', `Confirma a remo????o do produto ${produto.descricao}?`,
            [
                {
                    text: 'Sim',
                    onPress: () => removerProduto(id),
                },
                {
                    text: 'N??o',
                    style: 'cancel',
                }
            ])


    }

    async function filtrarListaProdutos(categoria) {

        await obtemTodosProdutos(categoria).then((produtosResponse) => {

            let produtos = produtosResponse;
            console.log(produtos)
            setProdutos(produtos);
        })

    }

    async function removerProduto(id) {
        try {
            await excluiProduto(id);
            Keyboard.dismiss();
            limparCampos();
            await carregaDados();
            alert(`Produto ${id} apagado com sucesso!!!`);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainTitle}>
                <MaterialIcons onPress={() => {navigation.navigate('Home')}} name="arrow-back" size={32} color="white" />
                <Text style={{fontSize: 20}}>Gerenciamento de Produtos</Text>
                <Ionicons onPress={() => {navigation.navigate('Carrinhos')}} name="cart" size={32} color="white" />
            </View>

            <View style={styles.areaBtns}>
                <Text style={styles.legend}>Descri????o</Text>
                <TextInput value={descricao} style={styles.txtInput} onChangeText={(text) => { setDescricao(text) }}></TextInput>
            </View>

            <View style={styles.areaBtns}>

                <Text style={styles.legend}>Pre??o unit??rio</Text>
                <TextInput value={precoUnitario} style={styles.txtInput} onChangeText={(text) => { setPrecoUnitario(text) }}></TextInput>
            </View>

            <Text style={styles.legend}>Categoria</Text>
            <Picker
                selectedValue={categoria}
                style={styles.pickerStyle}
                mode={"dialog"}
                onValueChange={(itemValue, itemindex) => setCategoria(itemValue)}>
                {
                    categorias.map((categoria, index) =>
                    (
                        <Picker.Item key={index} label={categoria.descricao} value={categoria.descricao} />
                    ))
                }


            </Picker>


            <View style={styles.sideBtns}>

                <TouchableOpacity onPress={async () => { salvarProduto() }} style={styles.btnSalvar}><MaterialIcons name="save" size={32} color="white" /></TouchableOpacity>

                <TouchableOpacity onPress={() => { limparCampos() }} style={styles.btnCarregar}><MaterialIcons name="cleaning-services" size={32} color="white" /></TouchableOpacity>

                <TouchableOpacity onPress={() => { confirmaApagarTudo() }} style={styles.btnCarregar}><MaterialIcons name="clear" size={32} color="white" /></TouchableOpacity>
            </View>

            <Text style={styles.legend}>Produtos Cadastrados</Text>

            <ScrollView>
                {
                    produtos.map((produto, index) =>
                    (
                        <Produto produto={produto} key={index.toString()} apagaElemento={apagaElemento} carregaEditar={carregaEditar}></Produto>
                    ))
                }
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}
