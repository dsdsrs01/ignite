import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />{' '}
      {/* Aqui temos o outlet para posicionar de forma perfeita o nosso conteúde home, history e afins */}
    </LayoutContainer>
  )
}
