import React from 'react'
import { Global, css } from '@emotion/core'
import palette from 'material-colors'

const baseHeight = 8

const breakpoints = ['40em', '52em', '64em', '100em']

const defaultFontList =
  '-apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif'

const colors = {
  primary: palette.red[500],
  secondary: palette.blue[500],
  palette
}

const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]
const fontSizes = [12, 14, 16, 18, 24, 32, 48, 64]
const lineHeights = [1, 1.125, 1.25, 1.5]
const fontWeights = {
  light: 100,
  thin: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
}
const fontFamilies = [`${defaultFontList}`]

const Text = {
  variant: 'caption'
}
const TextVariants = {
  h1: {
    fontSize: [4, 5],
    fontWeight: 'semibold',
    lineHeight: 0
  },
  h2: {
    fontSize: [3, 4],
    lineHeight: [1.3334, 0],
    fontWeight: 'medium'
  },
  h3: {
    fontSize: [2, 3],
    lineHeight: [1.5, 1.3334],
    fontWeight: 'bold'
  },
  h4: {
    fontSize: 2,
    lineHeight: 1.5,
    fontWeight: 'semibold'
  },
  h5: {
    fontSize: 1,
    lineHeight: 1.3334,
    fontWeight: 'bold'
  },
  h6: {
    fontSize: 0,
    lineHeight: 1.3334,
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  subhead1: {
    fontSize: 3,
    lineHeight: 1.3334,
    color: colors.palette.grey[600]
  },
  title: {
    fontSize: 1,
    lineHeight: 1.1429
  },
  caption: {
    fontSize: 0,
    lineHeight: 1.3334
  },
  p: {
    fontSize: 0,
    lineHeight: 1.3334
  }
}

const Button = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: baseHeight * 4,
  px: 3,
  bg: 'primary',
  color: 'white',
  border: 0,
  fontSize: 1,
  lineHeight: 0,
  fontWeight: 'bold',
  textTransform: 'uppercase'
}
const ButtonVariants = {
  secondary: {
    bg: 'secondary',
    color: 'white'
  },
  plain: {
    bg: 'gray.4',
    color: 'gray.0'
  },
  large: {
    height: 50,
    px: 4
  },
  small: {
    fontSize: 0,
    fontWeight: 'semibold',
    textTransform: 'none'
  },
  icon: {
    width: 35,
    px: 0,
    bg: 'transparent',
    color: 'gray.0'
  },
  transparent: {
    bg: 'transparent',
    color: '#181818',
    fontWeight: 'semibold'
  }
}

const Link = {}
const LinkVariants = {}

const Box = {}
const BoxVariants = {
  container: {
    maxWidth: 960,
    px: 3,
    width: '100%',
    mx: 'auto'
  },
  section: {
    p: 3,
    width: '100%',
    mx: 'auto'
  },
  cover: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}

export default {
  breakpoints,
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  fontFamilies,
  Text,
  TextVariants,
  BoxVariants,
  Button,
  ButtonVariants,
  Link,
  LinkVariants
}

export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-size-adjust: 100%;
        text-rendering: optimizeLegibility;
      }
      html,
      body {
        font-family: ${fontFamilies[0]};
        color: #252525;
        font-size: ${fontSizes[1]}px;
        line-height: ${lineHeights[3]};
        position: relative;
      }

      @media print {
        html,
        body {
          overflow: visible;
          height: auto;
        }
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
      }
      p a {
        color: ${colors.primary};
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      input.text,
      textarea,
      input[type='text'],
      input[type='tel'],
      input[type='email'],
      input[type='search'],
      input[type='button'],
      input[type='submit'],
      select {
        -webkit-appearance: none;
        border-radius: 0;
        :active,
        :focus {
          outline: none;
        }
      }
      button {
        :active,
        :focus {
          outline: none;
        }
      }
    `}
  />
)
