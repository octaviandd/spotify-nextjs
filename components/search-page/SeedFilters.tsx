import React, { useEffect, useState } from "react"
import Select from "react-select"

export default function SeedFilters({ type }: { type: string }) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]
  return (
    <div className="w-3/4 my-4">
      <Select options={options} />
    </div>
  )
}
