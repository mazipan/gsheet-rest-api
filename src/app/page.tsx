'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function Home() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="relative grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="absolute -z-10 h-screen w-screen max-w-full overflow-hidden min-[2048px]:max-w-[2048px]">
        <div className="blur-bg absolute -top-[252px] left-[100px] h-[267px] w-[1192px] rotate-[-20deg] rounded-full opacity-100 blur-[48px] delay-1000 duration-700 ease-in-out motion-safe:animate-pulse md:opacity-40"></div>
        <div className="blur-bg absolute -top-[200px] left-[240px] h-[276px] w-[1192px] rotate-[-32deg] rounded-full opacity-25 blur-[48px] delay-1000 duration-500 ease-in-out motion-safe:animate-pulse"></div>
        <div className="blur-bg absolute -top-[440px] -left-[200px] h-[388px] w-[1758px] rotate-[40deg] rounded-full opacity-80 blur-[48px] delay-700 duration-1000 ease-in-out motion-safe:animate-pulse"></div>
        <div className="blur-bg absolute -top-[280px] left-[960px] h-[492px] w-[1192px] rotate-[-32deg] rounded-full opacity-75 blur-[48px] delay-500 duration-300 ease-in-out motion-safe:animate-pulse"></div>
      </div>
      <main className="row-start-2 flex flex-col items-center gap-16 sm:items-start">
        <h1 className="self-center text-4xl font-extrabold">
          📑 GSheet Rest API
        </h1>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            Docs
          </Link>
          <Link
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="/example"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
              />
            </svg>
            Example
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <button
          role="button"
          className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-slate-900 hover:bg-slate-200 dark:text-slate-200 hover:dark:bg-slate-700"
          onClick={() => {
            if (theme !== 'dark') {
              setTheme('dark')
            } else {
              setTheme('light')
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            data-icon="moon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            data-icon="sun"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </button>
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
    </div>
  )
}
