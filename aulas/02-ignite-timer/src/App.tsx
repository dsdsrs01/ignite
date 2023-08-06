import { ThemeProvider } from 'styled-components' // Posso usar o ThemeProvider no lugar do fragment '<>'
import { BrowserRouter } from 'react-router-dom'

import { defaulTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaulTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/*
        Tanto faz a posição do globalstyle, feito isso eu vou ter estilos globais na minha aplicação.
        Se não estiver dentro do ThemeProvider, não vai ter acesso ao variavéis do tema.
      */}
      <GlobalStyle />
    </ThemeProvider>
  )
}
