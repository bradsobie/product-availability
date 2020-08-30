export function getFirestoreTimestamp(firebase) {
  return firebase.firestore.Timestamp.now();
}
