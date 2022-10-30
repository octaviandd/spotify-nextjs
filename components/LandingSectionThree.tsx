import React, { useRef } from "react"
import { SongFilter } from "./song-filter"
import { useIsomorphicLayoutEffect, useArrayRef } from "./utils"
import { gsap } from "gsap"

export default function LandingSectionThree() {
  const secondTl: any = useRef()
  const [refs, setRefs] = useArrayRef()

  useIsomorphicLayoutEffect(() => {
    if (refs.current) {
      let ctx = gsap.context(() => {
        secondTl.current = gsap.timeline().fromTo(
          refs.current,
          {
            left: 0,
          },
          {
            left: "random(0, 400)",
            duration: 2,
            scrollTrigger: {
              trigger: document.querySelector("#trigger"),
              start: "top top",
              end: "+=400",
              scrub: true,
            },
          }
        )
      }, refs.current)
      return () => ctx.revert()
    }
  })

  return (
    <div>
      <h1 className="text-[40px] leading-none mt-5 lg:pl-20">
        The search algorithm takes precedence over the user's capability of
        filtering.
      </h1>
      <h1 className="text-[40px] leading-none mt-5 lg:pl-20">
        Here are some ways you can filter your music in more depth
      </h1>
      <div className="mt-16">
        <SongFilter title="Acousticness" ref={setRefs}></SongFilter>
        <SongFilter title="Danceability" ref={setRefs}></SongFilter>
        <SongFilter title="Liveness" ref={setRefs}></SongFilter>
        <SongFilter title="Speechiness" ref={setRefs}></SongFilter>
        <SongFilter title="Tempo" ref={setRefs}></SongFilter>
      </div>
    </div>
  )
}
