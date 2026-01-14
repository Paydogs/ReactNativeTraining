import React from 'react';
import { View, ScrollView, StyleSheet, Switch, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { setTheme } from '../../store/slices/settingsSlice';
import { clearAll } from '../../store/slices/poopSlice';
import { useTheme } from '../../theme';
import { ThemedView, ThemedText, Button, Card } from '../../components/ui';
import { ThemeMode } from '../../store/types';

export const SettingsScreen: React.FC = () => {
    const { t } = useTranslation();
    const { theme, isDark } = useTheme();
    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector((state) => state.settings.theme);
    const entriesCount = useAppSelector((state) => state.poop.entries.length);

    const themeOptions: { key: ThemeMode; labelKey: string }[] = [
        { key: 'light', labelKey: 'settings.light' },
        { key: 'dark', labelKey: 'settings.dark' },
        { key: 'system', labelKey: 'settings.system' },
    ];

    const handleThemeChange = (themeMode: ThemeMode) => {
        dispatch(setTheme(themeMode));
    };

    const handleClearData = () => {
        Alert.alert(
            t('settings.clearData'),
            t('settings.clearDataConfirm'),
            [
                {
                    text: t('settings.cancel'),
                    style: 'cancel',
                },
                {
                    text: t('settings.confirm'),
                    style: 'destructive',
                    onPress: () => dispatch(clearAll()),
                },
            ]
        );
    };

    return (
        <ThemedView variant="background" style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText variant="title">{t('settings.title')}</ThemedText>
                    </View>

                    {/* Theme Section */}
                    <Card elevation="medium" style={styles.section}>
                        <ThemedText variant="subtitle" style={styles.sectionTitle}>
                            {t('settings.theme')}
                        </ThemedText>
                        <View style={styles.themeOptions}>
                            {themeOptions.map((option) => {
                                const isSelected = currentTheme === option.key;
                                return (
                                    <Button
                                        key={option.key}
                                        title={t(option.labelKey)}
                                        variant={isSelected ? 'primary' : 'outline'}
                                        size="medium"
                                        onPress={() => handleThemeChange(option.key)}
                                        style={styles.themeButton}
                                    />
                                );
                            })}
                        </View>
                    </Card>

                    {/* Quick Toggle */}
                    <Card elevation="low" style={styles.section}>
                        <View style={styles.toggleRow}>
                            <View style={styles.toggleInfo}>
                                <ThemedText style={styles.toggleLabel}>
                                    {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
                                </ThemedText>
                                <ThemedText variant="caption">
                                    Currently using {currentTheme} theme
                                </ThemedText>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={(value) =>
                                    handleThemeChange(value ? 'dark' : 'light')
                                }
                                trackColor={{ false: theme.border, true: theme.primary }}
                                thumbColor="#ffffff"
                            />
                        </View>
                    </Card>

                    {/* Data Section */}
                    <Card elevation="low" style={styles.section}>
                        <ThemedText variant="subtitle" style={styles.sectionTitle}>
                            📊 Data
                        </ThemedText>
                        <View style={styles.dataInfo}>
                            <ThemedText>Total entries: {entriesCount}</ThemedText>
                        </View>
                        <Button
                            title={t('settings.clearData')}
                            variant="outline"
                            size="medium"
                            onPress={handleClearData}
                            style={[styles.clearButton, { borderColor: theme.error }]}
                        />
                    </Card>

                    {/* About Section */}
                    <Card elevation="none" style={styles.section}>
                        <ThemedText variant="subtitle" style={styles.sectionTitle}>
                            {t('settings.about')}
                        </ThemedText>
                        <View style={styles.aboutRow}>
                            <ThemedText variant="secondary">{t('settings.version')}</ThemedText>
                            <ThemedText>1.0.0</ThemedText>
                        </View>
                        <View style={styles.divider} />
                        <ThemedText variant="secondary" style={styles.description}>
                            Poop Tracker helps you monitor your bowel movements for better health awareness.
                            Track frequency, size, and spot patterns over time.
                        </ThemedText>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    themeOptions: {
        flexDirection: 'row',
        gap: 10,
    },
    themeButton: {
        flex: 1,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toggleInfo: {
        flex: 1,
    },
    toggleLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    dataInfo: {
        marginBottom: 16,
    },
    clearButton: {
        marginTop: 8,
    },
    aboutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 12,
    },
    description: {
        lineHeight: 22,
    },
});
