type HomeScreenParams = {
    title: string
}

type SettingsScreenParams = {
    title: string,
    description: string
}

export type RootStackParamList = {
    Home: HomeScreenParams;
    Settings: SettingsScreenParams;
} 