import { trpc } from '../utils/trpc'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'

export default function Hello() {
  const [name, setName] = useState('')
  const { data, isLoading, mutate } = trpc.user.list.useSWR()
  const { data: hello } = trpc.hello.useSWR('world')
  const { trigger, isMutating } = trpc.user.create.useSWRMutation()
  const [animate] = useAutoAnimate()

  const handleCreate = async () => {
    await trigger({ name })
    setName('')
    mutate()
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container p-12 flex flex-col gap-2">
      <h1 className="text-4xl font-bold">{hello}</h1>
      <ul ref={animate}>
          {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
          ))}
      </ul>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-md transition-all bg-gray-200/20 hover:bg-gray-200/40 border px-4 py-2 outline-gray-200/40 focus:outline-gray-200/60 focus:outline-2 focus:outline-offset-2"
      />
      <button ref={animate} onClick={handleCreate} disabled={isMutating} className="rounded-md transition-colors bg-blue-200/20 hover:bg-blue-200/40 border py-2">
        {isMutating ? <span>Creating...</span> : <span>Create User</span>}
      </button>
    </div>
  )
}
