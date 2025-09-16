import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const fonts = {
  heading: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  body: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
}

const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800'
    }
  }
}

export const theme = extendTheme({
  config,
  fonts,
  styles,
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl'
      }
    },
    Card: {
      baseStyle: {
        borderRadius: '2xl'
      }
    }
  }
})
