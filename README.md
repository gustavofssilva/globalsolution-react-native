<h1>📱 Projeto React Native</h1>

<p>Bem-vindo ao projeto React Native! Este guia irá orientá-lo sobre como acessar, instalar e executar o projeto de forma rápida e simples.</p>

<h2>🚀 Pré-requisitos</h2>
<p>Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:</p>
<ul>
    <li><strong>Node.js</strong> (Versão LTS recomendada) – <a href="https://nodejs.org/">Baixar Node.js</a></li>
    <li><strong>Yarn</strong> (opcional, mas recomendado) – <a href="https://classic.yarnpkg.com/en/docs/install">Instalar Yarn</a></li>
    <li><strong>Expo CLI</strong> ou <strong>React Native CLI</strong> (dependendo do projeto) – <a href="https://docs.expo.dev/get-started/installation/">Instalar Expo CLI</a> ou <a href="https://reactnative.dev/docs/environment-setup">Instalar React Native CLI</a></li>
</ul>

<h2>📥 Clonar o Repositório</h2>
<p>Clone o repositório para sua máquina local:</p>
<pre><code>git clone https://github.com/gustavofssilva/globalsolution-react-native.git
</code></pre>

<p>Entre na pasta do diretório</p>
<pre><code>cd meuApp
</code></pre>

<h2>📦 Instalação das Dependências</h2>
<p>Instale as dependências do projeto usando NPM :</p>
<p><strong>Com NPM:</strong></p>
<pre><code>npm install</code></pre>

<h2>🏃‍♂️ Executar o Projeto</h2>
<pre><code>npx expo start</code></pre>
<p>Abra o aplicativo Expo Go no seu dispositivo móvel e digitalize o QR code exibido no terminal para visualizar o aplicativo.</p>

<h1>Descrição Técnica do App</h1>

<h2>1. Estrutura de Navegação 🚀</h2>
<ul>
    <li>O aplicativo utiliza a biblioteca <strong>React Navigation</strong> para gerenciar a navegação entre diferentes telas (Monitoramento, Historico, CalculoConsumo).</li>
    <li>A navegação é baseada em pilhas (<strong>stack navigation</strong>), permitindo transições suaves entre as telas e a capacidade de voltar às telas anteriores.</li>
</ul>

<h2>2. Tela de Monitoramento (Monitoramento) 🏠</h2>
<ul>
    <li>Apresenta um gráfico com opção de troca de elétrodoméstico.</li>
    <li>Contém botões de navegação para as telas de <strong>Histórico</strong> e <strong>Calculadora</strong>.</li>
    <li>Os botões redirecionam para as respectivas telas usando a função de navegação.</li>
</ul>

<h2>3. Tela de Histórico (Historico) 🔐</h2>
<ul>
    <li>Botão de adicionar Consumo.</li>
    <li>Após adicionar, será possivel ver um gráfico.</li>
    <li>É possivel editar ou excluir após adicionar seu histórico de consumo.</li>
</ul>

<h2>4. Tela de Calculadora (CalculoConsumo) 📝</h2>
<ul>
    <li>Contém espaços para adicionar informações</li>
    <li>A calculadora vai fazer um calcular seu consumo de acordo com as informações do usuário</li>
    <li>Inclui um botão <strong>"Calcular Consumo"</strong> para prosseguir.</li>
</ul>

<h2>5. Estilização 🎨</h2>
<ul>
    <li>Utiliza componentes do <strong>React Native</strong> para estilização, como <strong>View</strong>, <strong>Text</strong>, <strong>TextInput</strong> e <strong>Tab.Navigator</strong>.</li>
    <li>A aplicação tem uma aparência moderna e responsiva, utilizando <strong>Dimensions</strong> para garantir que os elementos se ajustem a diferentes tamanhos de tela.</li>
</ul>



</body>
</html>
