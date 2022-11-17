import { Box, useToast, FlatList } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Game, GameProps } from './Game';

interface Props {
  poolId: string;
  poolCode:string;
}

export function Guesses({ poolId, poolCode }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamScore, setFirstTeamScore] = useState('')
  const [secondTeamScore, setSecondTeamScore] = useState('')



  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response?.data.games)
      console.log(response.data.games)
    }
    catch (e) {
      console.log(e)
      toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      setIsLoading(true)
      if (!firstTeamScore.trim() || !secondTeamScore.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      const response = await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamScore: Number(firstTeamScore),
        secondTeamScore: Number(secondTeamScore),
      });
      console.log(response)
      toast.show({
        title: 'Palpite enviado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
      fetchGames()
    }
    catch (e) {
      console.log(e)
      toast.show({
        title: 'Não foi possível enviar o palpite, tente novamente',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    fetchGames()
  }, [poolId])

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
        <Game
          isLoading={isLoading}
          data={item}
          setFirstTeamPoints={setFirstTeamScore}
          setSecondTeamPoints={setSecondTeamScore}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      }
      ListEmptyComponent={<EmptyMyPoolList code={poolCode}/>}
    />



  );
}
