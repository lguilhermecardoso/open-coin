import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

export function Profile() {
  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title='Perfil' />
      <ScrollView>
        <Center mt={6} px={10}>
          <UserPhoto
            size={33}
            source={{ uri: 'https://github.com/lguilhermecardoso.png' }}
            alt="Imagem do usuário" 
          />
          <TouchableOpacity>
            <Text color="green.300" mt={2} mb={8} fontSize="md">Alterar foto</Text>
          </TouchableOpacity>
          <Input
            placeholder='Nome'
            value='Guilherme Cardoso'
            bg='gray.800'
            color='white.100'
          />
          <Input
            value='guilhermecardoso.info@gmail.com'
            placeholder='E-mail'
            bg='gray.800'
            color='white.100'
            isDisabled
          />
        </Center>
        <VStack px={10} mt={4}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Input
            placeholder='Senha antiga'
            bg='gray.800'
            color='white.100'
            secureTextEntry
          />
          <Input
            placeholder='Nova senha'
            bg='gray.800'
            color='white.100'
            secureTextEntry
          />

          <Input
            placeholder='Confirme a nova senha'
            bg='gray.800'
            color='white.100'
            secureTextEntry
          />
          
          <Button title='Salvar alterações' mt={6} onPress={() => {}} isLoading={false} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}