export class ProductService {
  private collection;
  private firebase;

  constructor(firestore, firebase){
    this.collection = firestore.collection('products');
    this.firebase = firebase;
  }

  async getByPlaceId(placeId) {
    return this.collection.where('google_places_id', '==', placeId).orderBy('last_updated', 'desc').get();
  }

  async update(productId, changes) {
    const docRef = this.collection.doc(productId);
    return docRef.update({ ...changes, last_updated: this.firebase.firestore.Timestamp.now() });
  }

  async create(product) {
    return this.collection.add(product);
  }
}