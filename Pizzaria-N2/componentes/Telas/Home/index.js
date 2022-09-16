import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

import {
    createTables
} from './services/Home/dbservices';

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
        await carregaDados();
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Escolha uma tela</Text>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Produtos')}>
                <Text>Gerenciamento de Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('ProdutosVenda')}>
                <Text>Gerenciamento de Vendas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Vendas')}>
                <Text>Lista de Vendas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Carrinho')}>
                <Text>Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Categorias')}>
                <Text>Gerenciamento de Categorias</Text>
            </TouchableOpacity>

        </View>

    );

}