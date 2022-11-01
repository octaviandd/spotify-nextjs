import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import Layout from "../components/layout"
import RangeFilter from "../components/search-page/RangeFilter"
import SearchInput from "../components/search-page/SearchInput"
import SongsContainer from "../components/search-page/SongsContainer"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (typeof window !== "undefined" && loading) return null

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-search grid-rows-search pt-10">
        <div className="flex flex-col items-center">
          <SearchInput></SearchInput>
          {/* <div>
            <label>Seed artists</label>
            <input></input>
          </div>
          <div>
            <label>Seed genres</label>
            <input></input>
          </div>
          <div>
            <label>Seed tracks</label>
            <input></input>
          </div> */}
          <RangeFilter type="Acousticness"></RangeFilter>
          <RangeFilter type="Danceability"></RangeFilter>
          <RangeFilter type="Duration"></RangeFilter>
          <RangeFilter type="Energy"></RangeFilter>
          <RangeFilter type="Instrumentalness"></RangeFilter>
          <RangeFilter type="Key"></RangeFilter>
          <RangeFilter type="Liveness"></RangeFilter>
          <RangeFilter type="Loudness"></RangeFilter>
          <RangeFilter type="Mode"></RangeFilter>
          <RangeFilter type="Popularity"></RangeFilter>
          <RangeFilter type="Speechiness"></RangeFilter>
          <RangeFilter type="Tempo"></RangeFilter>
          <RangeFilter type="Valence"></RangeFilter>
        </div>
        <SongsContainer></SongsContainer>
      </div>
    </Layout>
  )
}