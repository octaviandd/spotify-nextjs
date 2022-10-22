import React, { useRef } from "react"
import { SongFilter } from "./SongFilter"
import { useIsomorphicLayoutEffect, useArrayRef } from "../utils"
import Image from "next/image"
import { gsap } from "gsap"

export default function SongsFilter() {
  const underlineRef = useRef<HTMLElement>(null)
  const tl: GSAPTimeline = useRef()
  const secondTl: GSAPTimeline = useRef()
  const [refs, setRefs] = useArrayRef()

  useIsomorphicLayoutEffect(() => {
    if (underlineRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap
          .timeline({ repeat: -1 })
          .fromTo(
            underlineRef.current,
            { width: "0%", left: "0%" },
            { width: "100%", duration: 1.5, yoyo: true }
          )
          .add("midway")
          .fromTo(
            underlineRef.current,
            { width: "100%", left: "0%" },
            { width: "0%", left: "100%", duration: 1.5 }
          )
      }, underlineRef)
      return () => ctx.revert()
    }
  })

  useIsomorphicLayoutEffect(() => {
    if (refs.current) {
      let ctx = gsap.context(() => {
        secondTl = gsap.timeline().fromTo(
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
    <div className="row-start-2 row-end-3 col-start-1 flex flex-wrap mr-4 items-center justify-center songs-filter relative lg:pl-20">
      <div className="flex flex-col pr-10">
        <h1 className="text-[40px] leading-none mb-8">
          Spotify offers a general method of filtering using{" "}
          <span className="relative">
            lexical search
            <span
              ref={underlineRef}
              className="block absolute bottom-0 left-0 h-[4px] bg-green-600"
            ></span>
          </span>
          .
        </h1>
        <div className="w-full h-[300px] self-center mt-10 mb-10">
          <Image
            src="/image5.png"
            width={680}
            height={300}
            id="trigger"
          ></Image>
        </div>
      </div>
      <div className="row-start-3 row-end-4 col-start-1">
        <h1 className="text-[40px] leading-none mt-5">
          The search algorithm takes precedence over the user's capability of
          filtering.
        </h1>
        <h1 className="text-[40px] leading-none mt-5">
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
    </div>
  )
}
