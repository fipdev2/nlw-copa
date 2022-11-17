import { NavigationContainer } from '@react-navigation/native'
import { Box} from 'native-base';
import AppRoutes from './app.routes';
import SignIn from '../screens/SignIn';
import useAuth from '../hooks/useAuth';


function Routes() {
    const { user } = useAuth()
    return (
        <Box flex={1} bgColor={'gray.900'}>
            <NavigationContainer>
            {user.name ? <AppRoutes /> : <SignIn />}
        </NavigationContainer>
            
        </Box>
    );
}

export default Routes;