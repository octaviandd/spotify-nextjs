/**
 * Request parameters
 */

export interface paramsInterface {
  time_range?: undefined | string;
  limit?: undefined | number;
  id?: undefined | number;
  ids?: undefined | [];
  type?: undefined | string;
  name?: undefined | string;
  seed_artists?: undefined | [];
  target_danceability?: undefined | number;
  target_acousticness?: undefined | number;
  target_energy?: undefined | number;
  target_instrumentalness?: undefined | number;
  target_liveness?: undefined | number;
  target_loudness?: undefined | number;
  target_speechiness?: undefined | number;
  target_valence?: undefined | number;
  q?: undefined | string;
  offset: undefined | number;
}
export interface SpotifyRequestParameters {
  token: string;
  searchParams: paramsInterface | undefined;
  queryLink: string | null;
}

export interface Data {
  type: 'artists' | 'tracks' | 'albums' | 'genres' | 'playlist';
  artists?: {
    href: String;
    items: Artist[];
    limit: Number;
    next: String;
    offset: Number;
    previous: null;
    total: Number;
  };
  tracks?: {
    href: String;
    items: Track[];
    limit: Number;
    next: String;
    offset: Number;
    previous: null;
    total: Number;
  };
  seeds?: object;
  albums?: Album;
  genres?: string[];
  playlist?: Playlist;
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

export interface Track {
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
  href: String;
  items: Track[];
  limit: Number;
  next: String;
  offset: Number;
  previous: null;
  total: Number;
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
  images: object[];
  name: string;
  owner: object;
  primary_color: null | string;
  public: boolean;
  snapshot_id: string;
  tracks: Track[];
  type: 'playlist';
  uri: string;
};
