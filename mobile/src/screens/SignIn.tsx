import { Center, Icon, Text } from 'native-base';
import { Fontisto } from '@expo/vector-icons'
import Button from '../components/Button';
import Logo from '../assets/logo.svg';
import useAuth from '../hooks/useAuth';
function SignIn() {
    const { signIn, isUserLoading } = useAuth()
  
    return (
        <Center bg={'gray.900'} flex={1} p={7}>
            <Logo width={212} height={40} />
            <Button
                mt='12'
                title='ENTRAR COM GOOGLE'
                leftIcon={<Icon as={Fontisto} name="google" size={'md'} />}
                type='secondary'
                onPress={() => signIn()}
                isLoading={isUserLoading}
                _loading={{_spinner:{color:'white'}}}
            />
            <Text
                color='gray.200'
                mt='4'
            >
                Não utilizamos nenhuma informação além {'\n'}
                do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    );
}

export default SignIn;