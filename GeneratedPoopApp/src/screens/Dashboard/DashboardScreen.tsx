import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { addPoop, removePoop } from '../../store/slices/poopSlice';
import { useTheme } from '../../theme';
import { ThemedView, ThemedText, Button, Card, SizeSelector } from '../../components/ui';
import { PoopEntry } from '../../store/types';

export const DashboardScreen: React.FC = () => {
    const { t } = useTranslation();
    const { theme, isDark } = useTheme();
    const dispatch = useAppDispatch();
    const entries = useAppSelector((state) => state.poop.entries);

    const [selectedSize, setSelectedSize] = useState<PoopEntry['size']>('normal');

    const todayEntries = useMemo(() => {
        const today = new Date().toDateString();
        return entries.filter(
            (entry) => new Date(entry.timestamp).toDateString() === today
        );
    }, [entries]);

    const handleAddPoop = () => {
        dispatch(addPoop({ size: selectedSize }));
    };

    const handleRemovePoop = (id: string) => {
        dispatch(removePoop(id));
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString([], {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const getSizeEmoji = (size: PoopEntry['size']) => {
        return {
            small: '💩',
            normal: '💩💩',
            mega: '💩💩💩',
        }[size];
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toLocaleDateString([], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                        <ThemedText variant="title">{t('dashboard.title')}</ThemedText>
                        <ThemedText variant="secondary" style={styles.dateText}>
                            {getCurrentDateTime()}
                        </ThemedText>
                    </View>

                    {/* Quick Stats */}
                    <Card elevation="medium" style={styles.statsCard}>
                        <ThemedText variant="subtitle" style={styles.sectionTitle}>
                            {t('dashboard.todayStats')}
                        </ThemedText>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={[styles.statNumber, { color: theme.primary }]}>
                                    {todayEntries.length}
                                </Text>
                                <ThemedText variant="secondary">{t('dashboard.totalPoops')}</ThemedText>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={[styles.statNumber, { color: theme.success }]}>
                                    {todayEntries.filter(e => e.size === 'mega').length}
                                </Text>
                                <ThemedText variant="secondary">{t('dashboard.mega')}</ThemedText>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={[styles.statNumber, { color: theme.warning }]}>
                                    {todayEntries.filter(e => e.size === 'normal').length}
                                </Text>
                                <ThemedText variant="secondary">{t('dashboard.normal')}</ThemedText>
                            </View>
                        </View>
                    </Card>

                    {/* Add Poop Section */}
                    <Card elevation="high" style={styles.addCard}>
                        <ThemedText variant="subtitle" style={styles.sectionTitle}>
                            {t('dashboard.selectSize')}
                        </ThemedText>
                        <SizeSelector
                            selectedSize={selectedSize}
                            onSelectSize={setSelectedSize}
                        />
                        <Button
                            title={t('dashboard.addPoop')}
                            variant="primary"
                            size="large"
                            onPress={handleAddPoop}
                            style={styles.addButton}
                            icon={<Text style={styles.addIcon}>💩</Text>}
                        />
                    </Card>

                    {/* Recent Entries */}
                    <View style={styles.recentSection}>
                        <ThemedText variant="subtitle" style={styles.sectionTitle}>
                            {t('dashboard.recentEntries')}
                        </ThemedText>
                        {entries.length === 0 ? (
                            <Card elevation="none" style={styles.emptyCard}>
                                <ThemedText variant="secondary" style={styles.emptyText}>
                                    {t('dashboard.noEntries')}
                                </ThemedText>
                            </Card>
                        ) : (
                            entries.slice(0, 10).map((entry) => (
                                <Card key={entry.id} style={styles.entryCard} elevation="low">
                                    <View style={styles.entryContent}>
                                        <Text style={styles.entryEmoji}>{getSizeEmoji(entry.size)}</Text>
                                        <View style={styles.entryDetails}>
                                            <ThemedText style={styles.entryTime}>
                                                {formatTime(entry.timestamp)}
                                            </ThemedText>
                                            <ThemedText variant="caption">
                                                {formatDate(entry.timestamp)}
                                            </ThemedText>
                                        </View>
                                        <Button
                                            title="✕"
                                            variant="ghost"
                                            size="small"
                                            onPress={() => handleRemovePoop(entry.id)}
                                        />
                                    </View>
                                </Card>
                            ))
                        )}
                    </View>
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
    dateText: {
        marginTop: 4,
    },
    statsCard: {
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 36,
        fontWeight: '700',
    },
    addCard: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    addButton: {
        marginTop: 20,
    },
    addIcon: {
        fontSize: 20,
    },
    recentSection: {
        marginBottom: 20,
    },
    emptyCard: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyText: {
        textAlign: 'center',
    },
    entryCard: {
        marginBottom: 10,
    },
    entryContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    entryEmoji: {
        fontSize: 24,
        marginRight: 12,
    },
    entryDetails: {
        flex: 1,
    },
    entryTime: {
        fontWeight: '600',
    },
});
