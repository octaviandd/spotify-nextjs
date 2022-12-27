import React from 'react';
import Select from 'react-select';
import { SelectMenuList } from './SelectMenuList';
import { SelectMenuOption } from './SelectMenuOption';
import { SelectMultiValueLabel } from './SelectMultiValueLabel';

type Props = {
  options: object[];
  setValues: Function;
  defaultValues: any | undefined;
  placeholder: string;
};

export const ReactSelect = ({ options, setValues, defaultValues, placeholder }: Props) => {
  return (
    <Select
      options={options}
      onChange={(e) => setValues(e.value)}
      defaultValue={defaultValues && { id: 0, label: 'One month', value: 'short_term' }}
      placeholder={placeholder}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: 'black',
        },
      })}
      styles={{
        option: (base) => ({
          ...base,
        }),
        container: (base) => ({
          ...base,
          border: '1px solid black',
          borderRadius: '50px',
          marginLeft: '10px',
          zIndex: '50',
          width: '200px',
          fontSize: '12px',
        }),
      }}
      components={{
        MenuList: SelectMenuList,
        MultiValueLabel: SelectMultiValueLabel,
        Option: SelectMenuOption,
      }}
    />
  );
};
