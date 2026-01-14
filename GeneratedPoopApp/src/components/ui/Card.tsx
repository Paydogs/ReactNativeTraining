import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface CardProps extends ViewProps {
    elevation?: 'none' | 'low' | 'medium' | 'high';
    padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
    elevation = 'low',
    padding = 'medium',
    style,
    children,
    ...props
}) => {
    const { theme, isDark } = useTheme();

    const getShadowStyles = () => {
        if (elevation === 'none') return {};

        const shadowOpacity = isDark ? 0.3 : 0.1;
        const shadows = {
            low: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity,
                shadowRadius: 4,
                elevation: 2,
            },
            medium: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: shadowOpacity * 1.5,
                shadowRadius: 8,
                elevation: 4,
            },
            high: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: shadowOpacity * 2,
                shadowRadius: 16,
                elevation: 8,
            },
        };
        return shadows[elevation];
    };

    const getPadding = () => {
        const paddings = {
            none: 0,
            small: 12,
            medium: 16,
            large: 24,
        };
        return paddings[padding];
    };

    return (
        <View
            style={[
                {
                    backgroundColor: theme.card,
                    borderRadius: 16,
                    padding: getPadding(),
                    borderWidth: isDark ? 1 : 0,
                    borderColor: theme.border,
                },
                getShadowStyles(),
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
};
