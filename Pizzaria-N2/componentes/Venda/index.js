import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";

import styles from "./styles";
import ItensVenda from "../ItensVenda";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function Venda({ venda, produtos }) {
  return (
    <View style={styles.usuario}>
      <View style={{flexDirection: 'column', alignContent: 'center'}}>
        <Text style={styles.listaNome}>Venda</Text>
        <Text style={styles.listaNome}>{venda.id}</Text>
      </View>
     

      <View>
        <Text style={styles.listaNome}>Itens vendidos</Text>
      </View>

      <ScrollView style={{width: 200, height: 200}}>
        {produtos.map((produto, index) => (
          <ItensVenda key={index} produto={produto}></ItensVenda>
        ))}
      </ScrollView>


      <View style={{flexDirection: 'column', alignContent: 'center', }}>
        <Text style={styles.listaNome}>Preço Total</Text>
        <Text style={styles.listaNome}>R$ {venda.precoTotal}</Text>
        <Text style={styles.listaNome}>Data da venda</Text>
        <Text style={styles.listaNome}>{venda.dataVenda}</Text>
      </View>

     
    </View>
  );
}
