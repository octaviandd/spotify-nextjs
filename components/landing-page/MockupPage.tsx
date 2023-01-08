import React, { useRef } from 'react';
import { SongCard } from './SongCard';
import TextPlugin from 'gsap/dist/TextPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect, useArrayRef } from '../utils';
import Select from 'react-select';
import { SelectMenuList } from '../global/SelectMenuList';
import { SelectMultiValueLabel } from '../global/SelectMultiValueLabel';
import { SelectMenuOption } from '../global/SelectMenuOption';
import { Range } from 'react-range';

export default function MockupPage() {
  const inputBarRef = useRef<HTMLDivElement>(null);
  const displayPage = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip);
  const tl: any = useRef();
  const [refs, setRefs] = useArrayRef();

  useIsomorphicLayoutEffect(() => {
    gsap.to(displayPage.current, {
      opacity: 1,
      stagger: 1,
      scrollTrigger: {
        trigger: document.querySelector('#pin'),
        pin: true,
        start: 'top top',
        end: '+=2000',
        scrub: true,
        pinSpacing: false,
      },
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (inputBarRef.current) {
      let ctx = gsap.context(() => {
        tl.current = gsap
          .timeline()
          .to('.search-bar', {
            translateY: -220,
            translateX: -150,
            scale: 0.5,
            duration: 1,
            scrollTrigger: {
              trigger: document.querySelector('#starter'),
              start: 'top top',
              end: '+=375',
              scrub: true,
            },
          })
          .fromTo(
            '.search-bar-input',
            {
              text: 'Search for songs',
              duration: 0,
            },
            {
              text: 'Ballads from Metallica',
              duration: 2,
              scrollTrigger: {
                trigger: document.querySelector('.start-now'),
                start: 'top top',
                end: '+=175',
                markers: true,
                scrub: true,
              },
            }
          );
      }, inputBarRef);
      return () => ctx.revert();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      refs.current,
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.start-now'),
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      document.querySelector('.fake-select'),
      { opacity: 0, duration: 0 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('.include-others'),
          start: 'bottom bottom',
          end: '+=300',
          scrub: true,
        },
      }
    );
  });

  useIsomorphicLayoutEffect(() => {
    if (refs.current) {
      let state = Flip.getState(refs.current[3]);
      Flip.from(state, {
        ease: 'power1.inOut',
        scaleX: 1.5,
        simple: true,
        scrollTrigger: {
          trigger: document.querySelector('#song-deconstruction'),
          start: 'top top',
          end: '+=500',
          scrub: true,
        },
      });
    }
  }, [refs.current]);

  return (
    <div className="pt-20 right-0" ref={displayPage} id="pin">
      <div className="relative w-full h-full">
        <div className="bg-[#273138] opacity-[0.9] max-w-[550px] mt-[10px] mx-auto p-[10px] rounded-t-lg flex gap-1.5 blur-sm">
          <div className="bg-[red] inline-block w-[10px] h-[10px] rounded-full "></div>
          <div className="bg-[yellow] inline-block w-[10px] h-[10px] rounded-full "></div>
          <div className="bg-[green] inline-block w-[10px] h-[10px] rounded-full "></div>
        </div>
        <div className="h-[600px] blur-sm bg-[rgba(0,0,0,.2)] max-w-[550px] mx-auto opacity-[0.3]"></div>
        <div
          className="absolute h-[600px] max-w-[550px] mx-auto left-0 right-0 top-0 grid grid-cols-mockup grid-rows-mockup"
          ref={inputBarRef}
        >
          <div
            style={SearchBarStyle}
            className="flex items-center py-3 px-4 bg-[#ffffff] w-[400px] rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 search-bar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="black"
              />
            </svg>
            <span className="pl-4 text-[0.875rem] text-[#9ca3af] search-bar-input"></span>
          </div>
        </div>
        <div className="pointer-events-none max-w-[300px] absolute top-[120px] left-[170px] fake-select">
          <div className="w-full my-1">
            <p className="text-white">Tracks</p>
            <Select
              isMulti={true}
              defaultValue={[{ value: '1', label: 'Sting' }]}
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
          <div className="w-full my-1">
            <p className="text-white">Artists</p>
            <Select
              isMulti={true}
              defaultValue={[{ value: '1', label: 'Sting' }]}
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
          <div className="w-full my-1">
            <p className="text-white">Genres</p>
            <Select
              isMulti={true}
              defaultValue={[{ value: '1', label: 'Sting' }]}
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
        </div>
        <div>
          <div className="pointer-events-none w-[150px] absolute top-[400px] left-[170px]">
            <Range
              step={1}
              min={1}
              max={10}
              values={[1,10]}
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
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-auto max-w-[300px] row-start-2 w-full gap-x-6 gap-2 px-10 absolute top-[70px] right-[200px] mx-auto">
          {Array(20)
            .fill()
            .map((i, idx) => (
              <SongCard
                ref={setRefs}
                key={idx}
                item={{
                  link: '/imag1.jpg',
                  title: 'Fade into Black',
                  artist: 'Metallica',
                }}
              ></SongCard>
            ))}
          <SongCard
            ref={setRefs}
            item={{
              link: '/imag1.jpg',
              title: 'Fade into Black',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/imag2.jpg',
              title: 'Fade into Black - Live',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/imag3.jpg',
              title: 'One - Live',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
          <SongCard
            ref={setRefs}
            item={{
              link: '/image4.jpg',
              title: 'One',
              artist: 'Metallica',
            }}
          ></SongCard>
        </div>
      </div>
    </div>
  );
}

const SearchBarStyle = {
  boxShadow: '0 10px 15px -3px rgba(0,0,0,.1) 0 4px 6px -4px rgba(0,0,0,.1)',
};
