import React, { forwardRef } from "react"
import { useIsomorphicLayoutEffect } from "./utils"

type Props = {
  title: string
}
export type Ref = HTMLDivElement

export const SongFilter = forwardRef<Ref, Props>((props, ref) => {
  return (
    <div className="mt-2 w-full px-20 flex flex-col">
      <label htmlFor={props.title}>{props.title}</label>
      <input className="input-range-slider" type="range"></input>
    </div>
  )
})
