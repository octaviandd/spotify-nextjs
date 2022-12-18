import { useRef, useLayoutEffect, useEffect } from 'react';
import { SpotifyRequestParameters, Data, SongStats } from '../types/components';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useArrayRef = () => {
  const refs: any = useRef([]);
  refs.current = [];
  return [refs, (ref: HTMLElement) => ref && refs.current.push(ref)];
};

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: any;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export const getSpotifyData = async ({ token, searchParams, queryLink }: SpotifyRequestParameters): Promise<Data> => {
  let urlParams = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === 'object' && key !== 'ids') {
        let values = value.map((item: any) => (key === 'seed_genres' ? item.label : item.value)).toString();
        urlParams.append(key, values);
      } else {
        urlParams.append(key, value);
      }
    }
  }

  try {
    let link = 'https://api.spotify.com/v1/';
    if (queryLink) link += queryLink + '?';
    if (searchParams) link += urlParams;
    let res = await fetch(link, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) return false;
    let data: Data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const tracksReducer = (data: SongStats) => {
  const initialValue = {
    danceability: 0,
    energy: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
  };

  let aggregates = data.reduce((acc, { danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo }) => {
    acc.danceability += danceability;
    acc.energy += energy;
    acc.speechiness += speechiness;
    acc.acousticness += acousticness;
    acc.instrumentalness += instrumentalness;
    acc.liveness += liveness;
    acc.valence += valence;

    return acc;
  }
    , initialValue)

  for (const key in aggregates) {
    aggregates[key] = aggregates[key] / Object.keys(aggregates).length;
  }

  let arrayOfObjects = [];
  for (const [key, value] of Object.entries(aggregates)){
    if (
      typeof value === 'number' &&
      !key.includes('_') &&
      key != 'duration_ms' &&
      key != 'mode' &&
      key != 'key' &&
      key !== 'loudness' &&
      key !== 'tempo'
    ) {
      arrayOfObjects.push({ name: key.charAt(0).toUpperCase() + key.slice(1), A: value.toFixed(3), B: 1 });
    }
  }

  return arrayOfObjects
}