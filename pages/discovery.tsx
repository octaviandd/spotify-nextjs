import React, { useEffect, useState } from 'react';
import FadeInOut from '../components/FadeInOut';
import Layout from '../components/Layout';
import { getSpotifyData } from '../components/utils';
import { useSession } from 'next-auth/react';
import Select from 'react-select';
import LimitSetter from '../components/profile-page/LimitSetter';
import FeaturedPlaylists from '../components/discovery-page/FeaturedPlaylists';
import { SelectMenuList } from '../components/global/SelectMenuList';
import { SelectMenuOption } from '../components/global/SelectMenuOption';
import { SelectMultiValueLabel } from '../components/global/SelectMultiValueLabel';

export default function Discovery() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(10);

  useEffect(() => {
    session?.accessToken && getCurrentMarkets();
  }, [session?.accessToken]);

  const getCurrentMarkets = () => {
    getSpotifyData({
      token: session?.accessToken as string,
      searchParams: undefined,
      queryLink: 'markets',
    }).then((data: any): void => {
      let cleanData = [];
      data.markets.map((item, index) => {
        cleanData.push({ id: index, value: item, label: item });
      });
      setItems(cleanData);
    });
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
            MenuList: SelectMenuList,
            MultiValueLabel: SelectMultiValueLabel,
            Option: SelectMenuOption,
          }}
        />
      </div>
      <LimitSetter currentLimit={currentLimit} setCurrentLimit={setCurrentLimit}></LimitSetter>
      <FeaturedPlaylists></FeaturedPlaylists>
      {/* <FadeInOut>
      </FadeInOut> */}
    </Layout>
  );
}
