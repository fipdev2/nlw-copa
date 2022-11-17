import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Loading from '../components/Loading'
import { PoolProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from 'react-native'
import { Guesses } from "../components/Guesses";

interface routeParams {
    id: string
}


function Details() {
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<PoolProps>({} as PoolProps)
    const [optionSelected, setOptionSelected] = useState<'Seus palpites' | 'Ranking do grupo'>('Seus palpites')

    const route = useRoute();
    const toast = useToast();

    const { id } = route.params as routeParams;

    async function handleCodeShare() {
        await Share.share(
            { message: details.code }
        )
    }


    async function fetchPoolDetails() {
        try {
            setIsLoading(true)
            const response = await api.get(`/pools/${id}`)
            // console.log(response.data)
            setDetails(response.data.pool)
        }
        catch (e) {
            console.log(e)
            toast.show({
                title: 'Houve um erro ao carregar os detalhes do bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPoolDetails()
    }, [id])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <VStack flex={1} bgColor={'gray.900'}>
            <Header title={details.title}
                showBackButton
                showShareButton
                handleShare={handleCodeShare}
            />
            {details._count?.participants > 0 ?

                <VStack
                    flex={1}
                    px={5}
                >
                    <PoolHeader data={details} />

                    <HStack bgColor={'gray.800'} rounded='sm' mb={5}>
                        <Option
                            title={"Seus palpites"}
                            isSelected={optionSelected === 'Seus palpites'}
                            onPress={() => setOptionSelected('Seus palpites')}
                        />
                        <Option
                            title={"Ranking do grupo"}
                            isSelected={optionSelected === 'Ranking do grupo'}
                            onPress={() => setOptionSelected('Ranking do grupo')}
                        />

                    </HStack>
                       { optionSelected==='Seus palpites' && 
                       <Guesses poolId={details.id} poolCode={details.code}/>}
                </VStack>
                : <EmptyMyPoolList code={details.code} />}

        </VStack>
    );
}

export default Details;