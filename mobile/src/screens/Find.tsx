import { Heading, Text, VStack } from 'native-base';
import * as React from 'react';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg'
import { Input } from '../components/Input';
import Button from '../components/Button';

function Find() {
    return (
        <>
            <VStack
                flex='1'
                bgColor='gray.900'
            >
                <Header
                    title='Buscar por código'
                    showBackButton
                />
                <VStack
                    mx={5}
                    alignItems='center'
                >
                    <Heading
                        fontFamily={'heading'}
                        color='white'
                        my='8'
                        textAlign={'center'}
                    >
                        Encontre um bolão através de {'\n'}seu código único!
                    </Heading>
                    <Input
                        mb={2}
                        placeholder='Qual nome do seu bolão?'
                    />
                    <Button
                        title='CRIAR MEU BOLÃO'
                    />
                  
                </VStack>
            </VStack>
        </>
    );
}

export default Find;