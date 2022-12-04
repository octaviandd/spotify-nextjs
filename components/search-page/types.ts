/**
 * Request parameters
 */

export interface paramsInterface {
  time_range?: undefined | string
  limit?: undefined | number
  id?: undefined | number
  ids?: undefined | []
  type?: undefined | string
  name?: undefined | string
  seed_artists?: undefined | []
  target_danceability?: undefined | number
  target_acousticness?: undefined | number
  target_energy?: undefined | number
  target_instrumentalness?: undefined | number
  target_liveness?: undefined | number
  target_loudness?: undefined | number
  target_speechiness?: undefined | number
  target_valence?: undefined | number
  q?: undefined | string
  offset: undefined | number
}
export interface SpotifyRequestParameters {
  token: string
  searchParams: paramsInterface | undefined
  queryLink: string | null
}

/**
 * Response variables
 */

type ItemProperty = "artists" | "tracks" | "albums" | "genres"

export type TraitType =
  | { type: "playlistObject"; value: PlaylistResponseObject }
  | { type: "defaultObject"; value: DefaultItemTypeResponse }

export type PlaylistResponseObject = {
  collaborative: boolean
  description: string
  external_urls: object
  followers: object
  href: string
  id: string
  images: object[]
  name: string
  owner: object
  primary_color: null | string
  public: boolean
  snapshot_id: string
  tracks: SongResponseObject[]
  type: "playlist"
  uri: string
}

export type DefaultItemTypeResponse = {
  [key in ItemProperty]?: {
    href: String
    items: ObjectModel
    limit: Number
    next: String
    offset: Number
    previous: null
    total: Number
  }
}

export type ArtistItemResponseObject = {
  external_urls: object
  followers: object
  genres: string[]
  href: string
  id: string
  images: Array<{ url: string; height: number }>
  name: string
  popularity: number
  type: string
  uri: string
}

export type SongResponseObject = {
  album: { images: Array<{ url: string }> }
  artists: ArtistItemResponseObject[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: object
  external_urls: object
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

type ObjectModel = ArtistItemResponseObject[] | SongResponseObject[]

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
    artists: Array<{ name: string }>
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
