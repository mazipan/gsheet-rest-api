'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  return (
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
      <MoonIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <SunIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
