import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="absolute -z-10 h-screen w-screen max-w-full overflow-hidden min-[2048px]:max-w-[2048px]">
        <div className="ray-light absolute -top-[252px] left-[100px] h-[267px] w-[1192px] rotate-[-20deg] rounded-full opacity-100 blur-[48px] md:opacity-40"></div>
        <div className="ray-light absolute -top-[200px] left-[240px] h-[276px] w-[1192px] rotate-[-32deg] rounded-full opacity-25 blur-[48px]"></div>
        <div className="ray-light absolute -top-[440px] -left-[200px] h-[388px] w-[1758px] rotate-[40deg] rounded-full opacity-80 blur-[48px]"></div>
        <div className="ray-light absolute -top-[280px] left-[960px] h-[492px] w-[1192px] rotate-[-32deg] rounded-full opacity-75 blur-[48px]"></div>
      </div>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="text-4xl font-extrabold">📑 GSheet Rest API</h1>

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
            className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="/docs"
          >
            Documentation
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/mazipan/gsheet-rest-ap"
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
