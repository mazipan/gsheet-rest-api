'use client'

import { Spinner } from '@/components/spinner'
import { markAsDone, removeTodo } from './actions'
import clsx from 'clsx'
import { useActionState } from 'react'
import { CheckIcon, TrashIcon } from '@heroicons/react/16/solid'

export function TodoItem({
  todo,
}: {
  todo: { _row: number; ACTIVITY: string; STATUS: boolean }
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formActionMarkAsDone, pendingMarkAsDone] = useActionState(
    markAsDone,
    false
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, formActionRemove, pendingRemove] = useActionState(
    removeTodo,
    false
  )

  return (
    <form className="flex items-center justify-between gap-1">
      <input type="hidden" name="row" value={todo._row} />

      <div className="flex items-center gap-2">
        <span className={clsx(todo.STATUS && 'line-through')}>
          {todo.ACTIVITY}
        </span>
      </div>
      {!todo.STATUS ? (
        <button
          type="submit"
          role="button"
          formAction={formActionMarkAsDone}
          disabled={pendingMarkAsDone}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {pendingMarkAsDone ? (
            <Spinner size="xs" />
          ) : (
            <CheckIcon className="size-4" />
          )}
          Mark as done
        </button>
      ) : (
        <button
          type="submit"
          role="button"
          formAction={formActionRemove}
          disabled={pendingRemove}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-700 p-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          {pendingRemove && <Spinner size="xs" />}
          <TrashIcon className="size-4" />
        </button>
      )}
    </form>
  )
}
