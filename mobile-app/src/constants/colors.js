// SetWemu Brand Colors

export const COLORS = {
  // PRIMARY BRAND COLORS
  primary: '#ADF3FF', // Primary Blue (light cyan)
  primaryDark: '#4CC1D4', // Darker blue (teal) - for hover/pressed states
  primaryLight: '#E1FAFF', // Very light blue - for backgrounds
  primaryMedium: '#8DE4F2', // Medium blue - for accents

  secondary: '#4CC1D4', // Teal/Turquoise - secondary actions

  accent: '#8DE4F2', // Sky Blue - highlights and accents

  // NEUTRAL COLORS
  white: '#FFFFFF', // Pure white
  black: '#000000', // Pure black

  // STATUS COLORS
  success: '#4CC1D4',
  error: '#FF6B6B',
  warning: '#FFB84D',
  info: '#ADF3FF',

  // TEXT COLORS
  text: {
    primary: '#000000', // Black - main text
    secondary: '#4A4A4A', // Dark gray - less important text
    light: '#9E9E9E', // Light gray - captions, labels
    white: '#FFFFFF', // White - text on dark backgrounds
    disabled: '#BDBDBD', // Disabled/inactive text
    link: '#4CC1D4', // Teal - for clickable links
  },

  // BACKGROUND COLORS
  background: {
    primary: '#FFFFFF', // White - main screen background
    secondary: '#E1FAFF', // Very light blue - alternative background
    tertiary: '#F5F5F5', // Light gray - cards/sections
    dark: '#000000', // Black - dark backgrounds
    card: '#FFFFFF', // White - card backgrounds
    overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    blue: '#ADF3FF', // Primary blue background
    lightBlue: '#E1FAFF', // Very light blue background
  },

  // BORDER COLORS
  border: {
    light: '#E1FAFF', // Very light blue
    medium: '#8DE4F2', // Sky blue
    dark: '#4CC1D4', // Teal
    black: '#000000', // Black borders
  },

  // BUTTON COLORS (Specific combinations)
  button: {
    primary: {
      background: '#4CC1D4', // Teal background
      text: '#FFFFFF', // White text
      border: '#4CC1D4', // Teal border
      pressed: '#3BA8B8', // Darker when pressed
    },
    secondary: {
      background: 'transparent', // No background
      text: '#4CC1D4', // Teal text
      border: '#4CC1D4', // Teal border
      pressed: '#E1FAFF', // Light blue when pressed
    },
    accent: {
      background: '#ADF3FF', // Light blue background
      text: '#000000', // Black text
      border: '#ADF3FF', // Light blue border
      pressed: '#8DE4F2', // Medium blue when pressed
    },
  },

  // GRADIENT COMBINATIONS
  gradient: {
    blue: ['#E1FAFF', '#ADF3FF', '#8DE4F2'], // Light to medium blue
    teal: ['#8DE4F2', '#4CC1D4'], // Sky blue to teal
    primary: ['#ADF3FF', '#4CC1D4'], // Primary gradient
  },

  // SOCIAL MEDIA COLORS (keep these)
  facebook: '#1877F2',
  google: '#EA4335',
  twitter: '#1DA1F2',

  // SPECIAL
  transparent: 'transparent',
  shadow: 'rgba(0, 0, 0, 0.1)', // For shadows
};

export default COLORS;
