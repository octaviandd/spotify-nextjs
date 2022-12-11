import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Track } from '../components/search-page/types';

const initialState: SongInitialState = {
  currentSong: {
    album: {
      images: [],
    },
    artists: [],
    available_markets: [],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: {},
    external_urls: {},
    href: '',
    id: '',
    is_local: false,
    name: '',
    popularity: 0,
    preview_url: '',
    track_number: 0,
    type: '',
    uri: '',
  },
};

interface SongInitialState {
  currentSong: Track;
}

export const songsSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateCurrentSong: (state, action: PayloadAction<{ value: Track }>) => {
      state.currentSong = action.payload.value;
    },
  },
});

export const { updateCurrentSong } = songsSlice.actions;

export const selectCurrentSong = (state: RootState) => state.song.currentSong;

export default songsSlice.reducer;
