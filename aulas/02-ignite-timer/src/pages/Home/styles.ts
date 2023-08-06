import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1; // estou usando só o flex no lugar do height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //Estilização em cascata
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex; // Colocar para meus estilos se posicionarem do jeito que eu quero
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap; //Quando diminuir a aplicação os campos do form quebre em linhas
`
const BaseInput = styled.input`
  //Componente estilizado
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['gray-100']};

  &:focus {
    box-shadow: none; //Tira o sobreado das bordas
    border-color: ${(props) => props.theme['green-500']};
  }

  &::placeholder {
    //Estilizacao de placeholder
    color: ${(props) => props.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1; // Como o container tem display:flex; o flex: 1, faz o componente crescer setando três propriedades

  &::-webkit-calendar-picker-indicator {
    //Remove a flexinha da campo de input
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace; // Usa a 'Roboto Mono' mas se não encontrar vai usar qual quer outra font mono espaçada
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

export const StartCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  //Se não estiver disabled
  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
