import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { RootStackParamList } from './RootStackParamList';
import ScreenName from '../constants/ScreenName';

const MainStack = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>()
    return (
        <Stack.Navigator>
            <Stack.Screen initialParams={{
                title: "Dashboard"
            }} name={ScreenName.Home} component={HomeScreen} />
            <Stack.Screen initialParams={{
                title: "Settings Screen",
                description: "Description test"
            }} name={ScreenName.Settings} component={SettingsScreen} />
        </Stack.Navigator>
    );
};

export default MainStack;