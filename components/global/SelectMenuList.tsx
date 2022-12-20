import React, { UIEventHandler } from 'react';
import { MenuListProps, components } from 'react-select';

export const SelectMenuList = (
  props: MenuListProps<any, true, any> & { infiniteScroll: boolean; handleScroll: UIEventHandler<HTMLDivElement> }
) => {
  return (
    <components.MenuList
      {...props}
      innerProps={{ ...props.innerProps, onScroll: props.infiniteScroll ? props.handleScroll : undefined }}
    >
      {props.children}
    </components.MenuList>
  );
};
