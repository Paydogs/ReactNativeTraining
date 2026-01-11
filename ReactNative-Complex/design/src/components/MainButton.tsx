import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export enum MainButtonStyle {
  Primary,
  Secondary,
  Tertiary
}

export interface MainButtonProps {
  buttonStyle?: MainButtonStyle;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;  
}

/** Primary UI component for user interaction */
export const MainButton = ({
  buttonStyle = MainButtonStyle.Primary,
  size = 'medium',
  backgroundColor,
  label,
  style,
  onPress,
}: MainButtonProps) => {
  const modeStyle: Record<MainButtonStyle, ViewStyle> = {
    [MainButtonStyle.Primary]: styles.primary,
    [MainButtonStyle.Secondary]: styles.secondary,
    [MainButtonStyle.Tertiary]: styles.tertiary,
  };
  const textModeStyle: Record<MainButtonStyle, TextStyle> = {
    [MainButtonStyle.Primary]: styles.primaryText,
    [MainButtonStyle.Secondary]: styles.secondaryText,
    [MainButtonStyle.Tertiary]: styles.tertiaryText,
  };

  const sizeStyle = styles[size];
  const textSizeStyle = textSizeStyles[size];

  return (
    <TouchableOpacity accessibilityRole="button" activeOpacity={0.6} onPress={onPress}>
      <View
        style={[
          styles.button,
          modeStyle[buttonStyle],
          sizeStyle,
          style,
          !!backgroundColor && { backgroundColor },
          { borderColor: 'black' },
        ]}
      >
        <Text style={[textModeStyle[buttonStyle], textSizeStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    borderRadius: 48,
  },
  buttonText: {
    fontWeight: '700',
    lineHeight: 1,
  },
  primary: {
    backgroundColor: '#ff8fab',
  },
  primaryText: {
    color: 'white',
  },
  secondary: {
    backgroundColor: '#ffc2d1',
  },
  secondaryText: {
    color: '#333',
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
  },
  tertiaryText: {
    color: '#333',
  },
  small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 12,
  },
  medium: {
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  mediumText: {
    fontSize: 14,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeText: {
    fontSize: 16,
  },
});

const textSizeStyles = {
  small: styles.smallText,
  medium: styles.mediumText,
  large: styles.largeText,
};
