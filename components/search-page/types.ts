export interface paramsInterface extends URLSearchParams {
  time_range: null | string
  limit: null | string
  id: null | number
  ids: null | []
  type: null | string
  name: null | string
  seed_artists: null | []
  target_danceability: null | number
  target_acousticness: null | number
  target_energy: null | number
  target_instrumentalness: null | number
  target_liveness: null | number
  target_loudness: null | number
  target_speechiness: null | number
  target_valence: null | number
}
export interface SpotifyRequestParameters {
  token: string
  searchParams: paramsInterface | null
  queryLink: string | null
}

export type PopularSongsData = {
  collaborative: boolean
  description: string
  external_urls: object
  followers: object
  href: string
  id: string
  images: object[]
  name: string
  owner: object
  primary_color: string
  public: boolean
  snapshot_id: string
  tracks: {
    items: Item[]
  }
  type: string
  uri: string
}

export interface Item {
  track: {
    album: {
      album_type: string
      images: Array<{ url: string }>
    }
    artists: object[]
    duration_ms: number
    episode: boolean
    explicit: false
    external_ids: object
    external_urls: object
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track: boolean
    track_number: number | null
    type: string
    uri: string
  }
}
