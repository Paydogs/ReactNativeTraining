import { StyleSheet, Text, View, Button } from 'react-native'
import React from  'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStackParamList';
import ScreenName from '../constants/ScreenName';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName.Home>

export function HomeScreen({ navigation, route }: Props) {
    return (
        <View>
            <Text style={{ fontSize: 32, textAlign: 'center', paddingBottom: 32 }}> {route.params.title}</Text>
            <Button
                title="Navigate"
                onPress={() => {
                    navigation.navigate(ScreenName.Settings, { title: "Settings", description: "Description"})
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});