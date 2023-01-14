import React from 'react';
import Select from 'react-select';
import { SelectMenuList } from '../global/SelectMenuList';
import { SelectMultiValueLabel } from '../global/SelectMultiValueLabel';
import { SelectMenuOption } from '../global/SelectMenuOption';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '../utils';

export const MockSelect = () => {
  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      document.querySelector('.fake-select'),
      { opacity: 0, duration: 0, scale: 0.7 },
      {
        opacity: 1,
        stagger: 1,
        scrollTrigger: {
          trigger: document.querySelector('#test-outro'),
          start: 'top centre',
          end: '+=300',
          scrub: true,
        },
      }
    );
  });
  return (
    <div className="pointer-events-none w-[290px] absolute top-[120px] left-[120px] fake-select">
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
          <div className="w-full my-1" key={idx}>
            <Select
              isMulti={true}
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
  );
};
