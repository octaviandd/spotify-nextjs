import React from 'react';

type Props = {
  currentLimit: number;
  setCurrentLimit: (limit: number) => void;
};

export default function LimitSetter({ currentLimit, setCurrentLimit }: Props) {
  return (
    <>
      <div className="ml-3">
        <span
          onClick={() => setCurrentLimit(10)}
          className={
            currentLimit == 10
              ? ' text-black px-3 bg-[#f6f4f4] py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-500'
              : ' text-white px-3 py-2 hover:bg-[#cdcbcb18] rounded-md cursor-pointer'
          }
        >
          10
        </span>
      </div>
      <div className="ml-3">
        <span
          onClick={() => setCurrentLimit(25)}
          className={
            currentLimit == 25
              ? ' text-black px-3  bg-[#f6f4f4] py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-500'
              : 'text-white px-3 hover:bg-[#cdcbcb18] py-2 rounded-xl cursor-pointer'
          }
        >
          25
        </span>
      </div>
      <div className="ml-3">
        <span
          onClick={() => setCurrentLimit(50)}
          className={
            currentLimit == 50
              ? ' text-black bg-[#f6f4f4] px-3 py-2 rounded-lg cursor-pointer transition-all ease-in-out duration-500'
              : 'text-white px-3 py-2 hover:bg-[#cdcbcb18] rounded-xl cursor-pointer'
          }
        >
          50
        </span>
      </div>
    </>
  );
}
