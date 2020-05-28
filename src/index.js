import React, { StrictMode } from "react"
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </StrictMode>, document.querySelector('#app'))