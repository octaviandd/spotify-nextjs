import React, { useEffect, useState } from "react"
import { getSpotifyData } from "../utils"
import { useSession } from "next-auth/react"
import { PopularSongsData, Item } from "./types"

type Props = {}

export default function SongsContainer({}: Props) {
  const { data: session, status } = useSession()

  const loading = status === "loading"
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: null,
      queryLink: "playlists/37i9dQZEVXbNG2KDcFcKOF",
    }).then((data: PopularSongsData) => {
      console.log(data.tracks.items)
      setItems(data.tracks.items)
    })
  }, [])

  return (
    <div className="grid grid-cols-5 grid-rows-auto">
      {items.length > 0 &&
        items.map((item) => (
          <img key={item.track.id} src={item.track.album.images[2].url}></img>
        ))}
    </div>
  )
}
