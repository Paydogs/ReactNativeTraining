import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme';
import { DashboardScreen, SettingsScreen } from '../screens';

// Type definitions for navigation
export type RootStackParamList = {
    MainTabs: undefined;
};

export type MainTabParamList = {
    DashboardTab: undefined;
    SettingsTab: undefined;
};

export type DashboardStackParamList = {
    Dashboard: undefined;
};

export type SettingsStackParamList = {
    Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

// Dashboard Stack Navigator
const DashboardStackNavigator = () => {
    return (
        <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
            <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />
        </DashboardStack.Navigator>
    );
};

// Settings Stack Navigator
const SettingsStackNavigator = () => {
    return (
        <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
};

// Tab Navigator
const MainTabNavigator = () => {
    const { theme, isDark } = useTheme();
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopColor: theme.border,
                    borderTopWidth: 1,
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 65,
                },
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="DashboardTab"
                component={DashboardStackNavigator}
                options={{
                    tabBarLabel: t('common.dashboard'),
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>💩</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsStackNavigator}
                options={{
                    tabBarLabel: t('common.settings'),
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>⚙️</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// Main App Navigator
export const AppNavigator: React.FC = () => {
    const { theme, isDark } = useTheme();

    const navigationTheme = isDark
        ? {
            ...DarkTheme,
            colors: {
                ...DarkTheme.colors,
                background: theme.background,
                card: theme.surface,
                text: theme.text,
                border: theme.border,
                primary: theme.primary,
            },
        }
        : {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                background: theme.background,
                card: theme.surface,
                text: theme.text,
                border: theme.border,
                primary: theme.primary,
            },
        };

    return (
        <NavigationContainer theme={navigationTheme}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
