import React, { useEffect, useState } from 'react';
import FadeInOut from '../components/FadeInOut';
import Layout from '../components/Layout';
import { getSpotifyData } from '../components/utils';
import { useSession } from 'next-auth/react';
import Select, { components, MenuListProps, OptionProps, MultiValueGenericProps } from 'react-select';

export default function Discovery() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);
  const [currentCountry, setCurrentCountry] = useState()

  useEffect(() => {
    session?.accessToken && getCurrentMarkets();
  }, [session?.accessToken])

  const getCurrentMarkets = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: 'markets',
    }).then((data: any): void => {
      let cleanData = []
      data.markets.map((item) => {
        cleanData.push({value: item, label: item})
      })
      setItems(cleanData)
    });
  }

  const MenuList = (props: MenuListProps<any, true, any>) => {
    return (
      <components.MenuList {...props} innerProps={{ ...props.innerProps }}>
        {props.children}
      </components.MenuList>
    );
  };

  const Option = (props: OptionProps<any>) => {
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

  const MultiValueLabel = (props: MultiValueGenericProps<any, true, any>) => {
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

  return (
    <Layout>
      <div>
        <Select
          options={items}
          onChange={(e) => setCurrentCountry(e)}
          placeholder={`Search for countries...`}
          styles={{
            container: (base) => ({
              ...base,
              backgroundColor: '#eee',
              border: '1px solid black',
              borderRadius: '3px',
            }),
          }}
          components={{
            MenuList,
            MultiValueLabel,
            Option,
          }}
      />
      </div>
      {/* <FadeInOut>
      </FadeInOut> */}
    </Layout>
  );
}
