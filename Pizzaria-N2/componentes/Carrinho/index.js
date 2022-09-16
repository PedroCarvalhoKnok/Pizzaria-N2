import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';


export default function Carrinho({ item, confirmaRemoverItem }) {
    return (
        <View style={styles.usuario}>

            <View>
                <Text style={styles.listaNome}> {item.descricao}</Text>
                <Text style={styles.listaNome}> {item.precoUnitario}</Text>
            </View>

            <View>
                <Text style={styles.listaNome}> {item.categoria}</Text>
            </View>

            <View style={styles.dadosBotoesAcao}>

                <TouchableOpacity onPress={() => confirmaRemoverItem(item.id)}>
                    <MaterialIcons name="delete" size={32} color="red" />
                </TouchableOpacity>

            </View>
        </View>
    );

};