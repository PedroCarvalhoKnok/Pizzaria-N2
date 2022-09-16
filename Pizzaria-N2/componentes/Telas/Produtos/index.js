import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert, Picker } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './componentes/Produto/styles';
import Produto from '../../Produto';
import {
    obtemTodosProdutos,
    adicionaProduto,
    alteraProduto,
    excluiProduto,
    excluiTodosProdutos,
    obtemTodasCategorias
} from './services/Produtos/dbservices';




export default function Produtos() {
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

        let novoRegistro = id == undefined;


        console.log(novoRegistro)

        let produtoObj = {
            id: novoRegistro ? criarNovoId() : id,
            descricao: descricao,
            precoUnitario: precoUnitario,
            categoria: categoria
        };

        console.log(chamadoObj)

        try {
            if (novoRegistro) {
                let resposta = (await adicionaProduto(produtoObj));

                if (resposta)
                    Alert.alert(`${produtoObj} adicionado com sucesso!`);
                else
                    Alert.alert('Falhou miseravelmente!');
            }
            else {
                let resposta = await alteraProduto(produtoObj);

                if (resposta)
                    Alert.alert(`${produtoObj} Alterado com sucesso!`);
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
            setPrecoUnitario(produtoEdit.precoUnitario);
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
                Alert.alert('Não há dados para serem excluidos')

            await carregaDados();
        }
        catch (e) {
            alert(e);
        }
    }

    function confirmaApagarTudo() {

        Alert.alert('Atenção', `Confirma a remoção de todos os produtos?`,
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaExcluiTodosProdutos()
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ])

    }

    //   async function alteraStatusChamado(chamado){

    //     let resposta = (await alteraStatusAtentido(chamado));

    //     if (resposta)
    //       alert(`${chamado.id} teve seu status atualizado para atendido!`);
    //     else
    //       alert('Falhou miseravelmente!');

    //     await carregaDados();

    //   }

    function apagaElemento(id) {
        console.log(id)
        const produto = produtos.find(produto => produto.id == id);
        console.log(produto);
        Alert.alert('Atenção', `Confirma a remoção do produto ${produto.id}?`,
            [
                {
                    text: 'Sim',
                    onPress: () => removerProduto(id),
                },
                {
                    text: 'Não',
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
            <Text style={styles.mainTitle}>Gerenciamento de Produtos</Text>

            <View style={styles.areaBtns}>
                <Text style={styles.legend}>Descrição</Text>
                <TextInput value={descricao} style={styles.txtInput} onChangeText={(text) => { setDescricao(text) }}></TextInput>


            </View>

            <View style={styles.areaBtns}>

                <Text style={styles.legend}>Preço unitário</Text>
                <TextInput value={precoUnitario} style={styles.txtInput} onChangeText={(text) => { setPrecoUnitario(text) }}></TextInput>
            </View>
            <View style={styles.areaBtns}>
                <Text style={styles.legend}>Categoria</Text>
                <Picker
                    selectedValue={categoria}
                    style={styles.selectStyle}
                    onValueChange={(itemValue) => setCategoria(itemValue)}>
                    {
                        categorias.map((categoria, index) =>
                        (
                            <Picker.Item label={categoria} value={categoria} />
                        ))
                    }

                </Picker>
            </View>

            <View style={styles.sideBtns}>

                <TouchableOpacity onPress={async () => { salvarProduto() }} style={styles.btnSalvar}><Text>Salvar</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => { limparCampos() }} style={styles.btnCarregar}><Text>Limpar</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => { confirmaApagarTudo() }} style={styles.btnCarregar}><Text>Limpar Todos</Text></TouchableOpacity>
            </View>

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


function validarSenha(senha, confirmacao) {

    console.log(senha)
    console.log(confirmacao)

    let retorno = senha === confirmacao ? true : false;


    return retorno;

}