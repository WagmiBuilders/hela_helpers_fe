import './style/header.css';
import logoImage from '../images/logo.png'; 
import Navbar from './navbar';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Logo_hela_helpers"/>
      </div>
      <div className="navbar">
        <Navbar/>
      </div>
    </header>
  );
}

export default Header;
