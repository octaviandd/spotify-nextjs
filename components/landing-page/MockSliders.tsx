import React from 'react';
import { Range } from 'react-range';
import { useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';

type Props = {};

export default function MockSliders({}: Props) {
  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      document.querySelector('.fake-slider'),
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.composition'),
          start: 'top center',
          end: '+=300',
          scrub: true,
        },
      }
    );
  });
  return (
    <div className="pointer-events-none w-[190px] flex flex-col absolute top-[250px] left-[170px] fake-slider">
      <Range
        step={1}
        min={1}
        max={10}
        values={[1, 10]}
        allowOverlap={false}
        renderTrack={({ props, children }) => (
          <div {...props} className="range-slider my-5 rounded-lg">
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
                1
              </div>
            )}
          </div>
        )}
      ></Range>
      <Range
        step={1}
        min={1}
        max={10}
        values={[1, 10]}
        allowOverlap={false}
        renderTrack={({ props, children }) => (
          <div {...props} className="range-slider my-5 rounded-lg">
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
                1
              </div>
            )}
          </div>
        )}
      ></Range>
      <Range
        step={1}
        min={1}
        max={10}
        values={[1, 10]}
        allowOverlap={false}
        renderTrack={({ props, children }) => (
          <div {...props} className="range-slider my-5 rounded-lg">
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
                1
              </div>
            )}
          </div>
        )}
      ></Range>
      <Range
        step={1}
        min={1}
        max={10}
        values={[1, 10]}
        allowOverlap={false}
        renderTrack={({ props, children }) => (
          <div {...props} className="range-slider my-5 rounded-lg">
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
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
                1
              </div>
            )}
          </div>
        )}
      ></Range>
    </div>
  );
}
