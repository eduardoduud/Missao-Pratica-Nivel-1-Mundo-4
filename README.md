# Aplicativo de Fornecedores

## Visão Geral

Este aplicativo permite que os usuários cadastrem fornecedores, incluindo informações como nome, endereço, contato, categoria e uma imagem associada. Todos os dados são armazenados localmente no dispositivo do usuário usando o AsyncStorage. A navegação é feita através de uma interface de navegação em abas.

## Estrutura do Aplicativo

O aplicativo é composto por três principais componentes:

1. **AppNavigator**: Gerencia a navegação entre as telas.
2. **Tela de Cadastro de Fornecedor**: Permite ao usuário cadastrar novos fornecedores.
3. **Tela de Listagem de Fornecedores**: Exibe a lista de fornecedores cadastrados.

### 1. AppNavigator

O AppNavigator usa `createBottomTabNavigator` para criar uma navegação em abas entre as telas de "Cadastrar Fornecedor" e "Lista de Fornecedores". Os ícones são gerados usando Ionicons, que mudam de acordo com a aba selecionada. As cores dos ícones das abas mudam entre azul (ativo) e cinza (inativo), melhorando a experiência do usuário.

### 2. Tela de Cadastro de Fornecedor

Nesta tela, os usuários podem inserir as informações do fornecedor, como nome, endereço, contato, categoria e uma imagem. O método de seleção de imagem solicita permissão para acessar a galeria e permite que o usuário escolha uma imagem. Após preencher todos os campos, os dados do fornecedor são validados e salvos no AsyncStorage.

### 3. Tela de Listagem de Fornecedores

A tela de listagem carrega os fornecedores salvos no AsyncStorage e os exibe em uma lista. Os usuários podem visualizar as informações de cada fornecedor em cartões e também têm a opção de atualizar a lista manualmente.

## Dependências

- **React Native**: O framework principal utilizado para construir o aplicativo.
- **React Navigation**: Para gerenciar a navegação entre as telas.
- **Expo Image Picker**: Para selecionar imagens da galeria do dispositivo.
- **Async Storage**: Para armazenar dados localmente no dispositivo.

## Execução do Aplicativo

1. **Instalação**: Clone o repositório e instale as dependências.
2. **Executar**: Inicie o aplicativo em um simulador ou dispositivo real.
3. **Interação**: Adicione fornecedores usando o formulário e visualize-os na lista.

## Conclusão

Este aplicativo fornece uma interface simples e eficaz para gerenciar fornecedores, armazenando todas as informações localmente. A utilização do AsyncStorage garante que os dados sejam persistentes mesmo após o fechamento do aplicativo. A navegação em abas proporciona uma experiência de usuário intuitiva e fácil.
