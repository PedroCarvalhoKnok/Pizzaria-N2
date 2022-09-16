import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


export default function ProdutoVenda({ produtoVenda, adicionarCarrinho }) {
    return (
        <View style={styles.usuario}>


            <View>
                <Text style={styles.listaNome}> {produtoVenda.id}</Text>
                <Text style={styles.listaNome}> {produtoVenda.dataVenda}</Text>
            </View>

            <View>
            <Text style={styles.listaNome}> {produtoVenda.idProduto}</Text>
            <Text style={styles.listaNome}> {produtoVenda.descricaoProduto}</Text>
            <Text style={styles.listaNome}> {produtoVenda.categoria}</Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
               
                <TouchableOpacity onPress={() => adicionarCarrinho(produtoVenda)}>
                    <MaterialIcons name="delete" size={32} color="red" />
                </TouchableOpacity>

            </View>
        </View>
    );

};