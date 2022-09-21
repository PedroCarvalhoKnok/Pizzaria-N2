import { Text, TouchableOpacity, View, Image } from "react-native";

import styles from "./styles";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function ItensVenda({ produto }) {
  return (
    <View style={styles.usuario}>
      

      <View style={styles.usuario}>
        <Text style={styles.listaNome}>Descrição</Text>
        <Text style={styles.listaNome}>{produto.descricaoProduto}</Text>
        <Text style={styles.listaNome}>Categoria</Text>
        <Text style={styles.listaNome}>{produto.categoriaProduto}</Text>
        <Text style={styles.listaNome}>Preço</Text>
        <Text style={styles.listaNome}>R$ {produto.precoUnitarioProduto}</Text>
      </View>
    </View>
  );
}
