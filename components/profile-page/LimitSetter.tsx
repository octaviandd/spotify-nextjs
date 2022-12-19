import React from 'react'

type Props = {
  currentLimit: number
  setCurrentLimit: (limit: number) => void
}

export default function LimitSetter({currentLimit, setCurrentLimit}: Props) {
  return (
    <>
      <div className='ml-3'>
        <span onClick={() => setCurrentLimit(10)} className={currentLimit == 10 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer' : 'border px-3 py-2 rounded-md cursor-pointer'}>10</span>
      </div>
      <div className='ml-3'>
        <span onClick={() => setCurrentLimit(25)} className={currentLimit == 25 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer' : 'border px-3 py-2 rounded-md cursor-pointer'}>25</span>
      </div>
      <div className='ml-3'>
        <span onClick={() => setCurrentLimit(50)} className={currentLimit == 50 ? 'bg-black text-white border px-3 py-2 rounded-md cursor-pointer' : 'border px-3 py-2 rounded-md cursor-pointer'}>50</span>
      </div>
    </>
  )
}