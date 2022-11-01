import React, { useRef } from "react"
import { SongCard } from "./SongCard"
import TextPlugin from "gsap/dist/TextPlugin"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import Flip from "gsap/dist/Flip"
import gsap from "gsap"
import { useIsomorphicLayoutEffect, useArrayRef } from "../utils"

export default function MockupPage() {
  const inputBarRef = useRef<HTMLDivElement>(null)
  const displayPage = useRef<HTMLDivElement>(null)
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip)
  const tl: any = useRef()
  const [refs, setRefs] = useArrayRef()

  useIsomorphicLayoutEffect(() => {
    gsap.to(displayPage.current, {
      opacity: 1,
      stagger: 1,
      scrollTrigger: {
        trigger: document.querySelector("#pin"),
        pin: true,
        start: "top top",
        end: "+=1000",
        scrub: true,
        pinSpacing: false,
      },
    })
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (inputBarRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap
          .timeline()
          .fromTo(
            ".search-bar",
            { opacity: 0, scaleX: 0, scaleY: 0 },
            {
              opacity: 1,
              duration: 0.5,
              scaleX: 1,
              scaleY: 1,
              transformOrigin: "center",
            }
          )
          .to(".search-bar", {
            y: -220,
            duration: 1,
            scrollTrigger: {
              trigger: document.querySelector("#starter"),
              start: "top top",
              end: "+=375",
              scrub: true,
            },
          })
          .fromTo(
            ".search-bar-input",
            {
              text: "Search for songs",
              duration: 0,
            },
            {
              text: "Ballads from Metallica",
              duration: 2,
              scrollTrigger: {
                trigger: document.querySelector(".start-now"),
                start: "top top",
                end: "+=175",
                scrub: true,
              },
            }
          )
      }, inputBarRef)
      return () => ctx.revert()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      refs.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector(".start-now"),
          start: "top top",
          end: "+=175",
          scrub: true,
        },
      }
    )
  })

  useIsomorphicLayoutEffect(() => {
    if (refs.current) {
      let state = Flip.getState(refs.current[3])
      Flip.from(state, {
        ease: "power1.inOut",
        scaleX: 1.5,
        simple: true,
        scrollTrigger: {
          trigger: document.querySelector("#song-deconstruction"),
          start: "top top",
          end: "+=500",
          markers: true,
          scrub: true,
        },
      })
    }
  }, [refs.current])

  return (
    <div className="pt-20 right-0" ref={displayPage} id="pin">
      <div className="relative w-full h-full">
        <div className="bg-[#273138] opacity-[0.9] max-w-[550px] mt-[10px] mx-auto p-[10px] rounded-t-lg flex gap-1.5 blur-sm">
          <div className="bg-[#4a5c66] inline-block w-[10px] h-[10px] rounded-full "></div>
          <div className="bg-[#4a5c66] inline-block w-[10px] h-[10px] rounded-full "></div>
          <div className="bg-[#4a5c66] inline-block w-[10px] h-[10px] rounded-full "></div>
        </div>
        <div className="h-[600px] blur-sm bg-[rgba(0,0,0,.2)] max-w-[550px] mx-auto opacity-[0.3]"></div>
        <div
          className="absolute h-[600px] max-w-[550px] mx-auto left-0 right-0 top-0 grid grid-cols-mockup grid-rows-mockup"
          ref={inputBarRef}
        >
          <div
            style={SearchBarStyle}
            className="flex items-center py-3 px-4 bg-[#ffffff] w-[400px] rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 search-bar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="black"
              />
            </svg>
            <span className="pl-4 text-[0.875rem] text-[#9ca3af] search-bar-input"></span>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-5 max-w-[550px] w-full row-start-2 w-full songs-grid gap-2 px-10 absolute top-[200px] left-0 right-0 mx-auto">
          <SongCard
            ref={setRefs}
            item={{
              link: "/imag1.jpg",
              title: "Fade into Black",
              artist: "Metallica",
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: "/imag2.jpg",
              title: "Fade into Black - Live",
              artist: "Metallica",
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: "/imag3.jpg",
              title: "One - Live",
              artist: "Metallica",
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: "/image4.jpg",
              title: "One",
              artist: "Metallica",
              id: "test",
            }}
          ></SongCard>
        </div>
      </div>
    </div>
  )
}

const SearchBarStyle = {
  boxShadow: "0 10px 15px -3px rgba(0,0,0,.1) 0 4px 6px -4px rgba(0,0,0,.1)",
}
