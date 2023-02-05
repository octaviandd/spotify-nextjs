import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../../store/searchSlice';
import { RootState } from '../../store/reduxStore';

const selectSearch = (state: RootState) => state.search;

export default function SearchInput({
  isOpen,
  handleOpen,
  hidden,
}: {
  isOpen: boolean;
  hidden: boolean;
  handleOpen: (value: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const search = useSelector(selectSearch).search;

  const handleChange = (text: string) => {
    dispatch(updateSearch(text));
  };

  return (
    <div className="w-full">
      <div className="bg-[#000000] relative pointer-events-auto h-[40px]">
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          ref={inputRef}
          className="peer absolute w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 shadow-sm py-1.5 pl-[35px] pr-3 dark:bg-[#16181c] dark:highlight-white/5 dark:hover:bg-slate-700"
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
        {!search && (
          <span className="ml-auto absolute pl-3 z-10 flex-none font-semibold left-[25px] top-[7px] text-sm leading-6 text-slate-400 peer-focus:hidden">
            Search...
          </span>
        )}
        {!hidden && (
          <span
            onClick={() => handleOpen(!isOpen)}
            className="ml-auto absolute pl-3 z-10 cursor-pointer flex-none font-semibold right-[10px] top-[7px] text-sm leading-6 text-slate-400"
          >
            {!isOpen ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5" />
            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="3" y1="3" x2="21" y2="21" />
              <path d="M9 5h9.5a1 1 0 0 1 .5 1.5l-4.049 4.454m-.951 3.046v5l-4 -3v-4l-5 -5.5a1 1 0 0 1 .18 -1.316" />
            </svg>)}
          </span>
        )}
      </div>
    </div>
  );
}
