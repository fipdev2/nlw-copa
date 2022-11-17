import { Heading, Text, useToast, VStack } from 'native-base';
import * as React from 'react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

interface errorProps {
    response: {
        data: {
            message: string
        }
    }
}


function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    // const [errorMsg, setErrorMsg] = useState();
    const { navigate } = useNavigation();
    const toast = useToast();


    async function handleJoinPool() {

        try {
            setIsLoading(true)
            if (!code.trim()) {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }
            await api.post('/pools/join', { code })
            toast.show({
                title: 'Você entrou no bolão com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })
            navigate('pools')
        }
        catch (e) {
            const error = e as errorProps
            console.log(error.response.data.message)
            setIsLoading(false)
            toast.show({
                title: error.response.data.message,
                placement: 'top',
                bgColor: 'red.500'
            })


        }
        finally {
            setIsLoading(false)
        }
    }

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
                        placeholder='Digite o código do bolão'
                        autoCapitalize='characters'
                        onChangeText={setCode}
                    />
                    <Button
                        title='ENCONTRAR BOLÃO'
                        onPress={handleJoinPool}
                        isLoading={isLoading}
                    />

                </VStack>
            </VStack>
        </>
    );
}

export default Find;