import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = useRouter().pathname;

  return (
    <nav className="bg-[#16181c] w-full py-1 font-artists">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-col items-center"></div>
            <div className="flex justify-between gap-1 w-12 h-10 ml-4">
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-slow"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-loud"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
            </div>
          </div>
          <div className="flex items-center pr-2 mx-auto sm:pr-0">
            {session?.user && (
              <div className="flex items-center tracking-wid text-xl">
                <Link href="/search">
                  <div className='px-5 font-semibold text-white hover:bg-[#cdcbcb18] cursor-pointer py-2 rounded-xl transition-all ease-in-out duration-250'>
                    <span className={pathname === '/search' ? 'pointer-events-none' : ''}>Search</span>
                  </div>
                </Link>
                <Link href="/discovery">
                  <div className="px-5 font-semibold text-white py-2 rounded-xl cursor-pointer hover:bg-[#cdcbcb18] transition-all ease-in-out duration-250">
                    <span className={pathname === '/discovery' ? 'pointer-events-none' : ''}>Discovery</span>
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="px-5 font-semibold text-white py-2 rounded-xl cursor-pointer hover:bg-[#cdcbcb18] transition-all ease-in-out duration-250">
                    <span className={pathname === '/profile' ? 'pointer-events-none' : ''}>
                      Profile
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="ml-auto relative">
            {!session?.user && (
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
                  className="flex items-center group ease-in-out transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 px-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                >
                  <span className="hidden md:inline-block pr-1">Connect with </span>
                  <span className='mr-3'>Spotify</span>
                  <Image src="/chevron-right.svg" width={24} height={24} />
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
