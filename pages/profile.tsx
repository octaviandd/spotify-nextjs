import { useSession } from 'next-auth/react';
import React, {useEffect, useState} from 'react';
import AccessDenied from '../components/AccessDenied';
import Layout from '../components/Layout';
import { getSpotifyData } from '../components/utils';

export default function Profile() {
  const { data: session } = useSession()

  console.log(session)

  const getData = () => {
    
  }

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='grid grid-cols-profile'>
        <div className='border-r-2 pr-5'>
          <div className='w-full h-full flex flex-col justify-between'>
            <span>Stats</span>
            <span>Songs</span>
            <span>Playlists</span>
          </div>
        </div>
        <div className='w-full pt-10'>
          <div className='w-full flex justify-center'>
            <h2 className='text-6xl font-bold leading-tight text-center'>&#128075; {session?.user?.name}, <br /> <span className='text-4xl text-slate-600'>here are your stats</span></h2>
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  )
}