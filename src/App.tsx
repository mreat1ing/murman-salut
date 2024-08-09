import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';

import Layout from './pages/layout';
import Store from './pages/store';
import About from './pages/about';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<h1>Main</h1>} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:id" element={<h1>Store item</h1>} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<h1>Корзина</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
