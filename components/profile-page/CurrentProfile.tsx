import React from 'react';
import { User } from '../../types/components';

export default function CurrentProfile({profile} : {profile : User}) {

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
      </div>
    </div>
  );
}
