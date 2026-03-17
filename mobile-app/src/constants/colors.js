export const COLORS = {
  primary:       '#ADF3FF',
  primaryDark:   '#4CC1D4',
  primaryLight:  '#5DD5E8',
  primaryMedium: '#2A8FA0',
  secondary:     '#4CC1D4',
  accent:        '#ADF3FF',

  teal: {
    lightest: '#D6F9FF',
    light:    '#ADF3FF',
    mid:      '#5DD5E8',
    brand:    '#4CC1D4',
    deep:     '#2A8FA0',
    glow:     'rgba(173,243,255,0.10)',
    glowMid:  'rgba(77,193,212,0.20)',
    border:   'rgba(173,243,255,0.25)',
  },

  white: '#FFFFFF',
  black: '#000000',

  success: '#30D158',
  error:   '#FF453A',
  warning: '#FFD60A',
  info:    '#ADF3FF',

  text: {
    primary:   '#F2F2F7',
    secondary: '#ABABAB',
    tertiary:  '#6B6B6B',
    light:     '#9E9E9E',
    white:     '#FFFFFF',
    disabled:  '#4A4A4A',
    link:      '#ADF3FF',
    inverse:   '#141416',
  },

  background: {
    primary:   '#141416',
    secondary: '#1C1C1E',
    tertiary:  '#242428',
    card:      '#1C1C1E',
    input:     '#2C2C2E',
    dark:      '#141416',
    overlay:   'rgba(0,0,0,0.70)',
    white:     '#1C1C1E',
    light:     '#242428',
    blue:      'rgba(173,243,255,0.10)',
    lightBlue: 'rgba(173,243,255,0.06)',
  },

  border: {
    subtle:  'rgba(255,255,255,0.06)',
    light:   'rgba(255,255,255,0.10)',
    medium:  'rgba(255,255,255,0.16)',
    dark:    'rgba(255,255,255,0.22)',
    teal:    'rgba(173,243,255,0.25)',
    black:   'rgba(255,255,255,0.10)',
  },

  button: {
    primary:   { background: '#4CC1D4', text: '#141416', border: '#4CC1D4', pressed: '#2A8FA0' },
    secondary: { background: 'transparent', text: '#ADF3FF', border: '#4CC1D4', pressed: 'rgba(173,243,255,0.10)' },
    accent:    { background: 'rgba(173,243,255,0.12)', text: '#ADF3FF', border: 'rgba(173,243,255,0.25)', pressed: 'rgba(173,243,255,0.20)' },
    danger:    { background: 'rgba(255,69,58,0.12)', text: '#FF453A', border: '#FF453A', pressed: 'rgba(255,69,58,0.25)' },
  },

  gradient: {
    blue:    ['#1C1C1E', '#ADF3FF'],
    teal:    ['#2A8FA0', '#4CC1D4'],
    primary: ['#4CC1D4', '#ADF3FF'],
    dark:    ['#141416', '#1C1C1E'],
  },

  facebook: '#1877F2',
  google:   '#EA4335',
  twitter:  '#1DA1F2',

  transparent: 'transparent',
  shadow:      'rgba(0,0,0,0.40)',
};

export const SPACING = {
  xs:   4,  sm:  8,  md:   12,
  lg:  16,  xl: 20,  xxl:  24,  xxxl: 32,
};

export const RADIUS = {
  sm: 8,  md: 12,  lg: 16,  xl: 20,  xxl: 24,  full: 999,
};

export const TYPOGRAPHY = {
  h1:    { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  h2:    { fontSize: 22, fontWeight: '700', letterSpacing: -0.3 },
  h3:    { fontSize: 18, fontWeight: '700', letterSpacing: -0.2 },
  h4:    { fontSize: 16, fontWeight: '700' },
  body:  { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  bodyS: { fontSize: 13, fontWeight: '400', lineHeight: 19 },
  label: { fontSize: 11, fontWeight: '600', letterSpacing: 0.8, textTransform: 'uppercase' },
  mono:  { fontSize: 12, fontWeight: '600', letterSpacing: 2 },
};


export default COLORS;