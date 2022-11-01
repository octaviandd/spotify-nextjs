import React, { useState } from "react"
import { Range } from "react-range"

type Props = {
  type: String
}

export default function RangeFilter({ type }: Props) {
  const [rangeState, setRangeState] = useState<number[]>([0, 100])

  const setRange = (val: number[]) => {
    setRangeState([...val])
  }
  return (
    <div className="relative w-3/4">
      <label className="">{type}</label>
      <Range
        step={1}
        min={0}
        max={100}
        allowOverlap={false}
        values={rangeState}
        onChange={(values) => setRange(values)}
        renderTrack={({ props, children }) => (
          <div {...props} className="range-slider my-5">
            {children}
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div {...props} className="range-slider-thumb-filter">
            {isDragged && (
              <div
                style={{
                  position: "absolute",
                  top: "-38px",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "4px",
                  borderRadius: "4px",
                  backgroundColor: "#548BF4",
                }}
              >
                {rangeState[index].toFixed(1)}
              </div>
            )}
          </div>
        )}
      ></Range>
    </div>
  )
}
