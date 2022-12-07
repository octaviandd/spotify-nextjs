import React from 'react';
import { Range } from 'react-range';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateRangeSliders } from '../../store/filtersSlice';

const selectProperty = (state: RootState) => state.filters;

export default function RangeFilter({ type, max, min }: { type: string; max: number; min: number }) {
  const filters = useSelector(selectProperty).filters;
  const dispatch = useDispatch();

  const setRange = (val: number[]) => {
    dispatch(updateRangeSliders({ values: [...val], type: type.toLocaleLowerCase() }));
  };

  return (
    <div className="relative w-3/4">
      <label>{type}</label>
      <Range
        step={max > 1 ? 1 : 0.1}
        min={min}
        max={max}
        allowOverlap={false}
        values={filters[type.toLocaleLowerCase()]}
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
                  position: 'absolute',
                  top: '-38px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#548BF4',
                }}
              >
                {filters[type.toLocaleLowerCase()][index].toFixed(1)}
              </div>
            )}
          </div>
        )}
      ></Range>
    </div>
  );
}
