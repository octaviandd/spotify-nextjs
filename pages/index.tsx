import Layout from "../components/layout"
import { useEffect } from "react"
import SongsFilter from "../components/songs-filters"
import MockupPage from "../components/mockup-page"
import LandingSectionOne from "../components/LandingSectionOne"
import LandingSectionTwo from "../components/LandingSectionTwo"

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-hero grid-rows-hero relative" id="starter">
        <MockupPage></MockupPage>
        <LandingSectionOne></LandingSectionOne>
        <LandingSectionTwo></LandingSectionTwo>
        <SongsFilter></SongsFilter>
        <div className="row-start-3 row-end-4 col-start-1">
          <div className="pt-20 pl-20 move">move it here</div>
        </div>
      </div>
    </Layout>
  )
}
