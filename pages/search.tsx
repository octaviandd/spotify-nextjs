import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import AccessDenied from "../components/access-denied"
import Layout from "../components/layout"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

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
      <div className="grid grid-cols-search grid-rows-search">
        <div className="flex flex-col items-center">
          <div>
            <label>Search artists</label>
            <input></input>
          </div>
          <div>
            <label>Search albums</label>
            <input></input>
          </div>
          <div>
            <label>Search tracks</label>
            <input></input>
          </div>
          <div>
            <label>Search genres</label>
            <input></input>
          </div>
          <div>
            <label>Search tag</label>
            <input></input>
          </div>
          <div>
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
          </div>
          <div>
            <label>Acoustincness</label>
            <input></input>
          </div>
          <div>
            <label>Danceability</label>
            <input></input>
          </div>
          <div>
            <label>Duration</label>
            <input></input>
          </div>
          <div>
            <label>Energy</label>
            <input></input>
          </div>
          <div>
            <label>Instrumentalness</label>
            <input></input>
          </div>
          <div>
            <label>Key</label>
            <input></input>
          </div>
          <div>
            <label>Loudness</label>
            <input></input>
          </div>
          <div>
            <label>Mode</label>
            <input></input>
          </div>
          <div>
            <label>Speechiness</label>
            <input></input>
          </div>
          <div>
            <label>Tempo</label>
            <input></input>
          </div>
          <div>
            <label>Valence</label>
            <input></input>
          </div>
        </div>
        <div>Songs</div>
      </div>
    </Layout>
  )
}
