import React from "react";
import { OptionProps, components } from "react-select";

export const SelectMenuOption = (props: OptionProps<any>) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div className="flex items-center">
          {data.thumb && <img src={data.thumb} className="mr-2 w-full h-full max-w-[30px] max-h-[30px]"></img>}
          {data.label}
        </div>
      </components.Option>
    );
  };