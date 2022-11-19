import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import { getSpotifyData } from "../utils"
import { Item, PopularSongsData } from "./types"
import AsyncSelect from 'react-select/async';

export default function SeedFilters({ type }: { type: string }) {
  const { data: session, status } = useSession()
  const [isLoading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  const test = (input: string) => {
    if(input.length > 0){
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: {q: input, type: 'artist'},
        queryLink: "search",
      }).then((data: PopularSongsData) => {
        let arr: any = []
        data.artists.items.map(item => {
          return arr.push({value: item.id, label: item.name})
        })
        setItems(arr)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: {q: 'metallica', type: 'artist'},
      queryLink: "search",
    }).then((data: PopularSongsData) => {
      let arr: any = []
      data.artists.items.map(item => {
        return arr.push({value: item.id, label: item.name})
      })
      setItems(arr)
      setLoading(false)
    })
  }, [])

  return (
    <div className="w-3/4 my-4">
      <Select isMulti options={items} onInputChange={test}/>
    </div>
  )
}
