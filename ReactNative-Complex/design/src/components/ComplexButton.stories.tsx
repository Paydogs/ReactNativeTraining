import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { View } from 'react-native';
import { fn } from 'storybook/test';

import { MainButton, MainButtonStyle } from './MainButton';

const meta = {
  title: 'Complex/Button',
  component: MainButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onPress: fn() },
} satisfies Meta<typeof MainButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonStyle: MainButtonStyle.Primary,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    buttonStyle: MainButtonStyle.Secondary,
    label: 'Secondary Button',
  },
};

export const Tertiary: Story = {
    args: {
      buttonStyle: MainButtonStyle.Tertiary,
      label: 'Tertiary Button',
    },
  };

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button',
  },
};
