/**
 * Request parameters
 */

import { ReactNode } from "react";

export interface paramsInterface {
  time_range?: undefined | string;
  limit?: undefined | number;
  id?: undefined | number;
  ids?: undefined | string[] | string;
  type?: undefined | string;
  name?: undefined | string;
  seed_artists?: undefined | string[] | string;
  seed_tracks?: undefined | string[] | string;
  target_danceability?: undefined | number;
  target_acousticness?: undefined | number;
  target_energy?: undefined | number;
  target_instrumentalness?: undefined | number;
  target_liveness?: undefined | number;
  target_loudness?: undefined | number;
  target_speechiness?: undefined | number;
  target_valence?: undefined | number;
  q?: undefined | string;
  offset?: undefined | number;
  country?: undefined | string;
}
export interface SpotifyRequestParameters {
  token: string;
  searchParams: paramsInterface | undefined;
  queryLink: string | null;
}
interface CommonResponseProperties {
  href: String;
  items: any[];
  limit: Number;
  next: String;
  offset: Number;
  previous: null;
  total: Number;
}

interface test {
  seeds: any;
  tracks: any
}

export interface Data {
  type: 'artists' | 'tracks' | 'albums' | 'genres' | 'playlist' | 'user';
  artists?: CommonResponseProperties & {
    items: Artist[];
  };
  tracks?: CommonResponseProperties & {
    items: Track[];
  };
  seeds?: object;
  albums?: CommonResponseProperties & {
    items: Album[];
  };
  genres?: string[];
  playlists?: CommonResponseProperties & {
    items: Playlist[];
  };
  categories?: CommonResponseProperties & {
    items: Category[];
  };
  items?: CombinedAlbum[] & Playlist[] & Track[];
  item?: Track;
  audio_features?: SongStats;
  is_playing?: boolean
}

export interface Artist {
  external_urls: object;
  followers: object;
  genres: string[];
  href: string;
  id: string;
  images: Array<{ url: string; height: number }>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface AggregateValues {
  danceability: number;
  energy: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
}

export interface Track {
  [x: string]: any;
  album: { images: Array<{ url: string }> };
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: object;
  external_urls: object;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: String;
  artists: Artist[];
  available_markets: string[];
  copyrights: {}[];
  external_ids: {};
  external_urls: {};
  genres: [];
  id: string;
  href: string;
  images: Array<{ url: string; height: number }>;
  label: string;
  name: string;
  popularity: number
  release_date: string
  release_date_precision: string;
  tracks: CommonResponseProperties & {
    items: Track[];
  };
  total_tracks: number
  type: string;
  uri: string
}
export interface FollowedAlbum {
  added_at: string,
  album: {
    href: String;
    items: Album[];
    limit: Number;
    images: Array<{ url: string; height: number }>;
    next: String;
    offset: Number;
    previous: null;
    name: string;
    total: Number;
  }
}

export interface CombinedAlbum extends Album, FollowedAlbum {
}
/**
 * Response variables
 */

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: object;
  followers: object;
  href: string;
  id: string;
  images: Array<{ url: string; height: number }>;
  name: string;
  owner: {
    display_name: string
  };
  primary_color: null | string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: String;
    items: Track[];
    limit: Number;
    next: String | null;
    offset: Number;
    previous: null;
    total: Number;
  }
  type: 'playlist';
  uri: string;
};

export type Category = {
  href: string
  icons: Array<{ url: string }>;
  id: string
  name: string
};

export type SongStats = {
  type: 'audio_features';
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  uri: string;
  valence: number;
};

export type User = {
  type: 'user'
  country : string,
  display_name : string,
  email : string,
  explicit_content : {
    filter_enabled : boolean,
    filter_locked : boolean
  },
  external_urls : {
    spotify : string
  },
  followers : {
    href : string | null,
    total : number
  },
  href : string
  id : string
  images : [ {
    height : null | number,
    url : string,
    width : null | number
  } ],
  product : string,
  uri : string
}

export interface AnimateProps {
  children: ReactNode;
  from: object;
  to: object;
  durationIn: number;
  durationOut: number;
  delay: number;
  delayOut: number;
  direction: string;
  set?: object | undefined | null;
  skipOutro?: boolean;
}