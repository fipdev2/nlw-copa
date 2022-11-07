import { Heading, Text, VStack } from 'native-base';
import * as React from 'react';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg'
import { Input } from '../components/Input';
import Button from '../components/Button';
function New() {
    return (
        <>
            <VStack
                flex='1'
                bgColor='gray.900'
            >
                <Header
                    title='Criar novo bolão'
                />
                <VStack
                    mx={5}
                    mt={8}
                    alignItems='center'
                >
                    <Logo />
                    <Heading
                        fontFamily={'heading'}
                        color='white'
                        my='8'
                        textAlign={'center'}
                    >
                        Crie seu próprio bolão da
                        copa {'\n'}e compartilhe entre amigos!
                    </Heading>
                    <Input
                        mb={2}
                        placeholder='Qual nome do seu bolão?'
                    />
                    <Button
                        title='CRIAR MEU BOLÃO'
                    />
                    <Text
                        color='gray.100'
                        fontSize='sm'
                        textAlign={'center'}
                        px={10}
                        mt={4}
                    >
                        Após criar seu bolão,
                        você receberá um código único que
                        poderá usar para convidar
                        outras pessoas.
                    </Text>
                </VStack>
            </VStack>
        </>
    );
}

export default New;