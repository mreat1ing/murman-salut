import { Outlet } from 'react-router-dom';

import Header from 'src/components/Header';
// import Footer from 'src/components/Footer';
import BackgroundImage from 'src/components/BackgroundImage';
import image from 'src/assets/img/firework-light-blue.jpg';

import './layout.scss';

export default function Layout() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="middle-container" style={{ height: 10000 }}>
        <BackgroundImage imageSrc={image} alt="Салют" />
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
