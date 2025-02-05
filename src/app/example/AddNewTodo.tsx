'use client'

import { Spinner } from '@/components/spinner'
import { addNewTodo, refreshCache } from './actions'
import { useActionState, useState } from 'react'
import { BoltIcon, PlusIcon } from '@heroicons/react/16/solid'

export function AddNewTodo() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, pendingSubmission] = useActionState(addNewTodo, false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, formActionRefreshCache, pendingRefresh] = useActionState<boolean>(
    refreshCache,
    false
  )

  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          role="button"
          onClick={() => {
            setShowForm(true)
          }}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <PlusIcon className="size-4" /> Add new item
        </button>
        <button
          type="button"
          role="button"
          formAction={formActionRefreshCache}
          disabled={pendingRefresh}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {pendingRefresh ? (
            <Spinner size="xs" />
          ) : (
            <BoltIcon className="size-4" />
          )}
          Refresh cache
        </button>
      </div>
      {showForm && (
        <form className="max-w-sm space-y-2">
          <div className="mb-5">
            <label
              htmlFor="activity"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Activity
            </label>
            <input
              type="text"
              id="activity"
              name="activity"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Type activity"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              role="button"
              formAction={formAction}
              disabled={pendingSubmission}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {pendingSubmission && <Spinner size="xs" />}
              Submit
            </button>
            <button
              type="button"
              role="button"
              disabled={pendingSubmission}
              onClick={() => {
                setShowForm(false)
              }}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 hover:underline focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
