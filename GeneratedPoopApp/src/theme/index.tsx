import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '../store';

export const colors = {
    light: {
        background: '#f5f5f7',
        surface: '#ffffff',
        card: '#ffffff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        primary: '#f24a3d',
        primaryLight: '#fee4e2',
        border: '#e5e7eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
    },
    dark: {
        background: '#0f0f1a',
        surface: '#1a1a2e',
        card: '#242438',
        text: '#f9fafb',
        textSecondary: '#9ca3af',
        primary: '#f24a3d',
        primaryLight: '#3d2421',
        border: '#374151',
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
    },
};

export type Theme = typeof colors.light;

interface ThemeContextType {
    theme: Theme;
    isDark: boolean;
    colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
    theme: colors.light,
    isDark: false,
    colorScheme: 'light',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const { theme: themePreference } = useAppSelector((state) => state.settings);

    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (themePreference === 'system') {
            setColorScheme(systemColorScheme === 'dark' ? 'dark' : 'light');
        } else {
            setColorScheme(themePreference);
        }
    }, [themePreference, systemColorScheme]);

    const theme = colorScheme === 'dark' ? colors.dark : colors.light;
    const isDark = colorScheme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, isDark, colorScheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
