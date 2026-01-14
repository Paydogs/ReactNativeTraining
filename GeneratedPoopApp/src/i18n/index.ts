import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            dashboard: {
                title: 'Poop Tracker',
                addPoop: 'Add Poop',
                selectSize: 'Select Size',
                small: 'Small',
                normal: 'Normal',
                mega: 'Mega',
                recentEntries: 'Recent Entries',
                noEntries: 'No entries yet. Start tracking!',
                todayStats: "Today's Stats",
                totalPoops: 'Total Poops',
            },
            settings: {
                title: 'Settings',
                theme: 'Theme',
                light: 'Light',
                dark: 'Dark',
                system: 'System',
                clearData: 'Clear All Data',
                clearDataConfirm: 'Are you sure you want to delete all poop entries?',
                cancel: 'Cancel',
                confirm: 'Confirm',
                language: 'Language',
                about: 'About',
                version: 'Version',
            },
            common: {
                dashboard: 'Dashboard',
                settings: 'Settings',
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
