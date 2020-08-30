import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container } from '@material-ui/core';
import { usePosition } from 'use-position';

import firebase from '../src/firebase';
import SearchByStore from '../src/SearchByStore';
import { GlobalStyle } from '../src/GlobalStyles';
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
    <Head>
      <title>Product Availability</title>
      <link rel="icon" href="/favicon.svg" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <script dangerouslySetInnerHTML={{ __html: `
        window.initMap = function(){}
      `}} />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhWfPD2n4uuD_cHbASZJQncDY1RQOBKpM&callback=initMap&libraries=places"></script>
    </Head>

    <GlobalStyle />

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
