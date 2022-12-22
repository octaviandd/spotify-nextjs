
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white w-full pt-4 drop-shadow-md">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-col items-center"></div>
            <div className="flex justify-between gap-1 w-12 h-10 ml-4">
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-slow"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-loud"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
            </div>
          </div>
          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {session?.user && (
              <div className="flex items-center">
                <div className="pr-5 font-bold  flex items-start">
                  <span className="bg-[#00CA4E] text-[8px] text-black rounded-sm font-semibold px-2 py-1 mr-2">
                    NEW FEATURE
                  </span>
                  <div className="border-2 rounded-md border-[#00CA4E] px-4 py-2 hover:text-[#00CA4E]">
                    <Link href="/search" className="border px-3">
                      Search
                    </Link>
                  </div>
                </div>
                <div className="pr-5 font-bold hover:text-[#00CA4E]">
                  <Link href="/discovery">Discovery</Link>
                </div>
                <div className="pr-5 font-bold hover:text-[#00CA4E]">
                  <Link href="/profile">Profile</Link>
                </div>
                <div className="pr-5 font-semibold h-[20px] w-[1px]">|</div>
              </div>
            )}
            <div className="ml-3 relative">
              {!session?.user ? (
                <a
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn('spotify', {
                      callbackUrl: `${window.location.origin}/search`,
                    });
                  }}
                  className="inline-block mr-2"
                >
                  <button
                    type="button"
                    className="group ease-in-out transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 px-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="hidden md:inline-block pr-1">Connect with </span>
                    <span>Spotify</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block ml-1 group-hover:translate-x-2 ease-in-out duration-300"
                    >
                      <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </a>
              ) : (
                <div className="flex items-center">
                  <img
                    src={session.user.image as string | undefined}
                    width="50"
                    height="50"
                    className="rounded-full object-top object-cover w-[50px] h-[50px] mr-6"
                  />
                  <div className="flex px-4 py-3 cursor-pointer rounded-md whitespace-nowrap hover:bg-[#00CA4E] transition duration-500 ease-in-out group mr-2">
                    <span
                      className="flex items-center"
                      onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}
                    >
                      <span className="hidden md:block">LOGOUT</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 pl-0 md:pl-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}