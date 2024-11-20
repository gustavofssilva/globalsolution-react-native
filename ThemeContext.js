import React, { createContext, useState, useContext } from 'react';

// Criando o contexto para o tema
const ThemeContext = createContext();

// Função para fornecer o tema e a função para alternar o tema
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Componente que envolve o aplicativo com o tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Definindo o estado inicial do tema (claro)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Alterna o estado do tema
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
