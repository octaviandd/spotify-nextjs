import { useRef, useLayoutEffect, useEffect } from "react"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export const useArrayRef = () => {
  const refs: any = useRef([])
  refs.current = []
  return [refs, (ref: HTMLElement) => ref && refs.current.push(ref)]
}
