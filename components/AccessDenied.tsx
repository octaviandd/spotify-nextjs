import { signIn } from 'next-auth/react';

export default function AccessDenied() {
  return (
    <div className="relative flex justify-center items-center h-[70vh]">
      <div className="flex flex-col">
        <h1 className="text-3xl text-white">Oopss, you are not logged in...</h1>
        <a
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault();
            signIn('spotify', {
              callbackUrl: `${window.location.origin}/search`,
            });
          }}
          className="inline-block mr-2 mt-5"
        >
          <button
            type="button"
            className="group ease-in-out transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 px-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="hidden md:inline-block pr-1">Login</span>
          </button>
        </a>
      </div>
    </div>
  );
}
