import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff5050',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legend: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 30
    },
    txtInput: {
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 10,
        textAlign: 'center',
        fontSize: 18,
        borderBottomWidth: 5,
        borderBottomColor: '#ffa64d',
        marginTop: 10

    },
    pickerStyle: {
        borderWidth: 1,
        borderColor: 'black',
        width: '70%',
        textAlign: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottomWidth: 5,
        borderBottomColor: '#ffa64d',
    },
    mainTitle: {
        fontWeight: 'bold',
        width: '100%',
        height: 90,
        backgroundColor: '#ffa64d',
        padding: 5,
        paddingTop: '10%',
        textAlign: "center",
        color: "#FFF",
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnSalvar: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#ffa64d",
        justifyContent: "center",
        alignContent: "center",
        color: 'white',
        alignItems: 'center',
        marginRight: 20
    },
    btnCarregar: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#ffa64d",
        justifyContent: "center",
        alignContent: "center",
        color: 'white',
        alignItems: 'center',
        marginLeft: 20
    },
    sideView: {
        flexDirection: 'row',
        justifyContent: "center",
        width: '50%'

    },
    sideBtns: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50
    },
    areaBtns: {
        marginTop: 30,
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
        width: '42%',
        flexDirection: 'row',

    },



})

export default styles