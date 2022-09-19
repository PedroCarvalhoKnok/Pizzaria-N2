import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Button, Alert, Picker } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from './componentes/Categoria/styles';
import Categoria from '../../Categoria';
import {
    obtemTodasCategorias,
    adicionarCategoria,
    alterarCategoria,
    excluirCategoria,
    excluirTodasCategorias
} from './services/Categorias/dbservices';




export default function Categorias() {
    const [id, setId] = useState();
    const [descricao, setDescricao] = useState();
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


    async function salvarCategoria() {

        let novoRegistro = id == undefined;

        console.log(novoRegistro)

        let categoriaObj = {
            id: novoRegistro ? criarNovoId() : id,
            descricao: descricao,
        };

        console.log(categoriaObj)

        try {
            if (novoRegistro) {

                let resposta = (await adicionarCategoria(categoriaObj));

                if (resposta)
                    Alert.alert(`${categoriaObj} adicionado com sucesso!`);
                else
                    Alert.alert('Falhou miseravelmente!');
            }
            else {

                let resposta = await alterarCategoria(categoriaObj);

                if (resposta)
                    Alert.alert(`${categoriaObj} Alterado com sucesso!`);
                else
                    Alert.alert('Falhou miseravelmente!');
            }
            Keyboard.dismiss();
            Alert.alert('Dados salvos com sucesso!!!');
            limparCampos();
            await carregaDados();
        }
        catch (e) {
            Alert.alert(e);
        }

    }

    async function carregaDados() {
        try {
            await obtemTodasCategorias().then((categoriasResponse) => {

                let categorias = categoriasResponse;
                console.log(categorias)
                setCategorias(categorias);
            })


        } catch (e) {
            Alert.alert(e);
        }
    }

    function carregaEditar(id) {
        const categoriaEdit = categorias.find(categoria => categoria.id == id);
        console.log(categoriaEdit);
        if (categoriaEdit != undefined) {
            setId(categoriaEdit.id);
            setDescricao(categoriaEdit.descricao);
        }

        console.log(categoriaEdit);
    }

    async function limparCampos() {

        setDescricao("");
        setId(undefined);
        Keyboard.dismiss();
    }

    async function efetivaExcluiTodasCategorias() {
        try {
            let resposta = await excluirTodasCategorias();
            console.log(resposta)
            if (resposta)
                Alert.alert('categorias excluidos com sucesso')
            else
                Alert.alert('Não há dados para serem excluidos')

            await carregaDados();
        }
        catch (e) {
            Alert.alert(e);
        }
    }

    function confirmaApagarTudo() {

        Alert.alert('Atenção', `Confirma a remoção de todos as categorias?`,
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaExcluiTodasCategorias()
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ])

    }

    function apagaElemento(id) {
        console.log(id)
        const categoria = categorias.find(categoria => categoria.id == id);
        console.log(categoria);
        Alert.alert('Atenção', `Confirma a remoção da categoria ${categoria.descricao}?`,
            [
                {
                    text: 'Sim',
                    onPress: () => removerCategoria(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ])


    }

    async function removerCategoria(id) {
        try {
            await excluirCategoria(id);
            Keyboard.dismiss();
            limparCampos();
            await carregaDados();
            alert(`Categoria ${id} apagada com sucesso!!!`);
        } catch (e) {
            Alert.alert(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Gerenciamento de Categorias</Text>

            <View style={styles.areaBtns}>

                <Text style={styles.legend}>Descrição</Text>
                <TextInput value={descricao} style={styles.txtInput} onChangeText={(text) => { setDescricao(text) }}></TextInput>

            </View>

            <View style={styles.sideBtns}>

                <TouchableOpacity onPress={async () => { salvarCategoria() }} style={styles.btnSalvar}><Text>Salvar</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => { limparCampos() }} style={styles.btnCarregar}><Text>Limpar</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => { confirmaApagarTudo() }} style={styles.btnCarregar}><Text>Limpar Todos</Text></TouchableOpacity>
            </View>

            <ScrollView>
                {
                    categorias.map((categoria, index) =>
                    (
                        <Categoria categoria={categoria} key={index.toString()} apagaElemento={apagaElemento} carregaEditar={carregaEditar}></Categoria>
                    ))
                }
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

