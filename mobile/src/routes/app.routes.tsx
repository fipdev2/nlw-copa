import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import New from '../screens/New';
import Pools from '../screens/Pools';
import { useTheme } from 'native-base'
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import Find from '../screens/Find';
import Details from '../screens/Details';

const { Navigator, Screen } = createBottomTabNavigator();
function AppRoutes() {
    const { colors, sizes } = useTheme();
    const size = sizes[6]
    return (
        <Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    height: 87,
                    borderTopWidth: 0,
                    backgroundColor: colors.gray[800],
                },
                tabBarItemStyle: {
                    position: 'relative',
                    top: Platform.OS === 'android' ? -10 : 0
                },
                tabBarLabelPosition: 'beside-icon',
                headerShown: false,
                tabBarActiveTintColor: colors.yellow[500],
                tabBarInactiveTintColor: colors.gray[300],
            }}
        >
            <Screen
                options={{
                    tabBarLabel: 'Novo bolão',
                    tabBarIcon: ({ color }) =>
                        <PlusCircle
                            color={color}
                            size={size}
                        />
                }}
                name='new'
                component={New}
            />
            <Screen
                options={{
                    tabBarLabel: 'Meus bolões',
                    tabBarIcon: ({ color }) =>
                        <SoccerBall
                            color={color}
                            size={size}
                        />
                }}
                name='pools'
                component={Pools}
            />
            <Screen
                options={{ tabBarButton: () => null}}
                name='find'
                component={Find}
            />
             <Screen
                options={{ tabBarButton: () => null}}
                name='details'
                component={Details}
            />
        </Navigator>
    );
}

export default AppRoutes;