import Layout from "../components/layout"
import { useEffect } from "react"
import LandingSectionThree from "../components/LandingSectionThree"
import MockupPage from "../components/mockup-page"
import LandingSectionOne from "../components/LandingSectionOne"
import LandingSectionTwo from "../components/LandingSectionTwo"
import LandingSectionFour from "../components/LandingSectionFour"

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-hero grid-rows-hero relative" id="starter">
        <MockupPage></MockupPage>
        <LandingSectionOne></LandingSectionOne>
        <LandingSectionFour></LandingSectionFour>
      </div>
      <div className="grid grid-cols-hero2 grid-rows-hero2 relative"></div>
    </Layout>
  )
}
