import { useState } from "react"
import { trpc } from '../utils/trpc'

export default function EditableSpan({
    user,
    mutate
}:{
    user: {
        id: number | undefined
        name: string | null
        createdAt: Date | undefined
    },
    mutate: () => void
}) {
const [isEditing, setIsEditing] = useState(false)
const [name, setName] = useState<string | null>(user.name)
const { trigger: updateUser, isMutating } = trpc.user.update.useSWRMutation()

const handleUpdate = async () => {
    const updatedUser = { ...user, name }
    await updateUser({ id: user.id as number, name: name as string }, {
        optimisticData: updatedUser,
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
    })
    setIsEditing(false)
    mutate()
}

  return (
    <>
        {isEditing ? (
            <input
                autoFocus
                value={name as string}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleUpdate}
                className="rounded-md border bg-gray-200/20 hover:bg-gray-200/40 py-2 outline-gray-200/40 focus:outline-gray-200/60 focus:outline-2 focus:outline-offset-2 transition-all"
                style={{
                    width: `${name?.length as number + 3}ch`,
                    minWidth: '10ch'
                }}
            />
        ) : (
            <button
                onClick={() => setIsEditing(true)}
                disabled={isMutating}
            >
                {isMutating ? 'updating...' : user.name}
            </button>
        )}
    </>
  )
}
