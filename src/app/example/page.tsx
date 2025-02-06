import Link from 'next/link'
import { TodoItem } from './TodoItem'
import { AddNewTodo } from './AddNewTodo'
import { ArrowLeftIcon, ListBulletIcon } from '@heroicons/react/16/solid'
import { BookOpenIcon, CubeIcon } from '@heroicons/react/24/outline'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { notFound } from 'next/navigation'

const SPREADSHEET_ID = '1OPctiEOSqDXEW040kGEVzDc8crA6Da7Gb36ukAdNjkE'
const SHEET_NAME = 'Sheet1'

type Todo = { _row: number; ACTIVITY: string; STATUS: boolean }

type TodosResponse = {
  columns: { title: string; cell: string }[]
  data: Todo[]
  pagination: {
    perPage: number
    cellRange: string
    offset: number
    nextOffset: number
    totalItems: number
    haveNext: boolean
  }
}

export const dynamic = 'force-dynamic'

export default async function Example() {
  const apiUrl = `${process.env.BASE_URL}/api/v1/sheets/${SPREADSHEET_ID}/${SHEET_NAME}`

  const res = await fetch(apiUrl, {
    cache: 'force-cache',
    next: {
      tags: ['todos'],
      revalidate: 3600,
    },
    headers: {
      'x-api-key': process.env.API_KEY || '',
    },
  })

  if (!res.ok) {
    notFound()
  }

  const todosResponse: TodosResponse = await res.json()

  return (
    <article className="container mx-auto space-y-4 px-4 py-8">
      <nav className="flex items-center gap-2">
        <Link
          prefetch={false}
          href="/"
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 hover:underline focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <ArrowLeftIcon className="size-4" />
          Home
        </Link>
        <Link
          prefetch={false}
          href="/docs"
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 hover:underline focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <BookOpenIcon className="size-4" />
          Docs
        </Link>
      </nav>

      <section className="space-y-4">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold">
          <ListBulletIcon className="size-8" />
          Todo List App
        </h1>

        <p className="text-base text-gray-500 dark:text-gray-400">
          This app was developed to demonstrated how to use{' '}
          <Link className="text-blue-600 underline dark:text-blue-400" href="/">
            gsheet-rest-api
          </Link>{' '}
          to build your next hobby project.
          <br />
          <span>
            Check the complete code for this example in{' '}
            <a
              href="https://github.com/mazipan/gsheet-rest-api/tree/master/src/app/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline dark:text-blue-400"
            >
              src/app/example
            </a>
            .
          </span>
        </p>

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

        <div className="flex flex-wrap gap-2">
          <span className="rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Total: {todosResponse?.pagination?.totalItems}
          </span>
          <span className="rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Has Next? {todosResponse?.pagination?.haveNext?.toString()}
          </span>
          <span className="rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Cell Range: {todosResponse?.pagination?.cellRange}
          </span>
          <span className="rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Offset: {todosResponse?.pagination?.offset}
          </span>
          <span className="rounded-sm bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Next Offset: {todosResponse?.pagination?.nextOffset}
          </span>
        </div>
      </section>

      {/* <div className="!mt-8 space-y-4">
        <h2 className="text-3xl font-extrabold">Google Sheet iFrame</h2>
        <p className="text-base text-gray-400">
          This is the Google Sheet iframe that shows the exact sheet we used.
          You can use it to compare the data with the list above.
        </p>
        <iframe
          className="min-h-[400px] w-full"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQM_q37tvgEvXoYmXdkvY7b0EvyNrr0dQNpDg0QY5-gIO_anrMaIwD57W-juPK1ANuadJLPpBpREBzN/pubhtml?widget=true&amp;headers=false"
        ></iframe>
      </div> */}

      <footer className="row-start-3 mt-16 flex flex-wrap items-center justify-center gap-6">
        <ThemeSwitcher />
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/mazipan/gsheet-rest-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CubeIcon className="size-5" />
          Go to repository →
        </a>
      </footer>
    </article>
  )
}
