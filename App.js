import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importando ícones
import Monitoramento from './screens/Monitoramento';
import Historico from './screens/Historico';
import CalculoConsumo from './screens/CalculoConsumo';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Monitoramento') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Histórico') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Calculadora') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Retorna o componente de ícone
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Monitoramento" component={Monitoramento} />
        <Tab.Screen name="Histórico" component={Historico} />
        <Tab.Screen name="Calculadora" component={CalculoConsumo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
