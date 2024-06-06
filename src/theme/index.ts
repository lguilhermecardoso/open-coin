import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    green: {
      100: '#5EDAC8',
      200: '#35D0BA',
      300: '#28AA98',
    },
    gray: {
      700: '#111111'
    },
    yellow: {
      100: '#FEFED5'
    },
    white: {
      100: '#FFFFFF'
    },
  },
  fonts: {
    body: 'Roboto_400Regular',
    heading: 'Roboto_700Bold',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148
  },
})