import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert, Picker } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './styles';
import {
    obtemDadosUnitariosTodasVendas,
    obtemProdutosPorVenda,
} from '../../../services/Vendas/dbservices';

import Venda from '../../Venda';




export default function Vendas({ navigation }) {
    const [id, setId] = useState();
    const [descricaoProduto, setDescricaoProduto] = useState();
    const [idProduto, setIdProduto] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [vendas, setVendas] = useState([])

    useEffect(
        () => {
            processamentoUseEffect();
        }, []);


    async function processamentoUseEffect() {
        console.log('carrega dados chamado');
        await carregaDados();
    }



    async function carregaDados() {
        try {

            let dadosResponse = await obtemDadosUnitariosTodasVendas().then(dados => { return dados });
            produtosFim = [];

            for (venda of dadosResponse) {

                let produtos = await obtemProdutosPorVenda(venda.id);

                console.log(produtos)

                let precoTotal = produtos.map(produto => produto.precoUnitarioProduto).reduce((acc, amount) => acc + amount);


                produtosFim.push({ id: venda.id, produtos: produtos, precoTotal: precoTotal, dataVenda: venda.dataVenda })
            }


            setVendas(produtosFim);


        } catch (e) {
            Alert.alert(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Minhas Vendas</Text>
            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Home')}>
                <Text>Menu</Text>
            </TouchableOpacity>

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


