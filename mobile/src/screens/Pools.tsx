import { VStack, Icon, useToast, FlatList } from 'native-base';
import * as React from 'react';
import Button from '../components/Button';
import { Header } from '../components/Header';
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import Loading from '../components/Loading';
import { PoolCard, PoolProps } from '../components/PoolCard';
import { useCallback, useState } from 'react';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { useFocusEffect } from '@react-navigation/native'


function Pools() {
    const [isLoading, setIsLoading] = useState(true);
    const [pools, setPools] = useState<PoolProps[]>([]);
    // console.log(pools.length)

    const { navigate } = useNavigation();
    const toast = useToast();

    async function fetchPools() {
        try {
            setIsLoading(true);
            const response = await api.get('/pools');
            // console.log(response.data.pools)
            setPools(response.data.pools);
        }
        catch (e) {
            console.log(e);
            toast.show({
                title: 'Falha ao carregar os bolões',
                placement: 'top',
                bgColor: 'red.500',
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPools();
    }, []))
    return (

        <VStack
            flex={1}
            bgColor={'gray.900'}
        >
            <Header
                title='Meus bolões'
            />
            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                borderBottomColor={'gray.600'}
                pb={4}
                mb={4}
            >
                <Button
                    onPress={() => navigate('find')}
                    title='BUSCAR BOLÃO POR CÓDIGO'
                    leftIcon={<Icon
                        as={Octicons}
                        name='search'
                        size='md'
                        color='black' />}
                />
            </VStack>

            {isLoading ?
                <Loading /> : <FlatList
                    data={pools}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <PoolCard
                            data={item}
                            onPress={() => navigate('details', { id: item.id })} />}

                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    ListEmptyComponent={() => <EmptyPoolList />}
                />}
        </VStack>

    );
}

export default Pools;