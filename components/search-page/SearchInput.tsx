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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#9ca3af"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
