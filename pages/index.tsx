import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import firebase from '../src/firebase';
import globalFirebase from 'firebase';
import {
  Container,
  CircularProgress,
  Box,
  Card,
} from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';

import { usePosition } from 'use-position';

import SearchByStore from '../src/SearchByStore';
import { ProductService } from '../src/ProductService';
import { ProductList } from '../src/ProductList';
import { ProductAdd } from '../src/ProductAdd';
import { getFirestoreTimestamp } from '../src/utils';

const firestore = firebase.firestore();

function createProductListData(productsQuery) {
  const productsData = [];
  productsQuery.docs.forEach(product => {
    productsData.push({ ...product.data(), id: product.id });
  });
  return productsData;
}

const productService = new ProductService(firestore, globalFirebase);

const Search = () => {
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
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

  useEffect(() => {
    async function getPosts() {
      setFetchingProducts(true);
      const productsQuery = await productService.getByPlaceId(selectedPlace.placeId);
      setProducts(createProductListData(productsQuery));
      setFetchingProducts(false);
    }
    if (selectedPlace) {
      getPosts();
    }
  }, [selectedPlace]);

  function updateLocalProduct(productId, changes) {
    const _products = [...products];
    const productIndex = products.findIndex(product => product.id === productId);
    _products.splice(productIndex, 1, { ..._products[productIndex], ...changes, last_updated: getFirestoreTimestamp(globalFirebase) });
    setProducts(_products);
  }

  function onStoreSelected(address, placeId) {
    setSelectedPlace({ address, placeId })
    setInputText('');
    router.push({
      pathname: '/',
      query: { place: placeId },
    })
  }

  async function createProduct(addForm, resetForm) {
    await productService.create({
      ...addForm,
      last_updated: getFirestoreTimestamp(globalFirebase),
      google_places_id: selectedPlace.placeId
    });
    resetForm();
    setFetchingProducts(true);
    const productsQuery = await productService.getByPlaceId(selectedPlace.placeId);
    setProducts(createProductListData(productsQuery));
    setFetchingProducts(false);
  }

  const latLng = typeof window !== 'undefined' && (window as any)?.google?.maps ? new (window as any).google.maps.LatLng(latitude, longitude) : undefined;

  return <div>
    <Head>
      <title>Product Availability</title>
      <link rel="icon" href="/favicon.svg" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhWfPD2n4uuD_cHbASZJQncDY1RQOBKpM&callback=initMap&libraries=places" async defer></script>
      <style dangerouslySetInnerHTML={{__html: `
        body {
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          background-color: #f2f2f2;
        }
      `}} />
    </Head>

    <Container maxWidth="sm">
      <Box display="flex" alignItems="center">
        <img src="/toilet_paper_dark.svg" height="35px" style={{ marginRight: '16px' }} />
        <h1 style={{ fontWeight: 300 }}>Product Availability</h1>
      </Box>

      <SearchByStore
        inputText={inputText}
        location={latLng}
        onChange={(text) =>  setInputText(text)}
        onSelect={onStoreSelected}
      />

      {inputText === '' &&
        <div style={{ marginTop: '40px' }}>
          {fetchingProducts && <CircularProgress size={50} />}
          {selectedPlace && !fetchingProducts &&
            <Card>
              {selectedPlace && selectedPlace.address &&
                <Box display="flex" alignItems="center" marginLeft={2} marginRight={2}>
                  <PlaceIcon/> <h3 style={{ marginLeft: '8px', fontWeight: 400 }}>{selectedPlace.address}</h3>
                </Box>
              }
              <ProductAdd
                onAddClick={createProduct}
                showNoAvailabilityMessage={selectedPlace && !fetchingProducts && products.length === 0}
              />
              {products.length > 0 && <ProductList products={products} onProductChange={updateLocalProduct} />}
            </Card>
          }
        </div>
      }
    </Container>
  </div>
}

export default Search
