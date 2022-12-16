import { useRef, useLayoutEffect, useEffect } from 'react';
import { SpotifyRequestParameters, Data } from './search-page/types';

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
      if (typeof value === 'object') {
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