import React from "react";
import { MenuListProps, components } from "react-select";

export const SelectMenuList = (props: MenuListProps<any, true, any>) => {
  return (
    <components.MenuList {...props} innerProps={{ ...props.innerProps, onScroll: props.infiniteScroll ? props.handleScroll : null }}>
      {props.children}
    </components.MenuList>
  );
};