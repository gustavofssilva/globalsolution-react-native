// screens/Monitoramento.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação corrigida
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Monitoramento() {
  const [dispositivoSelecionado, setDispositivoSelecionado] = useState('geladeira');

  // Dados fictícios de consumo mensal (em kWh) para vários dispositivos
  const dadosConsumo = {
    geladeira: [100, 120, 110, 115, 130, 120, 125, 140, 145, 150, 160, 170], // Consumo mensal da geladeira
    arCondicionado: [200, 180, 220, 210, 250, 260, 240, 230, 220, 210, 200, 190], // Consumo mensal do ar-condicionado
    computador: [50, 60, 55, 58, 65, 70, 72, 75, 80, 85, 90, 95], // Consumo mensal do computador
    microondas: [30, 25, 28, 32, 35, 30, 27, 34, 30, 33, 35, 38], // Consumo mensal do microondas
  };

  // Função para gerar o gráfico baseado no dispositivo selecionado
  const gerarGrafico = () => {
    const consumo = dadosConsumo[dispositivoSelecionado];
    const labels = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ];

    return (
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: consumo,
            },
          ],
        }}
        width={screenWidth - 40} // Largura do gráfico
        height={220} // Altura do gráfico
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 204, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 16,
          borderRadius: 16,
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monitoramento Energético por Eletrodoméstico</Text>
      <Text style={styles.subTitle}>Escolha o dispositivo para visualizar o consumo mensal:</Text>

      {/* Filtro de seleção de dispositivo */}
      <Picker
        selectedValue={dispositivoSelecionado}
        style={styles.picker}
        onValueChange={(itemValue) => setDispositivoSelecionado(itemValue)}
      >
        <Picker.Item label="Geladeira" value="geladeira" />
        <Picker.Item label="Ar Condicionado" value="arCondicionado" />
        <Picker.Item label="Computador" value="computador" />
        <Picker.Item label="Microondas" value="microondas" />
      </Picker>

      {/* Exibe o gráfico de consumo mensal do dispositivo selecionado */}
      {gerarGrafico()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 30,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
