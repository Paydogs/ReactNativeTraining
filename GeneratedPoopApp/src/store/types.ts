export interface PoopEntry {
    id: string;
    timestamp: string;
    size: 'small' | 'normal' | 'mega';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface PoopState {
    entries: PoopEntry[];
}

export interface SettingsState {
    theme: ThemeMode;
}

export interface RootState {
    poop: PoopState;
    settings: SettingsState;
}
