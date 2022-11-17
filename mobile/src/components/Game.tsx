import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import { Team } from './Team';
import ptBR from 'dayjs/locale/pt-br'
import dayjs from 'dayjs';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamIsoCode: string;
  secondTeamIsoCode: string;
  guess: null | GuessProps;
};

interface Props {
  isLoading: boolean;
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm, isLoading }: Props) {
  const { colors, sizes } = useTheme();
  const day = dayjs(data.date).locale(ptBR).format("dddd, DD/MM/YYYY [às] HH:mm")
  const date = [day[0].toLocaleUpperCase(), ...day.slice(1,day.length)]
  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamIsoCode)} vs. {getName(data.secondTeamIsoCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {date}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamIsoCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamIsoCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {
        !data.guess &&
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          _loading={{
            _spinner: { color: 'white' }
          }}
          onPress={onGuessConfirm}
          isLoading={isLoading}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      }
    </VStack>
  );
}