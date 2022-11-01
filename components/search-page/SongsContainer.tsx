import React, { useEffect, useState } from "react"
import { getSpotifyData } from "../utils"
import { useSession } from "next-auth/react"

type Props = {}

export default function SongsContainer({}: Props) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [items, setItems] = useState()

  useEffect(() => {
    getSpotifyData({
      token: session?.accessToken,
      searchParams: null,
      queryLink: "playlists/37i9dQZEVXbNG2KDcFcKOF",
    }).then((res) => {
      console.log(res)
      setItems(res.tracks.items)
    })
  }, [])

  return (
    <div className="grid grid-cols-5 grid-rows-auto">
      {items &&
        items.map((item) => <img src={item.track.album.images[2].url}></img>)}
    </div>
  )
}
