import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert, Picker } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './styles';
import Carrinho from '../../Carrinho';
import {
    obtemTodositensCarrinho,
    adicionarVenda,
    excluiItem
} from './services/Carrinho/dbservices';




export default function Carrinho() {
    const [id, setId] = useState();
    const [descricaoProduto, setDescricaoProduto] = useState();
    const [idProduto, setIdProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [itensCarrinho, setItensCarrinho] = useState([])
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

    function dataFormatada() {
        var dataAtual = new Date();
        var data = dataAtual.getDay() + "/" + dataAtual.getMonth()
            + "/" + dataAtual.getFullYear() + " "
            + dataAtual.getHours() + ":"
            + dataAtual.getMinutes() + ":" + dataAtual.getSeconds();

        return data
    }


    async function efetivarVenda() {

        try {

            let idVenda = criarNovoId();
            let dataVenda = dataFormatada();

            itensCarrinho.forEach(async item => {

                let vendaObj = {
                    id: idVenda,
                    idProduto: item.idProduto,
                    descricaoProduto: item.descricaoProduto,
                    precoUnitarioProduto: item.precoUnitarioProduto,
                    dataVenda: dataVenda
                };

                let resposta = (await adicionarVenda(vendaObj));

                if (resposta)
                    Alert.alert(`${vendaObj} adicionada com sucesso!`);
                else
                    Alert.alert('Falhou miseravelmente!');

                console.log(vendaObj)

            });

            Keyboard.dismiss();
            alert('Dados salvos com sucesso!!!');
            await carregaDados();
        }
        catch (e) {
            Alert.alert(e);
        }

    }

    function confirmaEfetivarVenda() {

        Alert.alert('Atenção', `Confirma a efetivação da venda?`,
            [
                {
                    text: 'Sim',
                    onPress: () => efetivarVenda(),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ])

    }

    function confirmaRemoverItem(id) {
        console.log(id)
        const item = itensCarrinho.find(item => item.id == id);
        console.log(item);
        Alert.alert('Atenção', `Confirma a remoção do item ${item.descricao}?`,
            [
                {
                    text: 'Sim',
                    onPress: () => removerItem(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ])


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

            await obtemTodositensCarrinho().then((carrinhoResponse) => {

                let itensCarrinho = carrinhoResponse;
                console.log(itensCarrinho)
                setItensCarrinho(itensCarrinho);
            })


        } catch (e) {
            alert(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Meu Carrinho</Text>


            <View style={styles.sideBtns}>

                <TouchableOpacity onPress={async () => { confirmaEfetivarVenda() }} style={styles.btnSalvar}><Text>Efetivar Venda</Text></TouchableOpacity>

            </View>

            <ScrollView>
                {
                    setItensCarrinho.map((item, index) =>
                    (
                        <Carrinho item={item} key={index.toString()} confirmaRemoverItem={confirmaRemoverItem}></Carrinho>
                    ))
                }
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}


