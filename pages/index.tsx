import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container } from '@material-ui/core';
import { usePosition } from 'use-position';

import firebase from '../src/firebase';
import SearchByStore from '../src/SearchByStore';
import { Header } from '../src/Header';
import { PlaceCard } from '../src/PlaceCard';

const Search = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [inputText, setInputText] = useState('');
  const { latitude, longitude } = usePosition(false);
  const router = useRouter();

  useEffect(() => {
    firebase.analytics();
  }, []);

  useEffect(() => {
    if ((!selectedPlace && router.query.place) || (selectedPlace && router.query.place !== selectedPlace.placeId)) {
      setSelectedPlace({ placeId: router.query.place });
    }
  }, [router.query.place]);

  function onStoreSelected(address, placeId) {
    setSelectedPlace({ address, placeId })
    setInputText('');
    router.push({
      pathname: '/',
      query: { place: placeId },
    })
  }

  const latLng = typeof window !== 'undefined' && (window as any)?.google?.maps ? new (window as any).google.maps.LatLng(latitude, longitude) : undefined;

  return <div>
    <Container maxWidth="sm">
      <Header />
      <SearchByStore
        inputText={inputText}
        location={latLng}
        onChange={text => setInputText(text)}
        onSelect={onStoreSelected}
      />
      {inputText === '' && <PlaceCard place={selectedPlace} />}
    </Container>
  </div>
}

export default Search
