import React, { useState, useEffect } from 'react';
import { Data, Track } from '../../types/components';
import Select from 'react-select';
import { useSession } from 'next-auth/react';
import { getSpotifyData } from '../utils';
import LimitSetter from '../global/LimitSetter';
import { SelectMenuList } from '../global/SelectMenuList';
import { SelectMultiValueLabel } from '../global/SelectMultiValueLabel';
import { SelectMenuOption } from '../global/SelectMenuOption';

export default function FavoriteTracks() {
  const { data: session } = useSession();
  const [currentArtists, setCurrentArtists] = useState<Track[]>();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentTimeFrame, setCurrentTimeFrame] = useState('short_term');

  const getCurrentArtists = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: { limit: currentLimit, offset: 0, time_range: currentTimeFrame },
      queryLink: `me/top/artists`,
    }).then((data: Data): void => {
      data && setCurrentArtists(data.items);
    });
  };

  useEffect(() => {
    console.log('hit')
    session?.accessToken && getCurrentArtists();
  }, [session, currentLimit, currentTimeFrame]);

  return (
    <div className="px-20 mt-4">
      <div className="flex text-xl items-center mb-6">
        <p className="text-xl">Your top Artists</p>
        <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
        <Select
          options={[{ id: 0, label: 'One month', value: 'short_term' }, { id: 1, label: 'Six months', value: 'medium_term' }, {id: 2, label: 'All time', value: 'long_term'}]}
          onChange={(e) => setCurrentTimeFrame(e.value)}
          defaultValue={{ id: 0, label: 'One month', value: 'short_term' }}
          placeholder="Timeline"
          styles={{
            container: (base) => ({
              ...base,
              backgroundColor: '#eee',
              border: '1px solid black',
              borderRadius: '3px',
              marginLeft: "10px",
              zIndex: '50',
              width: "200px",
              fontSize: "12px"
            }),
          }}
          components={{
            MenuList: SelectMenuList,
            MultiValueLabel: SelectMultiValueLabel,
            Option: SelectMenuOption,
          }}
        />
      </div>
      <div className="grid-cols-2 grid grid-rows-auto gap-y-1 gap-x-3">
        {currentArtists &&
          currentArtists.map((artist, index) => (
            <div className="border rounded-md px-2 py-1 flex items-center justify-between" key={index}>
              <div>
                <div className="mb-1 font-normal">{artist.name}</div>
                <div className="flex items-center">
                  <div className="w-[20px] h-[20px] mr-2">
                    <img src={artist.images[2].url} className="w-[20px] h-[20px]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
