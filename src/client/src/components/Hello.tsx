import { trpc } from '../utils/trpc'

export default function Hello() {
  const { data, isLoading } = trpc.user.list.useSWR()
  const { data: hello } = trpc.hello.useSWR('world')
  if (isLoading) return <div>Loading...</div>
  return (
    <div className="container p-12 flex flex-col gap-2">
      <h1 className="text-4xl font-bold">{hello}</h1>
      <ul>
          {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
          ))}
      </ul>
    </div>
  )
}
