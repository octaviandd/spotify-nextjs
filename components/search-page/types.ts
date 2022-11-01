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
  tracks: object
  type: string
  uri: string
}
