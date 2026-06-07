
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import CryptoJS from 'crypto-js';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Provider, Button, Card } from 'react-native-paper';

const cor = '#c2185b';
const usuarioPadrao = 'rodrigo';

const senhaHash = CryptoJS.SHA256('123456').toString();
//OPÇOES DE UNHAS
const servicos = [
  {
    id: '1',
    nome: 'Francesinha',
    valor: 50,
    img: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg?auto = compress&cs = tinysrgb&w = 600',
  },
  {
    id: '2',
    nome: 'Acrigel',
    valor: 100,
    img: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto = compress&cs = tinysrgb&w = 600',
  },
  {
    id: '3',
    nome: 'Nude',
    valor: 60,
    img: 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto = compress&cs = tinysrgb&w = 600',
  },
];
//DIAS E HORARIOS
const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00'];

function Logo() {
  return (
    <View style = {s.logo}>
      <Icon name = "hand-heart" size = {52} color = "#fff" />
      <Text style = {s.logoTxt}>Milly Unhas</Text>
    </View>
  );
}

export default function App() {
  const [page, setPage] = useState('login');

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('0');

  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');

  function resetar() {
    setServico('');
    setValor('0');
    setDia('');
    setHorario('');
    setPage('home');
  }
function fazerLogin() {
  const hashDigitado = CryptoJS.SHA256(senha).toString();

  if (
    usuario === usuarioPadrao &&
    hashDigitado === senhaHash
  ) {
    setPage('home');
  } else {
    Alert.alert(
      'Erro',
      'Usuário ou senha inválidos'
    );
  }
}
  return (
    <Provider>
      <SafeAreaView style = {s.container}>

        {}
        {page === 'login' && (
          <View style = {s.content}>
            <Logo />

            <Text style = {s.sub}>Sistema de agendamento</Text>

      <TextInput
  placeholder="Usuário"
  autoCapitalize="none"
  style={s.input}
  value={usuario}
  onChangeText={setUsuario}
/>

            <TextInput
              placeholder = "Senha"
              secureTextEntry
              style = {s.input}
              value = {senha}
              onChangeText = {setSenha}
            />

       <Button
  mode="contained"
  buttonColor={cor}
  onPress={fazerLogin}
>
  Entrar
</Button>
          </View>
        )}

        {}
        {page === 'home' && (
          //SEGUNDA PAGINA
          <View style = {s.content}>
            <Logo />

            <Text style = {s.title}>Bem-vinda </Text>

            <Button
              mode = "contained"
              buttonColor = {cor}
              onPress = {() => setPage('lista')}
            >
              Ver serviços
            </Button>
          </View>
        )}

        {}
        {page === 'lista' && (
          <FlatList
            data = {servicos}
            keyExtractor = {(i) => i.id}
            renderItem = {({ item }) => (
              <Card style = {s.card}>
                <Card.Cover source = {{ uri: item.img }} />

                <Card.Content>
                  <Text style = {s.nome}>{item.nome}</Text>
                  <Text>R$ {item.valor}</Text>
                </Card.Content>

                <Card.Actions>
                  <Button
                    mode = "contained"
                    buttonColor = {cor}
                    onPress = {() => {
                      setServico(item.nome);
                      setValor(item.valor);
                      setPage('agenda');
                    }}
                  >
                    selecionar
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}

        {}
        {page === 'agenda' && (
          <ScrollView contentContainerStyle = {s.content}>

            <Text style = {s.modelo}>{servico}</Text>
            <Text>R$ {valor}</Text>

            {}
            <Text style = {s.horarioTxt}>Escolha o dia</Text>

            {dias.map((d) => (
              <Button
                key = {d}
                mode = {dia === d ? 'contained' : 'outlined'}
                buttonColor = {cor}
                textColor = {dia === d ? '#fff' : cor}
                style = {s.hbtn}
                onPress = {() => setDia(d)}
              >
                {d}
              </Button>
            ))}

            {}
            <Text style = {s.horarioTxt}>Escolha o horário</Text>

            {horarios.map((h) => (
              <Button
                key = {h}
                mode = {horario === h ? 'contained' : 'outlined'}
                buttonColor = {cor}
                textColor = {horario === h ? '#fff' : cor}
                style = {s.hbtn}
                onPress = {() => setHorario(h)}
              >
                {h}
              </Button>
            ))}

            <Button
              mode = "contained"
              buttonColor = {cor}
              style = {{ marginTop: 20 }}
              onPress = {() => {
                if (!dia || !horario) {
                  Alert.alert('Aviso', 'Escolhe dia e horário');
                  return;
                }
                setPage('final');
              }}
            >
              Confirmar
            </Button>

          </ScrollView>
        )}

        {}
        {page === 'final' && (
          <View style = {s.final}>
            <Icon name = "check-circle" size = {70} color = {cor} />

            <Text style = {s.title}>Agendado!</Text>

            <Text>Serviço: {servico}</Text>
            <Text>Dia: {dia}</Text>
            <Text>Horário: {horario}</Text>
            <Text>Valor: R$ {valor}</Text>

            <Button
              mode = "contained"
              buttonColor = {cor}
              style = {{ marginTop: 20 }}
              onPress = {resetar}
            >
              voltar
            </Button>
            <Button
  mode="contained"
  buttonColor="#25D366"
  style={{ marginTop: 10 }}
  onPress={() =>
    Linking.openURL(
      'https://wa.me/5521992522179?text=Olá,%20gostaria%20de%20confirmar%20meu%20agendamento.'
    )
  }
>
  WhatsApp
</Button>
          </View>
        )}

      </SafeAreaView>
    </Provider>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f8',
  },

  content: {
    padding: 20,
  },

  logo: {
    backgroundColor: cor,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  logoTxt: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  sub: {
    textAlign: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cor,
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },

  card: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  modelo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cor,
    marginBottom: 10,
  },

  horarioTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  hbtn: {
    marginTop: 8,
  },

  final: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
