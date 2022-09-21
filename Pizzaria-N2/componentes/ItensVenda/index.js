import { Text, TouchableOpacity, View, Image } from "react-native";

import styles from "./styles";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function ItensVenda({ produto }) {
  return (
    <View style={styles.usuario}>
      

      <View style={styles.usuario}>
        <Text style={styles.listaNome}>Descrição {produto.descricaoProduto}</Text>
        <Text style={styles.listaNome}>Categoria {produto.categoriaProduto}</Text>
        <Text style={styles.listaNome}>Preço R$ {produto.precoUnitarioProduto}</Text>
      </View>
    </View>
  );
}
