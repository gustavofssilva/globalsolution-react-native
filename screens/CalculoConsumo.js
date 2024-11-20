import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CalculoConsumo() {
  const [nomeAparelho, setNomeAparelho] = useState('');
  const [potencia, setPotencia] = useState('');
  const [horasDiarias, setHorasDiarias] = useState('');
  const [diasMes, setDiasMes] = useState('');
  const [tarifa, setTarifa] = useState('');
  const [resultadoKWh, setResultadoKWh] = useState(null);
  const [resultadoPreco, setResultadoPreco] = useState(null);

  const calcularConsumo = () => {
    // Convertendo os valores de potência (W), horas e dias para o cálculo
    const potenciaEmKw = parseFloat(potencia) / 1000; // converter de watts para kilowatts
    const horas = parseFloat(horasDiarias);
    const dias = parseInt(diasMes);
    const preco = parseFloat(tarifa);

    // Calculando o consumo em KWh
    const consumoKWh = potenciaEmKw * horas * dias;
    
    // Calculando o preço do consumo
    const custoTotal = consumoKWh * preco;

    // Atualizando os estados com os resultados
    setResultadoKWh(consumoKWh.toFixed(2));
    setResultadoPreco(custoTotal.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Consumo de Energia</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Aparelho"
        value={nomeAparelho}
        onChangeText={setNomeAparelho}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Potência (Watts)"
        keyboardType="numeric"
        value={potencia}
        onChangeText={setPotencia}
      />

      <TextInput
        style={styles.input}
        placeholder="Horas de Uso Diárias"
        keyboardType="numeric"
        value={horasDiarias}
        onChangeText={setHorasDiarias}
      />

      <TextInput
        style={styles.input}
        placeholder="Dias por Mês"
        keyboardType="numeric"
        value={diasMes}
        onChangeText={setDiasMes}
      />

      <TextInput
        style={styles.input}
        placeholder="Tarifa de Energia (R$/kWh)"
        keyboardType="numeric"
        value={tarifa}
        onChangeText={setTarifa}
      />

      <Button title="Calcular Consumo" onPress={calcularConsumo} />

      {resultadoKWh !== null && (
        <View style={styles.result}>
          <Text>Consumo Total: {resultadoKWh} kWh</Text>
          <Text>Custo Total: R$ {resultadoPreco}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    alignItems: 'center',
  },
});
