import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import ScreenName from '../constants/ScreenName';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Settings>

export function SettingsScreen({ navigation, route }: Props) {
    return (
        <View>
            <Text style={{ fontSize: 32, textAlign: 'center', paddingBottom: 16 }}> {route.params.title}</Text>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingBottom: 32 }}> {route.params.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});