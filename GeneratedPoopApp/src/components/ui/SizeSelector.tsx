import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { PoopEntry } from '../../store/types';

interface SizeSelectorProps {
    selectedSize: PoopEntry['size'];
    onSelectSize: (size: PoopEntry['size']) => void;
}

const sizeOptions: { key: PoopEntry['size']; emoji: string; labelKey: string }[] = [
    { key: 'small', emoji: '💩', labelKey: 'dashboard.small' },
    { key: 'normal', emoji: '💩💩', labelKey: 'dashboard.normal' },
    { key: 'mega', emoji: '💩💩💩', labelKey: 'dashboard.mega' },
];

export const SizeSelector: React.FC<SizeSelectorProps> = ({
    selectedSize,
    onSelectSize,
}) => {
    const { theme, isDark } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {sizeOptions.map((option) => {
                const isSelected = selectedSize === option.key;
                return (
                    <TouchableOpacity
                        key={option.key}
                        style={[
                            styles.option,
                            {
                                backgroundColor: isSelected ? theme.primaryLight : theme.surface,
                                borderColor: isSelected ? theme.primary : theme.border,
                                borderWidth: 2,
                            },
                        ]}
                        onPress={() => onSelectSize(option.key)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.emoji}>{option.emoji}</Text>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: isSelected ? theme.primary : theme.text,
                                    fontWeight: isSelected ? '600' : '400',
                                },
                            ]}
                        >
                            {t(option.labelKey)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    emoji: {
        fontSize: 24,
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        textAlign: 'center',
    },
});
