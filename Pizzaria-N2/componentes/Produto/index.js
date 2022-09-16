import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


export default function Produto({ produto, apagaElemento, carregaEditar }) {
    return (
        <View style={styles.usuario}>


            <View>
                <Text style={styles.listaNome}> {produto.descricao}</Text>
            </View>

            <View>
                <Text style={styles.listaNome}> {produto.categoria}</Text>
                <Text style={styles.listaNome}> {produto.precoUnitario}</Text>
            </View>
            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => apagaElemento(produto.id)}>
                    <MaterialIcons name="delete" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => carregaEditar(produto.id)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};