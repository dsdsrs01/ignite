// Não precisa decorar essa parte, raramente vai ter que fazer uma coisa assim então já deixa anotado pra pegar desse projeto mesmo.
import 'styled-components'
import { defaulTheme } from '../styles/themes/default'

type ThemeType = typeof defaulTheme

declare module 'styled-components' {
  // Criando uma tipagem a mais para o modulo styled-components
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
