import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import { getSpotifyData } from "../utils"
import { SongResponseObject, DefaultItemTypeResponse } from "./types"
import { useDispatch } from "react-redux"
import { updateMultiSelect } from "../../store/filtersSlice"

export default function SeedFilters({ type }: { type: string }) {
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)
  const [items, setItems] = useState<SongResponseObject[]>([])

  const dispatch = useDispatch()

  const setMultiSelectValues = (newValues: object[]) => {
    console.log(newValues)
    dispatch(updateMultiSelect({ values: [...newValues], type: "seed_" + type.toLocaleLowerCase() + 's' }))
  }

  const handleChange = (input: string) => {
    if(input.length > 0){
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: {q: input, type: type},
        queryLink: "search",
      }).then((data : DefaultItemTypeResponse) => {
        let arr: any = []
        if(type === 'artist'){
          data.artists?.items.map(item => {
            return arr.push({value: item.id, label: item.name, type})
          })
        } else if (type === 'genre'){
          data.albums?.items.map(item => {
            return arr.push({value: item.id, label: item.name, type})
          })
        } else {
          data.tracks?.items.map(item => {
            return arr.push({value: item.id, label: item.name, type})
          })
        }
        setItems(arr)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    if(type === 'genre'){
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: undefined,
        queryLink: "recommendations/available-genre-seeds",
      }).then((data: DefaultItemTypeResponse) => {
        let arr: any = []
        data.genres?.map((item, index) => {
          return arr.push({value: index, label: item, type})
        })
        setItems(arr)
        setLoading(false)
      })
    } else {
      getSpotifyData({
        token: session?.accessToken as string,
        searchParams: {q: 'm', type: type},
        queryLink: "search",
      }).then((data: DefaultItemTypeResponse) => {
        let arr: any = []
        if(type === 'artist'){
          data.artists?.items.map(item => {
            return arr.push({value: item.id, label: item.name, type})
          })
        } else {
          data.tracks?.items.map(item => {
            return arr.push({value: item.id, label: item.name, type})
          })
        }
        setItems(arr)
        setLoading(false)
      })
    }
  }, [])

  if(isLoading){
    return <div>"Loading..."</div>
  }

  return (
    <div className="w-3/4 my-4">
      <Select isMulti options={items} onInputChange={handleChange} onChange={setMultiSelectValues} placeholder={`Search for ${type}s...`}/>
    </div>
  )
}
