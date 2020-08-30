import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Card } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import globalFirebase from 'firebase';
import styled from 'styled-components';

import { ProductList } from '../src/ProductList';
import { ProductAdd } from '../src/ProductAdd';
import { ProductService } from '../src/ProductService';
import { getFirestoreTimestamp } from '../src/utils';
import firebase from '../src/firebase';

const CardTitle = styled.h3`
  font-weight: 400;
`;

const firestore = firebase.firestore();

const productService = new ProductService(firestore, globalFirebase);

function createProductListData(productsQuery) {
  const productsData = [];
  productsQuery.docs.forEach(product => {
    productsData.push({ ...product.data(), id: product.id });
  });
  return productsData;
}

export const PlaceCard = ({ place }) => {
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  useEffect(() => {
    async function getPosts() {
      setFetchingProducts(true);
      const productsQuery = await productService.getByPlaceId(place.placeId);
      setProducts(createProductListData(productsQuery));
      setFetchingProducts(false);
    }
    if (place) {
      getPosts();
    }
  }, [place]);

  function updateLocalProduct(productId, changes) {
    const _products = [...products];
    const productIndex = products.findIndex(product => product.id === productId);
    _products.splice(productIndex, 1, { ..._products[productIndex], ...changes, last_updated: getFirestoreTimestamp(globalFirebase) });
    setProducts(_products);
  }

  async function createProduct(addForm, onComplete) {
    await productService.create({
      ...addForm,
      last_updated: getFirestoreTimestamp(globalFirebase),
      google_places_id: place.placeId
    });
    setFetchingProducts(true);
    const productsQuery = await productService.getByPlaceId(place.placeId);
    setProducts(createProductListData(productsQuery));
    setFetchingProducts(false);
    onComplete();
  }

  async function onProductChange(productId, changes) {
    updateLocalProduct(productId, changes);
    await productService.update(productId, changes);
  }

  return (
    <Box mt={5}>
      {fetchingProducts && <CircularProgress size={50} />}
      {place && !fetchingProducts &&
        <Card>
          {place && place.address &&
            <Box display="flex" alignItems="center" ml={2} mr={2}>
              <PlaceIcon/>
              <Box ml={1}>
                <CardTitle>{place.address}</CardTitle>
              </Box>
            </Box>
          }
          <ProductAdd
            onAddClick={createProduct}
            showNoAvailabilityMessage={place && !fetchingProducts && products.length === 0}
          />
          {products.length > 0 && <ProductList products={products} onProductChange={onProductChange} />}
        </Card>
      }
    </Box>
  );
};