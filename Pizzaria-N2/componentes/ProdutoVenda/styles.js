import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legend: {
        fontSize: 30,
        color: '#2B6F89',
        fontWeight: 'bold',
    },
    txtInput: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        textAlign: 'center',
        fontSize: 18,
        borderBottomWidth: 5,
        borderBottomColor: '#5eb528',
        marginTop:10

    },
    mainTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        width: '90%',
        backgroundColor: 'black',
        padding: 5,
        paddingTop: '10%',
        textAlign: "center",
        color: "#FFF",
        borderRadius: 5
    },
    listaNome: {
        fontSize: 15
    },
    btnSalvar: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "blue",
        justifyContent: "center",
        alignContent: "center",
        color: 'white',
        alignItems: 'center',
        
    },
    btnCarregar: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "blue",
        justifyContent: "center",
        alignContent: "center",
        color: 'white',
        alignItems: 'center'
    },
    sideView: {
        flexDirection: 'row',
        justifyContent: "center",
        width: '50%'
        
    },
    sideBtns: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    areaBtns:{
        marginTop: 0,
        justifyContent: "space-between",
        flexDirection: 'column',
        width: "100%",
        alignItems: 'center'
    },
    usuario: {
        backgroundColor: '#ed8f1c',
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 80,
        width: '100%',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        
    },
    listaCampo: {
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
    },
    listaTelefone: {
        color: "#FFF",
        fontSize: 18,
    },
    dadosBotoesAcao: {
        width: '30%',
        flexDirection: 'row',
        
    },



})

export default styles