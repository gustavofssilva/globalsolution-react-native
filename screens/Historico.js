import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistência dos dados
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [novoMes, setNovoMes] = useState('');
  const [novoConsumo, setNovoConsumo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditando, setIsEditando] = useState(false);
  const [editarItem, setEditarItem] = useState(null);

  // Função para carregar os dados históricos
  const carregarHistorico = async () => {
    try {
      const dados = await AsyncStorage.getItem('@historico_consumo');
      if (dados !== null) {
        setHistorico(JSON.parse(dados));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico', error);
    }
  };

  // Função para salvar os dados históricos
  const salvarHistorico = async (novosHistoricos) => {
    try {
      await AsyncStorage.setItem('@historico_consumo', JSON.stringify(novosHistoricos));
      setHistorico(novosHistoricos);
    } catch (error) {
      console.error('Erro ao salvar histórico', error);
    }
  };

  // Função para adicionar um novo registro de consumo
  const adicionarHistorico = async () => {
    if (!novoMes || !novoConsumo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novoRegistro = { mes: novoMes, consumo: parseFloat(novoConsumo) };
    const novosHistoricos = [...historico, novoRegistro];

    salvarHistorico(novosHistoricos);
    setModalVisible(false); // Fecha o modal
    setNovoMes(''); // Limpa o campo do mês
    setNovoConsumo(''); // Limpa o campo de consumo
  };

  // Função para editar um registro existente
  const editarHistorico = async () => {
    if (!novoMes || !novoConsumo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novosHistoricos = historico.map(item => {
      if (item.mes === editarItem.mes) {
        return { mes: novoMes, consumo: parseFloat(novoConsumo) };
      }
      return item;
    });

    salvarHistorico(novosHistoricos);
    setModalVisible(false); // Fecha o modal
    setIsEditando(false);
    setNovoMes(''); // Limpa o campo do mês
    setNovoConsumo(''); // Limpa o campo de consumo
    setEditarItem(null); // Limpa o item em edição
  };

  // Função para excluir um registro
  const excluirHistorico = (mes) => {
    const novosHistoricos = historico.filter(item => item.mes !== mes);
    salvarHistorico(novosHistoricos);
  };

  // Função para gerar gráfico
  const gerarGrafico = () => {
    const meses = historico.map(item => item.mes);
    const consumos = historico.map(item => item.consumo);

    return (
      <LineChart
        data={{
          labels: meses,
          datasets: [{ data: consumos }],
        }}
        width={screenWidth - 30}
        height={220}
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
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
      />
    );
  };

  // Função para renderizar cada item da lista de histórico
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Mês: {item.mes}</Text>
      <Text style={styles.itemText}>Consumo: {item.consumo} kWh</Text>

      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => {
            setIsEditando(true);
            setEditarItem(item);
            setNovoMes(item.mes);
            setNovoConsumo(item.consumo.toString());
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => excluirHistorico(item.mes)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    carregarHistorico();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Consumo Energético</Text>

      {/* Gráfico de consumo mensal */}
      {historico.length > 0 ? gerarGrafico() : null}

      {/* Lista de históricos */}
      <FlatList
        data={historico}
        keyExtractor={(item) => item.mes}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Botão para adicionar um novo dado */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Consumo</Text>
      </TouchableOpacity>

      {/* Modal para inserção de dados */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditando ? 'Editar Consumo' : 'Adicionar Consumo'}</Text>

            <TextInput
              style={styles.input}
              placeholder="Mês (ex: Jan)"
              value={novoMes}
              onChangeText={setNovoMes}
            />

            <TextInput
              style={styles.input}
              placeholder="Consumo (em kWh)"
              keyboardType="numeric"
              value={novoConsumo}
              onChangeText={setNovoConsumo}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={isEditando ? editarHistorico : adicionarHistorico}
            >
              <Text style={styles.modalButtonText}>{isEditando ? 'Salvar Alterações' : 'Adicionar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  list: {
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3, // Sombra para destacar o card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 18,
    color: '#555',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonEdit: {
    backgroundColor: '#ffb74d',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonDelete: {
    backgroundColor: '#e57373',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00b0ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: '#00b0ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});
