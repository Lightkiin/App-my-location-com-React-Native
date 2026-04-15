# My Location App 📍

Aplicativo desenvolvido com **React Native + Expo**, que permite capturar a localização atual do dispositivo, armazená-la em um banco **SQLite**, listar os registros salvos e alternar entre **modo claro e modo escuro**, com preferência persistida usando **AsyncStorage**.

---

## ✨ Funcionalidades

- 📍 Captura da localização atual (latitude e longitude)
- 💾 Armazenamento local usando SQLite
- 📋 Listagem das localizações salvas
- 🌙 Modo escuro com persistência via AsyncStorage
- 🔄 Fallback automático para última localização conhecida (útil em emuladores)

---

## 🛠️ Tecnologias Utilizadas

- **React Native**
- **Expo**
- **react-native-paper** (UI)
- **expo-location**
- **SQLite**
- **AsyncStorage**

---

## 📂 Estrutura de Pastas

```
.
├── App.js
├── db.js
├── assets/
│   ├── colors.json
│   └── colorsDark.json
└── README.md
```

---

## 🚀 Como Executar o Projeto

### 1️⃣ Pré-requisitos

- Node.js instalado
- Não é necessário instalar o Expo CLI globalmente

---

### 2️⃣ Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd my-location-app
npm install
```

---

### 3️⃣ Executar

```bash
npx expo start
```

Abra no emulador ou no aplicativo **Expo Go**.

---

## 🔐 Permissões

O aplicativo solicita permissão de localização em primeiro plano. Caso seja negada, uma mensagem de alerta será exibida.

---

## 🧠 Observações Importantes

- Em **emuladores**, utilize a simulação de localização
- Caso a localização atual falhe, o app tenta buscar a última localização conhecida automaticamente
- O tema escolhido é salvo e restaurado ao abrir o app

---

## 📄 Licença

Este projeto é apenas para fins educacionais.

---

## 👨‍💻 Autor

Desenvolvido por **Brendon Cordova Silveira**
