import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


export default function ProdutoVenda({ produtoVenda, confirmaAdicionarCarrinho }) {
    return (
        <View style={styles.usuario}>


            <View>
                <Text style={styles.listaNome}>Preço Unitário</Text>
                <Text style={styles.listaNome}>{produtoVenda.precoUnitario}</Text>
            </View>

            <View>
            <Text style={styles.listaNome}>Descrição {produtoVenda.descricao}</Text>
            <Text style={styles.listaNome}>Categoria {produtoVenda.categoria}</Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
               
                <TouchableOpacity onPress={() => confirmaAdicionarCarrinho(produtoVenda)}>
                    <MaterialIcons name="add-shopping-cart" size={32} color="white" />
                </TouchableOpacity>

            </View>
        </View>
    );

};