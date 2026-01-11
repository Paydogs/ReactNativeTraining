import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { MainButton, MainButtonStyle } from '../design/src/components/MainButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{paddingBottom: 16}}>Trying to show a custom Storybook component</Text>
      <MainButton
        onPress={ () => Alert.alert("Szeretlek!") }
        buttonStyle={MainButtonStyle.Primary}
        label="CSÓÓÓÓK!!!"
        style={styles.buttonSpacing}
      />
      <MainButton
        onPress={ () => Alert.alert("Szeretlek!") }
        buttonStyle={MainButtonStyle.Secondary}
        label="CSÓÓÓÓK!!!"
        style={styles.buttonSpacing}
      />
      <MainButton
        onPress={ () => Alert.alert("Szeretlek!") }
        buttonStyle={MainButtonStyle.Tertiary}
        label="CSÓÓÓÓK!!!"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpacing: {
    marginBottom: 16,
  },
});
