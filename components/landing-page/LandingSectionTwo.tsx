import React, { useRef } from "react"
import { useIsomorphicLayoutEffect } from "../utils"
import Image from "next/image"
import { gsap } from "gsap"

type Props = {}

export default function LandingSectionTwo({}: Props) {
  const underlineRef = useRef<HTMLElement>(null)
  const tl: any = useRef()

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
  return (
    <div className="flex flex-wrap mr-4 items-center justify-center songs-filter relative lg:pl-20">
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
      </div>
      <div className="w-full h-[300px] self-center mt-10 mb-10">
        <Image src="/image5.png" width={680} height={300} id="trigger"></Image>
      </div>
    </div>
  )
}
