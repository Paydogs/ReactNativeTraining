import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    icon,
    disabled,
    style,
    ...props
}) => {
    const { theme, isDark } = useTheme();

    const getContainerStyles = (): ViewStyle => {
        const baseStyles: ViewStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            gap: 8,
        };

        const sizeStyles: Record<string, ViewStyle> = {
            small: { paddingHorizontal: 12, paddingVertical: 8 },
            medium: { paddingHorizontal: 20, paddingVertical: 14 },
            large: { paddingHorizontal: 28, paddingVertical: 18 },
        };

        const variantStyles: Record<string, ViewStyle> = {
            primary: {
                backgroundColor: theme.primary,
            },
            secondary: {
                backgroundColor: theme.primaryLight,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: theme.primary,
            },
            ghost: {
                backgroundColor: 'transparent',
            },
        };

        return {
            ...baseStyles,
            ...sizeStyles[size],
            ...variantStyles[variant],
            opacity: disabled ? 0.5 : 1,
        };
    };

    const getTextStyles = (): TextStyle => {
        const baseFontSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

        const variantStyles: Record<string, TextStyle> = {
            primary: {
                color: '#ffffff',
                fontWeight: '600',
            },
            secondary: {
                color: theme.primary,
                fontWeight: '600',
            },
            outline: {
                color: theme.primary,
                fontWeight: '600',
            },
            ghost: {
                color: theme.primary,
                fontWeight: '500',
            },
        };

        return {
            fontSize: baseFontSize,
            ...variantStyles[variant],
        };
    };

    return (
        <TouchableOpacity
            style={[getContainerStyles(), style]}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? '#ffffff' : theme.primary}
                />
            ) : (
                <>
                    {icon}
                    <Text style={getTextStyles()}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};
