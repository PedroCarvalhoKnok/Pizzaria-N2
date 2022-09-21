import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


export default function Categoria({ categoria, apagaElemento, carregaEditar }) {
    return (
        <View style={styles.usuario}>

            <View>
                <Text style={styles.listaNome}>Descrição</Text>
                <Text style={styles.listaNome}> {categoria.descricao}</Text>
            </View>
            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => apagaElemento(categoria.id)}>
                    <MaterialIcons name="delete" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => carregaEditar(categoria.id)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};