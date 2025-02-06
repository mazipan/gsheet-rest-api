'use client'

import Link from 'next/link'
import { CursorArrowRaysIcon } from '@heroicons/react/16/solid'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { BookOpenIcon, CubeIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="relative grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="absolute -z-10 h-screen w-screen max-w-full overflow-hidden min-[2048px]:max-w-[2048px]">
        <div className="absolute -top-[252px] left-[100px] h-[267px] w-[1192px] rotate-[-20deg] rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 opacity-100 blur-[48px] delay-1000 duration-700 ease-in-out motion-safe:animate-pulse md:opacity-40"></div>
        <div className="absolute -top-[200px] left-[240px] h-[276px] w-[1192px] rotate-[-32deg] rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 opacity-25 blur-[48px] delay-1000 duration-500 ease-in-out motion-safe:animate-pulse"></div>
        <div className="absolute -top-[440px] -left-[200px] h-[388px] w-[1758px] rotate-[40deg] rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 opacity-80 blur-[48px] delay-700 duration-1000 ease-in-out motion-safe:animate-pulse"></div>
        <div className="absolute -top-[280px] left-[960px] h-[492px] w-[1192px] rotate-[-32deg] rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 opacity-75 blur-[48px] delay-500 duration-300 ease-in-out motion-safe:animate-pulse"></div>

        <div className="absolute -bottom-[280px] -left-[1000px] h-[492px] w-[1192px] rotate-[-32deg] rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 opacity-75 blur-[72px] delay-500 duration-300 ease-in-out motion-safe:animate-pulse"></div>
        <div className="absolute -bottom-[440px] -left-[100px] h-[200px] w-[1758px] rotate-[40deg] rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 opacity-80 blur-[100px] delay-700 duration-1000 ease-in-out motion-safe:animate-pulse"></div>
      </div>
      <main className="row-start-2 flex flex-col items-center gap-16 sm:items-start">
        <div className="space-y-6 self-center text-center">
          <h1 className="self-center text-4xl font-extrabold">
            📑 GSheet Rest API
          </h1>
          <p className="self-center text-center text-lg">
            Effortless REST API for your Google Sheet.
            <br />
            Instantly turn your Google Sheet into a powerful API.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-black px-4 text-sm text-white transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:border dark:border-white/[.145] dark:bg-slate-100 dark:text-black dark:hover:bg-slate-300"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmazipan%2Fgsheet-rest-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              fill="none"
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1155 1000"
            >
              <path
                d="m577.3 0 577.4 1000H0z"
                className="fill-white dark:fill-black"
              />
            </svg>
            Deploy now
          </a>
          <Link
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="/docs"
            prefetch={false}
          >
            <BookOpenIcon className="size-5" />
            Docs
          </Link>
          <Link
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="/example"
            prefetch={false}
          >
            <CursorArrowRaysIcon className="size-5" />
            Example
          </Link>
        </div>
      </main>
      <footer className="relative row-start-3 flex flex-wrap items-center justify-center gap-6">
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
    </div>
  )
}
