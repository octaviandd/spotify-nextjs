import React from "react";
import { MultiValueGenericProps, components } from "react-select";

export const SelectMultiValueLabel = (props: MultiValueGenericProps<any, true, any>) => {
    const { data } = props;
    return (
      <components.MultiValueLabel {...props}>
        <div className="flex items-center">
          {data.thumb && (
            <img src={data.thumb} width="30" height="30" className="mr-2 w-full h-full max-w-[30px] max-h-[30px]"></img>
          )}
          {data.label}
        </div>
      </components.MultiValueLabel>
    );
  };