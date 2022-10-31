import { GetServerSideProps } from "next"
import type { Session } from "next-auth"
import { useSession, getSession } from "next-auth/react"
import { useEffect } from "react"
import LandingSectionFour from "../components/LandingSectionFour"
import LandingSectionOne from "../components/LandingSectionOne"
import Layout from "../components/layout"
import MockupPage from "../components/mockup-page"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/search"
    }
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

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
