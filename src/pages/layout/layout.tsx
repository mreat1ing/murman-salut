import { Outlet } from 'react-router-dom';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Main from 'src/components/Main';
import ScrollToTopButton from 'src/common/ScrollToTopButton';

export default function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
