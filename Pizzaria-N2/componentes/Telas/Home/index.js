import { react, useState, useEffect  } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

import {
    createTables
} from '../../../services/Home/dbservices';

export default function Home({ navigation }) {

    let tabelasCriadas = false;

    useEffect(
        () => {
            processamentoUseEffect();
            console.log('useEffect');
        }, []);

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
            console.log("Verificando necessidade de criar tabelas...");
            tabelasCriadas = true;
            await createTables();
        }

        console.log("UseEffect...");
        
    }

    return (
        <View style={styles.container}>

           
            <Image style={{height: 200, width: 200, marginBottom: 50, borderRadius: 10}} source={require('../../../assets/nopontologo.png')} />

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Produtos')}>
                <Text>Gerenciamento de Produtos</Text>
                <MaterialIcons name="local-parking" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('ProdutosVenda')}>
                <Text>Cardápio</Text>
                <MaterialIcons name="local-pizza" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Vendas')}>
                <Text>Minhas Vendas</Text>
                <MaterialIcons name="attach-money" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Carrinhos')}>
                <Text>Carrinho</Text>
                <Ionicons name="cart" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Categorias')}>
                <Text>Gerenciamento de Categorias</Text>
                <MaterialIcons name="category" size={32} color="white" />
            </TouchableOpacity>

        </View>

    );

}