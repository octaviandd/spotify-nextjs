import React from 'react';
import { User } from '../../types/components';
import { signOut } from 'next-auth/react';

export default function CurrentProfile({ profile }: { profile: User }) {
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center flex-col w-full">
      <img
        src={profile?.images[0]?.url}
        width="200"
        height="200"
        className="rounded-full w-[200px] h-[200px] object-cover object-center"
      />
      <div className="flex flex-col w-full mt-5 gap-y-3">
        <div className="rounded-md px-2 py-1 w-full text-center font-semibold text-3xl text-white">
          <span>{profile.display_name}</span>
        </div>
        <a
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
          className="inline-block mr-2"
        >
          <button
            type="button"
            className="group ease-in-out transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 px-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="block pr-1">Logout</span>
          </button>
        </a>
      </div>
    </div>
  );
}
