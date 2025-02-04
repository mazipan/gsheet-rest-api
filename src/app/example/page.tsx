import Link from 'next/link'
import { TodoItem } from './TodoItem'
import { AddNewTodo } from './AddNewTodo'
import Image from 'next/image'

const SPREADSHEET_ID = '1OPctiEOSqDXEW040kGEVzDc8crA6Da7Gb36ukAdNjkE'
const SHEET_NAME = 'Sheet1'

type Todo = { _row: number; ACTIVITY: string; STATUS: boolean }

export default async function Example() {
  const apiUrl = `${process.env.BASE_URL}/api/v1/sheets/${SPREADSHEET_ID}/${SHEET_NAME}`

  const res = await fetch(apiUrl, {
    next: {
      tags: ['todos'],
    },
    headers: {
      'x-api-key': process.env.API_KEY || '',
    },
  })

  const todosResponse = await res.json()

  return (
    <article className="container mx-auto space-y-4 py-8">
      <nav className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 hover:underline focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Home
        </Link>
        <Link
          href="/docs"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 hover:underline focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          Documentation
        </Link>
      </nav>

      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold">Example: Todo List</h1>

        <AddNewTodo />

        <ul className="space-y-4">
          {todosResponse.data.map((todo: Todo) => {
            return (
              <li key={todo._row} className="rounded-lg border p-2 shadow">
                <TodoItem todo={todo} />
              </li>
            )
          })}
        </ul>
      </section>

      <footer className="row-start-3 mt-16 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/mazipan/gsheet-rest-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to repository →
        </a>
      </footer>
    </article>
  )
}
