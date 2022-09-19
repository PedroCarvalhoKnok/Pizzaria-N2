import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert, Picker } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './ItensVenda/';
import {
    obtemDadosUnitariosTodasVendas,
    obtemProdutosPorVenda,
} from './services/Vendas/dbservices';
import Venda from '../../Venda';




export default function Carrinho() {
    const [id, setId] = useState();
    const [descricaoProduto, setDescricaoProduto] = useState();
    const [idProduto, setIdProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [vendas, setVendas] = useState([])

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


    async function carregaDados() {
        try {

            await obtemDadosUnitariosTodasVendas().then((dadosResponse) => {
                
                let dadosVendas = dadosResponse;

                console.log(dadosVendas);

                dadosVendas.forEach(async venda => {
                    let produtos = await obtemProdutosPorVenda(venda.id);
                    let precoTotal = produtos.map(produto => produto.precoUnitarioProduto).reduce((acc, amount) => acc + amount);
                    vendas.push({id: venda.id, produtos: produtos, precoTotal: precoTotal, dataVenda: venda.dataVenda})
                });

                setVendas(vendas);
            })


        } catch (e) {
            Alert.alert(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Minhas Compras</Text>

            <ScrollView>
                {
                    vendas.map((venda, index) =>
                    (
                        <Venda venda={venda} produtos={venda.produtos} key={index.toString()}></Venda>
                    ))
                }
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}


