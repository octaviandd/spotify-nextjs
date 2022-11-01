import React from "react"

type Props = {}

export default function SearchInput({}: Props) {
  return (
    <div className="w-3/4">
      <div className="bg-white dark:bg-slate-900 relative pointer-events-auto h-[40px] my-5">
        <input
          type="text"
          className="peer absolute w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-[35px] pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
        ></input>
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          className="mr-3 flex-none absolute left-[6px] top-[6px] leading-6 text-slate-400"
        >
          <path
            d="m19 19-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <circle
            cx="11"
            cy="11"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></circle>
        </svg>
        <span className="ml-auto absolute pl-3 z-10 flex-none font-semibold left-[25px] top-[7px] text-sm leading-6 text-slate-400 peer-focus:hidden">
          Quick search...
        </span>
        <span className="ml-auto absolute pl-3 z-10 flex-none font-semibold right-[10px] top-[7px] text-sm leading-6 text-slate-400">
          ⌘K
        </span>
      </div>
    </div>
  )
}
