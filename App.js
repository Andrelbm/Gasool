import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const image = "./assets/background.jpg";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      etanol: 0,
      gasolina: 0,
      resultado: 0,
      resultadoTexto: "",
      teste: 0,
    };
    this.calculo = this.calculo.bind(this);
  }

  ShowHideTextComponentView = () => {
    this.setState({ status: true });
  };

  calculo() {
    let gasolina1 = this.state.gasolina;
    let etanol1 = this.state.etanol;

    gasolina1 = gasolina1.toString().replace(",", ".");
    etanol1 = etanol1.toString().replace(",", ".");

    let a = this.state;

    a.teste = etanol1;

    let resto = etanol1 / gasolina1;

    let s = this.state;

    s.resultado = resto * 100;

    this.setState(s);

    if (s.resultado > 70) {
      s.resultadoTexto = "É mais vantajoso abastecer com Gasolina.";
    } else {
      s.resultadoTexto = "É mais vantajoso abastecer com Etanol.";
    }
  }

  funcaoCombinada() {
    this.calculo();
    this.ShowHideTextComponentView();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require(image)} style={styles.imagemfundo}>
          <StatusBar
            hidden={false}
            backgroundColor="#14b0bf"
            translucent={false}
          />

          <View style={styles.box1}>
            <Text style={styles.textoCabeçalho}>
              {" "}
              Gasool - Gasolina ou Etanol
            </Text>
          </View>

          <Text style={styles.aprestacao}>
            Descubra de maneira rápida qual o combustível mais vantajoso {"\n"}{" "}
            para abastecer.
          </Text>

          <View style={styles.inputbox}>
            <Text style={styles.labelgaso}> </Text>
            <TextInput
              label="Informe o preço da Gasolina"
              mode="outlined"
              activeOutlineColor="#14b0bf"
              keyboardType="numeric"
              style={styles.input1}
              onChangeText={(gasolina) => {
                this.setState({ gasolina });
              }}
            />
            <Text style={styles.labeletanol}> </Text>
            <TextInput
              label="Informe o preço da Etanol"
              mode="outlined"
              activeOutlineColor="#14b0bf"
              keyboardType="numeric"
              style={styles.input1}
              onChangeText={(etanol) => {
                this.setState({ etanol });
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.funcaoCombinada()}
              onPressIn={() => Keyboard.dismiss()}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>
            <Text style={styles.aprestacao1}>
              ( Caso o preço do Etanol represente mais de 70% do preço da
              Gasolina, é mais vantajoso abastecer com Gasolina.)
            </Text>
          </View>

          {this.state.status ? (
            <View style={styles.box2}>
              <Text style={styles.resultado1}>{this.state.resultadoTexto}</Text>

              <Text style={styles.resultado}>
                O valor do Etanol representa {this.state.resultado.toFixed(1)}%
                do valor da Gasolina.
              </Text>
            </View>
          ) : null}
        </ImageBackground>

        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-8798044938389788/4920816276" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds={true} // true or false
          onDidFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },

  imagemfundo: {
    flex: 1,
    resizeMode: "cover",
  },
  aprestacao: {
    fontSize: 20,
    textAlign: "center",
  },

  aprestacao1: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },

  labelgaso: {
    fontWeight: "bold",
  },

  labeletanol: {
    fontWeight: "bold",
  },

  inputbox: {
    alignItems: "center",
  },

  text: {
    marginTop: 3,
    fontSize: 20,
    alignSelf: "center",
  },

  text1: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: "center",
  },

  input1: {
    fontSize: 18,
    width: "90%",
    textAlign: "center",
    backgroundColor: "white",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#14b0bf",
    width: "90%",
    height: 55,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    elevation: 10,
    marginTop: 25,
  },

  buttonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },

  box1: {
    padding: 15,
    width: "100%",
    backgroundColor: "#14b0bf",
    elevation: 4,
    borderTopWidth: 1,
  },

  textoCabeçalho: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  box2: {
    alignSelf: "center",
    marginTop: 20,
    width: "90%",
    height: 150,
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
  },

  resultado: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },

  resultado1: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
});