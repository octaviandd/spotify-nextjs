import React, { useEffect, useRef, useState } from "react"
import { getSpotifyData } from "../utils"
import { useSession } from "next-auth/react"
import { PopularSongsData, Item } from "./types"
import { RootState } from "../../store"
import { useSelector } from "react-redux"

const selectSearch = (state: RootState) => state.search
const selectAllFilters = (state: RootState) => state.filters

export default function SongsContainer() {
  const { data: session, status } = useSession()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { search } = useSelector(selectSearch)
  const filters = useSelector(selectAllFilters)
  const notInitialRender = useRef(false)
  const notInitialRender2 = useRef(false)

  useEffect(() => {
    setLoading(true)
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: "playlists/37i9dQZEVXbNG2KDcFcKOF",
    }).then((data: PopularSongsData) => {
      setItems(data.tracks.items)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (notInitialRender.current) {
      setLoading(true)
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: { q: search, type: "track" },
        queryLink: "search",
      }).then((data: PopularSongsData) => {
        console.log(data)
        setItems(data.tracks.items)
        setLoading(false)
      })
    } else {
      notInitialRender.current = true
    }
  }, [search])

  useEffect(() => {
    if (notInitialRender2.current) {
      setLoading(true)
      let filtersArrayObject = Object.entries(filters.filters).map((item) => ({
        ["max_" + item[0]]: item[1][0],
        ["min_" + item[0]]: item[1][1],
      }))
      let filtersObject = Object.assign({}, ...filtersArrayObject)
      for (const [key, value] of Object.entries(filters.seeds)) {
        if (value.length < 1) return
        filtersObject[key] = value
      }
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: filtersObject,
        queryLink: "recommendations",
      }).then((data: PopularSongsData) => {
        setItems(data.tracks.items)
        setLoading(false)
      })
    } else {
      notInitialRender2.current = true
    }
  }, [filters])

  if (loading) {
    return <div>Loading..</div>
  }

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
