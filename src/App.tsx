import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';
import { useEffect } from 'react';

import { db } from 'src/services/db';
import useDispatchedStoreActions from 'src/hooks/useDispatchedStoreActions/useDispatchedStoreActions';

import Layout from './pages/layout';
import Store from './pages/store';
import About from './pages/about';
import Card from './pages/card';
import MainPage from './pages/main';
import { IStoreItem } from './interfaces/storeItem.interface';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:id" element={<Card />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<h1>Корзина</h1>} />
    </Route>
  )
);

function App() {
  const {setItems} = useDispatchedStoreActions();
  useEffect(() => {
    const items = db.loadItems();
    items.then(res => setItems(res));
  }, [setItems]);
  return <RouterProvider router={router} />;
}

export default App;
