import React, { forwardRef } from "react"
import Image from "next/image"

interface Props {
  item: {
    link: string
    title: string
    artist: string
    id?: string
  }
}

export type Ref = HTMLDivElement

export const SongCard = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div
      className="flex items-center shadow-md w-full bg-white"
      ref={ref}
      id={props.item.id ? props.item.id : undefined}
    >
      <div className="px-3 font-md"></div>
      <div>
        <Image src={props.item.link} width="48" height="48"></Image>
      </div>
      <div className="flex flex-col py-1 px-3">
        <span className="text-[#4a4a4a] font-semibold text-sm">
          {props.item.title}
        </span>
        <span className="text-slate-400 text-sm">{props.item.artist}</span>
      </div>
    </div>
  )
})
