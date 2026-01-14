import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../../theme';

interface ThemedViewProps extends ViewProps {
    variant?: 'background' | 'surface' | 'card';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
    variant = 'background',
    style,
    children,
    ...props
}) => {
    const { theme } = useTheme();

    const backgroundColor = {
        background: theme.background,
        surface: theme.surface,
        card: theme.card,
    }[variant];

    return (
        <View style={[{ backgroundColor }, style]} {...props}>
            {children}
        </View>
    );
};
