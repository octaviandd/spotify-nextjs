import React, { useRef } from 'react';
import { useArrayRef, useIsomorphicLayoutEffect } from '../utils';
import { gsap } from 'gsap';
import Image from 'next/image';
import Select from 'react-select';
import { SelectMenuList } from '../global/SelectMenuList';
import { SelectMultiValueLabel } from '../global/SelectMultiValueLabel';
import { SelectMenuOption } from '../global/SelectMenuOption';
import { SongCard } from './SongCard';

export default function LandingSectionThree() {
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const songsRef = useRef<HTMLDivElement>(null);
  const tl: any = useRef();
  const [refs, setRefs] = useArrayRef();
  let timeline: any = useRef();

  useIsomorphicLayoutEffect(() => {
    timeline.current = gsap.timeline();
    timeline.current.fromTo(
      refs.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: songsRef.current,
          start: 'top bottom-=300',
          end: '+=500',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    if (iconRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline().fromTo(
          iconRef.current,
          {
            scale: 0,
            duration: 0,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: iconRef.current,
              start: 'top bottom',
              end: '+=200',
              scrub: true,
            },
            stagger: 0.25,
            duration: 0.5,
            scale: 1,
            opacity: 1,
            transformOrigin: 'center',
          }
        );
      }, iconRef);
      return () => ctx.revert();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (lineRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap.timeline().fromTo(
          lineRef.current,
          {
            scale: 0,
            duration: 0,
          },
          {
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
            stagger: 0.25,
            duration: 0.5,
            scale: 1,
            transformOrigin: 'top',
          }
        );
      }, lineRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="flex mr-4 relative lg:pl-20 include-others">
      <div className="flex flex-col mx-auto my-3 h-[1400px]">
        <div className="relative inline-block z-10 mt-3 w-[24px] h-[24px]" ref={iconRef}>
          <Image src="/connector.svg" width={24} height={24} className="rotate-90" />
          <span className="absolute left-0 top-0 h-full w-full z-20 bg-white blur-lg"></span>
        </div>
        <div
          ref={lineRef}
          style={{ background: 'linear-gradient(#000000, #2ea043, #2ea043, #000000' }}
          className="h-full w-[3px] rounded-md mx-auto"
        ></div>
      </div>
      <div className="flex flex-col w-full mb-6 py-4 rounded-md ml-10">
        <span className="text-white text-2xl lg:text-6xl mb-10" id="test-outro">
          Expand your search: Discover more music.
        </span>
        <span className="text-white text-xl lg:text-3xl text-left">
          Our search algorithm utilizes a combination of the provided seed entity and related artists and tracks to
          generate personalized recommendations. By leveraging the vast wealth of information available through the
          Spotify API, we are able to deliver a tailored selection of tracks, complete with detailed information on the
          size of the matching pool.
        </span>
        <div className="pointer-events-none w-[290px] mt-10 fake-select shadow-md bg-gray-900 p-2 rounded-lg lg:hidden">
          <div className="w-full my-1">
            {[
              { value: '1', label: 'Sting' },
              { value: '1', label: 'Do I Want to Know' },
              [
                { value: '1', label: 'funk' },
                { value: '1', label: 'rock' },
                { value: '1', label: 'jazz' },
              ],
            ].map((i, idx) => (
              <div className={`${idx === 2 ? 'mt-40' : 'mt-1'}`} key={idx}>
                <Select
                  defaultMenuIsOpen={idx === 1 ? true : false}
                  isMulti={true}
                  options={[
                    {
                      value: 1,
                      label: 'I Wanna Be Yours',
                    },
                    { value: 2, label: 'Do I Wanna Know' },
                    { value: 3, label: 'R U Mine?' },
                  ]}
                  defaultValue={Array.isArray(i) ? i : [i]}
                  placeholder=""
                  styles={{
                    multiValueRemove: (base) => ({
                      ...base,
                      ':hover': {
                        backgroundColor: 'inherit',
                      },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: 'white',
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: '#16181c',
                      border: 'none',
                      paddingTop: '1px',
                      paddingBottom: '1px',
                    }),
                    container: (base) => ({
                      ...base,
                      borderRadius: '15px',
                      ':focus': {
                        backgroundColor: '#1e293b',
                      },
                    }),
                  }}
                  components={{
                    MenuList: SelectMenuList,
                    MultiValueLabel: SelectMultiValueLabel,
                    Option: SelectMenuOption,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-auto gap-y-4 mt-10 lg:hidden" ref={songsRef}>
          {Array(24)
            .fill(null)
            .map((i, idx) => (
              <SongCard
                ref={setRefs}
                key={idx}
                item={{
                  link: `/${gsap.utils.random(1, 23, 1)}.jpg`,
                }}
              ></SongCard>
            ))}
        </div>
      </div>
    </div>
  );
}
