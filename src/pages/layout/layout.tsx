import { Outlet } from 'react-router-dom';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

import './layout.scss';

export default function Layout() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="middle-container" style={{ height: 10000 }}>
        <Outlet />
      </div>
      {/* <div className="footer-container">
        <Footer />
      </div> */}
    </div>
  );
}
