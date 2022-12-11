import { useSession } from 'next-auth/react';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { RootState } from '../../store';
import { updateCurrentSong } from '../../store/songSlice';
import { getSpotifyData } from '../utils';
import { gsap } from "gsap";

const selectSong = (state: RootState) => state.song.currentSong;

export default function SongModal() {
  const song = useSelector(selectSong);
  const [loading, setLoading] = useState(false);
  const [songValues, setSongValues] = useState<any>([]);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const tl: any = useRef();
  const [isVisible, setIsVisible]  = useState(false)

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
    if (song.id) {
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: undefined,
        queryLink: `audio-features/${song.id}`,
      }).then((data: object): void => {
        let values = [];
        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'number' && !key.includes('_') && key != 'duration_ms' && key != 'mode' && key != 'key' && key !== 'loudness' && key !== 'tempo') {
            values.push({name: key.charAt(0).toUpperCase() + key.slice(1), A: value, B: 1})
          }
        }
        setIsVisible(true);
        setSongValues(values)
        setLoading(false);
      });
    }
  }, [song]);

  useEffect(() => {
    if (modalRef.current) {
      let ctx = gsap.context(() => {
          gsap.fromTo(modalRef.current, { opacity: 0, scaleX: 0, scaleY: 0 },
            {
              opacity: 1,
              duration: 0.5,
              scaleX: 1,
              scaleY: 1,
              transformOrigin: 'center',
            });
      }, modalRef);
      return () => ctx.revert();
    }
  }, [isVisible])

  if (isVisible) {
    return (
      <div ref={modalRef} className="grid grid-rows-layout fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vh] bg-[#006450] rounded-lg">
        <div className="bg-[rgba(0,0,0,.2)] py-6 px-10 text-xl font-semibold text-white flex justify-between">
          <div>
            <span className="mr-2">{song.artists.map((artist) => artist.name)}</span>-
            <span className="ml-2">{song.name}</span>
          </div>
          <span className="cursor-pointer" onClick={() => setIsVisible(false)}>
            &times;
          </span>
        </div>
        {songValues.length > 0 && <ResponsiveContainer width="100%" height="100%" className="bg-white">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={songValues}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>}
        <div className="bg-[rgba(0,0,0,.2)] py-6 px-10 text-xl font-semibold text-white">
          Pills with the relative genres Other suggestions from the same artist
        </div>
      </div>
    );
  } else {
    return <div>'Loading...'</div>;
  }
}
