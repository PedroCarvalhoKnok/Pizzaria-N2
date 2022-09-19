import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";

import styles from "./styles";
import ItensVenda from "../ItensVenda";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function Venda({ venda, produtos }) {
  return (
    <View style={styles.usuario}>
      <View>
        <Text style={styles.listaNome}>Venda {venda.id}</Text>
      </View>

      <ScrollView>
        {produtos.map((produto, index) => (
          <ItensVenda produto={produto}></ItensVenda>
        ))}
      </ScrollView>

      <View>
        <Text style={styles.listaNome}>Preço Total: {venda.precoTotal}</Text>
        <Text style={styles.listaNome}>Data da venda: {venda.dataVenda}</Text>
      </View>
    </View>
  );
}
