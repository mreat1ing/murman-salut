import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';

import Layout from './pages/layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<h1>Main</h1>} />
      <Route path="/store" element={<h1>Store</h1>} />
      <Route path="/store/:id" element={<h1>Store item</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
