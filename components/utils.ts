import { useRef, useLayoutEffect, useEffect } from "react"
import { SpotifyRequestParameters, Data } from "./search-page/types"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export const useArrayRef = () => {
  const refs: any = useRef([])
  refs.current = []
  return [refs, (ref: HTMLElement) => ref && refs.current.push(ref)]
}

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: any;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

export const getSpotifyData = async ({
  token,
  searchParams,
  queryLink,
}: SpotifyRequestParameters): Promise<Data> => {
  let urlParams = new URLSearchParams()
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === 'object') {
        console.log(key)
        let values = value.map((item: any) => key === 'seed_genres' ? item.label : item.value).toString()
        urlParams.append(key, values)
      } else {
        urlParams.append(key, value)
      }
    }
  }

  try {
    let link = "https://api.spotify.com/v1/"
    if (queryLink) link += queryLink + "?"
    if (searchParams) link += urlParams
    let res = await fetch(link, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    let data: Data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}


// export const getUserTopTracks = async (time_range: string) => {
//   try {
//     let res = await fetch(
//       "https://api.spotify.com/v1/me/top/tracks?" +
//         new URLSearchParams({
//           time_range: time_range,
//           limit: "50",
//         }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )
//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getFollowedArtists = async () => {
//   try {
//     let res = await fetch(
//       "https://api.spotify.com/v1/me/following?" +
//         new URLSearchParams({
//           type: "artist",
//           limit: "50",
//         }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }


// export const getTracksAudioFeatures = async (ids: string[]) => {
//   try {
//     let params = ids.toString()
//     let res = await fetch(
//       "https://api.spotify.com/v1/audio-features?" +
//         new URLSearchParams({ ids: params }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getRelatedArtists = async (id: string) => {
//   try {
//     let res = await fetch(
//       `https://api.spotify.com/v1/artists/${id}/related-artists`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getFeaturedPlaylists = async () => {
//   try {
//     let res = await fetch(
//       `https://api.spotify.com/v1/browse/featured-playlists`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getPlaylist = async (id: string) => {
//   try {
//     let res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getLocalAccessToken()}`,
//       },
//     })

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getArtist = async (id: string) => {
//   try {
//     let res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getLocalAccessToken()}`,
//       },
//     })

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getRecommendedSongs = async (seedArtists: any, soundData: any) => {
//   try {
//     let res = await fetch(
//       `https://api.spotify.com/v1/recommendations?` +
//         new URLSearchParams({
//           limit: "50",
//           seed_artists: seedArtists,
//           target_danceability: soundData.danceability,
//           target_acousticness: soundData.acousticness,
//           target_energy: soundData.energy,
//           target_instrumentalness: soundData.instrumentalness,
//           target_liveness: soundData.liveness,
//           target_loudness: soundData.loudness,
//           target_speechiness: soundData.speechiness,
//           target_valence: soundData.valence,
//         }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const searchArtist = async (name: string) => {
//   try {
//     let res = await fetch(
//       `https://api.spotify.com/v1/search?` +
//         new URLSearchParams({ q: name, type: "artist", limit: "20" }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getUserPlaylists = async (userID: string) => {
//   try {
//     let res = await fetch(
//       `https://api.spotify.com/v1/users/${userID}/playlists?` +
//         new URLSearchParams({ limit: "20" }),
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getWeeklyTrendingSongsGlobally = async () => {
//   try {
//     let res = await fetch(
//       `https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getLocalAccessToken()}`,
//         },
//       }
//     )

//     let data = await res.json()
//     return data
//   } catch (error) {
//     console.log(error)
//   }
// }
