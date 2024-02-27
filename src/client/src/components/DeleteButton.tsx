import { trpc } from '../utils/trpc'

export default function DeleteButton({id, mutate}:{id: number, mutate: () => void}) {
  const { trigger: deleteUser, isMutating: deleteIsMutating } = trpc.user.delete.useSWRMutation()

  const handleDelete = async () => {
    await deleteUser({ id })
    mutate()
  }

  return (
    <button onClick={handleDelete} disabled={deleteIsMutating} className="rounded-md transition-colors bg-red-200/20 hover:bg-red-200/40 border border-red-200/60 px-4 py-2">
        {deleteIsMutating ? <span>Deleting...</span> : <span>Delete</span>}
    </button>
  )
}
