import React, { forwardRef } from "react"
import { useIsomorphicLayoutEffect } from "./utils"

type Props = {
  title: string
}
export type Ref = HTMLDivElement

export const SongFilter = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div className="mt-2 w-full px-20">
      <label htmlFor={props.title}>{props.title}</label>
      <div className="relative mt-5">
        <span className="w-full h-[4px] rounded bg-[#b3b3b3] block"></span>
        <span
          ref={ref}
          className={`absolute h-[20px] w-[20px] -top-[7.5px] bottom-0 block bg-[#f0f0f0] border-2 border-[#b3b3b3] rounded-full`}
        ></span>
      </div>
    </div>
  )
})
