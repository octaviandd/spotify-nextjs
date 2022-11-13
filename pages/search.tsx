import { useSession } from "next-auth/react"
import AccessDenied from "../components/AccessDenied"
import Layout from "../components/Layout"
import RangeFilter from "../components/search-page/RangeFilter"
import SeedFilters from "../components/search-page/SeedFilters"
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
          <SeedFilters type="artists"></SeedFilters>
          <SeedFilters type="albums"></SeedFilters>
          <SeedFilters type="tracks"></SeedFilters>
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
