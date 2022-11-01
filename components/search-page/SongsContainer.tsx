import React, { useEffect, useState } from "react"
import { getSpotifyData } from "../utils"
import { useSession } from "next-auth/react"
import { PopularSongsData, Item } from "./types"

type Props = {}

export default function SongsContainer({}: Props) {
  const { data: session, status } = useSession()
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: null,
      queryLink: "playlists/37i9dQZEVXbNG2KDcFcKOF",
    }).then((data: PopularSongsData) => {
      setItems(data.tracks.items)
    })
  }, [])

  return (
    <div className="grid grid-cols-item grid-rows-item gap-y-5 gap-x-3 px-4">
      {items.length > 0 &&
        items.map((item) => (
          <div key={item.track.id}>
            <img src={item.track.album.images[1].url}></img>
            <div className="flex flex-col flex-start pt-2">
              <span>{item.track.name}</span>
              <span>{item.track.artists[0].name}</span>
            </div>
          </div>
        ))}
    </div>
  )
}
