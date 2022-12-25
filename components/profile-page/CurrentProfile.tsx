import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { getSpotifyData } from '../../components/utils';
import { Data, User } from '../../types/components';

export default function CurrentProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  const getUserData = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: `me`,
    }).then((data: Data): void => {
      data && setUser(data);
    });
  };

  useEffect(() => {
    session?.accessToken && getUserData();
  }, [session]);

  return (
    <div className="flex items-center flex-col w-full">
      <img
        src={user?.images[0]?.url}
        width="200"
        height="200"
        className="rounded-full w-[200px] h-[200px] object-cover object-center"
      />
      {user && (
        <div className="flex flex-col w-full mt-5 gap-y-3">
          <div className="rounded-md px-2 py-1 w-full text-center font-semibold text-3xl text-white">
            <span>{user.display_name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
