export function getFirestoreTimestamp(firebase) {
  return firebase.firestore.Timestamp.now();
}

export const availabilityColors = {
  high: '#25e638',
  medium: '#e6b825',
  low: '#c51a1a',
  unkown: '#b7b7b7'
};
