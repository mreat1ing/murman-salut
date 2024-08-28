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
import CartPage from './pages/cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:id" element={<Card />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<CartPage />} />
    </Route>
  )
);

function App() {
  const { setCategories, setCategoriesLoading, setItems, setItemsLoading } =
    useDispatchedStoreActions();

  useEffect(() => {
    const items = db.loadItems();
    setItemsLoading(true);
    const categories = db.loadCats();
    setCategoriesLoading(true);
    Promise.all([items, categories]).then((p) => {
      setItems(p[0]);
      setCategories(p[1]);
      setItemsLoading(false);
      setCategoriesLoading(false);
    });
    
  }, [setCategories, setCategoriesLoading, setItems, setItemsLoading]);
  return <RouterProvider router={router} />;
}

export default App;
