import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Usa essa sitax quando a biblioteca que eu estou importando nao tem o default dentro
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  TaskInput,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
} from './styles'
import { useState } from 'react'
// Contreolled: Mantem em tempo real a informacao do usuario guardada
// Uncontrolled: So pega as informacoes quando for necessario

// Biblioteca que vamos usa: React Hook Form

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimo 5 min')
    .max(60, 'O ciclo precisa ser de no maximo 60 min'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycle, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // register: recebe o nome do input e retorna metodos como onChange
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      // Importante iniciar os valores zerados
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    
    const newCycle: Cycle = {
      id: String(new Date().getTime()), // Solucao para nao precisar baixar uma biblioteca para o id(temporaria)
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycle(state => [...state, newCycle]) // Adiciona uma nova informacao ao array, sempre que denpender de um formato anterior colocar no modelo de arrow function
    setActiveCycleId(newCycle.id)

    reset() // A funcao reset funciona resetando de acordo com os campos que eu coloquei no default value
  }

  const activeCycle = cycle.find((cycle) => cycle.id == activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0') // Preenche uma string ate um tamanho especifico
  const seconds = String(secondsAmount).padStart(2, '0') // Preenche uma string ate um tamanho especifico

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {/* Vou usar esse disabled para fazer uma condição dentro do styled components */}
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
