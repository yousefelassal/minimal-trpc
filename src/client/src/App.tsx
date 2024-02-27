import { useState } from 'react'
import { trpc } from './utils/trpc'
import Hello from './components/Hello'

const App = ()=> {
  const [client] = useState(() => trpc.createClient())
  return (
    <trpc.Provider client={client}>
      <Hello />
    </trpc.Provider>
  )
}

export default App