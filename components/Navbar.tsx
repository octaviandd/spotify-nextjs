import React, {  useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from './utils';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = useRouter().pathname;
  const loginRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(loginRef.current, { opacity: 0, x: '-30' }, { opacity: 1, duration: 1, x: 0 });
  })

  return (
    <nav className="bg-[#16181c] w-full py-1 font-artists px-6 lg:px-20" id="main-nav">
      <div className="">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-col items-center"></div>
            <div className="flex justify-between gap-1 w-10 h-8 lg:w-12 lg:h-10 relative">
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-slow"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-loud"></div>
              <div className="bg-[#00CA4E] rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <span
                className="absolute h-[20px] w-[40.5px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#00CA4E]"
                style={{ filter: 'blur(20px)' }}
              ></span>
            </div>
          </div>
          {/* <div className="flex items-center pr-2 mx-auto sm:pr-0">
            {session?.user && (
              <div className="flex items-center text-md lg:text-lg">
                <Link href="/search">
                  <div className="lg:px-5 px-2 font-semibold text-white hover:bg-[#cdcbcb18] cursor-pointer py-2 rounded-xl transition-all ease-in-out duration-250">
                    <span className={pathname === '/search' ? 'pointer-events-none' : ''}>Search</span>
                  </div>
                </Link>
                <Link href="/discovery">
                  <div className="px-2 lg:px-5 font-semibold text-white py-2 rounded-xl cursor-pointer hover:bg-[#cdcbcb18] transition-all ease-in-out duration-250">
                    <span className={pathname === '/discovery' ? 'pointer-events-none' : ''}>Discovery</span>
                  </div>
                </Link>
                <Link href="/profile">
                  <div className="px-2 lg:px-5 font-semibold text-white py-2 rounded-xl cursor-pointer hover:bg-[#cdcbcb18] transition-all ease-in-out duration-250">
                    <span className={pathname === '/profile' ? 'pointer-events-none' : ''}>Profile</span>
                  </div>
                </Link>
              </div>
            )}
          </div> */}
          {!session?.user ? (
            <div className="ml-auto relative">
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn('spotify', {
                    callbackUrl: `${window.location.origin}/search`,
                  });
                }}
                className="inline-block"
              >
                <button
                  type="button"
                  className="flex items-center group ease-in-out transition duration-200 bg-[#00CA4E] hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white w-full py-2.5 px-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                >
                  <span className="md:inline-block pr-1">Connect with Spotify</span>
                  <span ref={loginRef} className='w-[24px] h-[20px]'>
                    <Image src="/chevron-right.svg" width={24} height={20} />
                  </span>
                </button>
              </a>
            </div>
          ) : (
             <div className="ml-auto relative">
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: `${window.location.origin}`});
                }}
                className="inline-block"
              >
                <button
                  type="button"
                  className="flex items-center group ease-in-out transition duration-200 bg-[#00CA4E] hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white w-full py-2.5 px-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                >
                  <span className="md:inline-block pr-1">Logout</span>
                  <span ref={loginRef} className='w-[24px] h-[20px]'>
                    <Image src="/chevron-right.svg" width={24} height={20} />
                  </span>
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
