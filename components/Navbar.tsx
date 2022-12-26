import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(router.pathname === '/discovery')

  return (
    <nav className="bg-[#16181c] w-full py-4 drop-shadow-md font-artists">
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
                <div className="px-5 font-semibold text-white hover:bg-[#cdcbcb18] py-2 rounded-xl transition-all ease-in-out duration-250">
                  <span className={router.pathname === '/search' ? "pointer-events-none" : ""}>
                     <Link href="/search">
                      Search
                    </Link>
                  </span>
                </div>
                <div className="px-5 font-semibold text-white py-2 rounded-xl hover:bg-[#cdcbcb18] transition-all ease-in-out duration-250">
                  <span className={router.pathname === '/discovery' ? "pointer-events-none" : ""}>
                    <Link href="/discovery">
                      Discovery
                    </Link>
                  </span>
                </div>
                <div className="px-5 font-semibold text-white py-2 rounded-xl hover:bg-[#cdcbcb18] transition-all ease-in-out duration-250">
                  <span className={router.pathname === '/profile' ? "pointer-events-none" : ""}>
                    <Link href="/profile">
                      Profile
                    </Link>
                  </span>
                </div>
              </div>
            )}
            <div className="ml-3 relative">
              {!session?.user &&
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
                    <Image src="/chevron-right.svg" width={24} height={24} />
                  </button>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
