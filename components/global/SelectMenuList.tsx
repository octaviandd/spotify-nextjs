import React from "react";
import { MenuListProps, components } from "react-select";

export const SelectMenuList = (props: MenuListProps<any, true, any>) => {
  return (
    <components.MenuList {...props} innerProps={{ ...props.innerProps }}>
      {props.children}
    </components.MenuList>
  );
};