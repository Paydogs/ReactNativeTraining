import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface ThemedTextProps extends TextProps {
    variant?: 'default' | 'secondary' | 'title' | 'subtitle' | 'caption';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
    variant = 'default',
    style,
    children,
    ...props
}) => {
    const { theme } = useTheme();

    const getStyles = () => {
        switch (variant) {
            case 'title':
                return {
                    color: theme.text,
                    fontSize: 28,
                    fontWeight: '700' as const,
                };
            case 'subtitle':
                return {
                    color: theme.text,
                    fontSize: 20,
                    fontWeight: '600' as const,
                };
            case 'secondary':
                return {
                    color: theme.textSecondary,
                    fontSize: 14,
                };
            case 'caption':
                return {
                    color: theme.textSecondary,
                    fontSize: 12,
                };
            default:
                return {
                    color: theme.text,
                    fontSize: 16,
                };
        }
    };

    return (
        <Text style={[getStyles(), style]} {...props}>
            {children}
        </Text>
    );
};
