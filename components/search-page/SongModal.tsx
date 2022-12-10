import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RootState } from '../../store';
import { updateCurrentSong } from '../../store/songSlice';
import { getSpotifyData } from '../utils';

const selectSong = (state: RootState) => state.song.currentSong;

type Props = {};

const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
  },
];

export default function SongModal({}: Props) {
  const song = useSelector(selectSong);
  const [loading, setLoading] = useState(false);
  const [songValues, setSongValues] = useState([
    {
      name: 'Key',
      A: 0,
      B: 100,
    },
    {
      name: 'Duration',
      A: 0,
      B: 100,
    },
    {
      name: 'Mode',
      A: 0,
      B: 100,
    },
    {
      name: 'Tempo',
      A: 0,
      B: 100,
    },
    {
      name: 'Liveness',
      A: 0,
      B: 100,
    },
    {
      name: 'Speechiness',
      A: 0,
      B: 100,
    },
    {
      name: 'Energy',
      A: 0,
      B: 100,
    },
    {
      name: 'Acousticness',
      A: 0,
      B: 100,
    },

    {
      name: 'Danceability',
      A: 0,
      B: 100,
    },
    {
      name: 'Valence',
      A: 0,
      B: 100,
    },
  ]);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const setSong = () => {
    dispatch(
      updateCurrentSong({
        value: {
          album: {
            images: [],
          },
          artists: [],
          available_markets: [],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {},
          external_urls: {},
          href: '',
          id: '',
          is_local: false,
          name: '',
          popularity: 0,
          preview_url: '',
          track_number: 0,
          type: '',
          uri: '',
        },
      })
    );
  };

  useEffect(() => {
    console.log(song);
    if (song.id) {
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: undefined,
        queryLink: `audio-features/${song.id}`,
      }).then((data: any): void => {
        console.log(data);
        setSongValues([
          {
            name: 'Key',
            A: data.key,
          },
          {
            name: 'Duration',
            A: data.duration_ms,
          },
          {
            name: 'Mode',
            A: data.mode,
          },
          {
            name: 'Tempo',
            A: data.tempo,
          },
          {
            name: 'Liveness',
            A: data.liveness,
          },
          {
            name: 'Speechiness',
            A: data.speechiness,
          },
          {
            name: 'Energy',
            A: data.energy,
          },
          {
            name: 'Acousticness',
            A: data.acousticness,
          },

          {
            name: 'Danceability',
            A: data.danceability,
          },
          {
            name: 'Valence',
            A: data.valence,
          },
        ]);
        setLoading(false);
      });
    }
  }, [song]);

  if (song.id) {
    return (
      <div className="grid grid-rows-layout fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vh] bg-[#006450] rounded-lg">
        <div className="bg-[rgba(0,0,0,.2)] py-6 px-10 text-xl font-semibold text-white flex justify-between">
          <div>
            <span className="mr-2">{song.artists.map((artist) => artist.name)}</span>-
            <span className="ml-2">{song.name}</span>
          </div>
          <span className="cursor-pointer" onClick={setSong}>
            X
          </span>
        </div>
        <ResponsiveContainer width="100%" height="100%" className="bg-white">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={songValues}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="bg-[rgba(0,0,0,.2)] py-6 px-10 text-xl font-semibold text-white">
          Pills with the relative genres Other suggestions from the same artist
        </div>
      </div>
    );
  } else {
    return <div>'Loading...'</div>;
  }
}
