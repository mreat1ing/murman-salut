import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref, child, remove } from 'firebase/database';

const firebaseConfig = {
  databaseURL:
    'https://my-card-application-default-rtdb.europe-west1.firebasedatabase.app/',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export const db = {
  deleteItem: (id) => {
    const itemRef = ref(database, `items/${id}`);
    remove(itemRef);
  },

  loadItems: async () => {
    const snapshot = await get(child(dbRef, 'items'));
    const items = [];

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const item of Object.values(data)) {
        items.push(item);
      }
    } else {
      throw new Error('No data available');
    }
    return items;
  },
  loadPoints: async () => {
    const snapshot = await get(child(dbRef, 'points'));
    const deliveryPoints = {};

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const item of Object.entries(data)) {
        deliveryPoints[item[0]] = item[1];
      }
    } else {
      throw new Error('No data available');
    }
    return deliveryPoints;
  },
loadCats: async () => {
  const snapshot = await get(child(dbRef, 'categories2'));
  const categories = [];

  if (snapshot.exists()) {
    const data = snapshot.val();

    for (const item of Object.values(data)) {
      categories.push(item);
    }
  } else {
    throw new Error('No data available');
  }
  return categories;
},
};
