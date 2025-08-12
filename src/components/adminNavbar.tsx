import React from 'react';
import './style/adminNavbar.css';
import profile from '../images/profile.jpeg';
import Button from './button';
import { Home, Leaf, Activity, Map, Layers, TrendingUp, Users } from 'lucide-react';

interface AdminNavbarProps {
  setSelectedOption: (option: string) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ setSelectedOption }) => {
  const handleOnLogout = () => {
    alert('Logout');
  };

  return (
    <div className="admin-navbar">
      <div className="navbar-header">
        <img src={profile} alt="Profile" className="profile-pic" />
        <p className="username">Admin User</p>
      </div>

      <ul className="nav-links">
        <li onClick={() => setSelectedOption('Dashboard')}>
          <Home size={18} /> Dashboard
        </li>
        <li onClick={() => setSelectedOption('Crop')}>
          <Leaf size={18} /> Crop
        </li>
        <li onClick={() => setSelectedOption('NPK')}>
          <Activity size={18} /> NPK
        </li>
        <li onClick={() => setSelectedOption('Zone')}>
          <Map size={18} /> Zone
        </li>
        <li onClick={() => setSelectedOption('Variety')}>
          <Layers size={18} /> Variety
        </li>
        <li onClick={() => setSelectedOption('MarketPrice')}>
          <TrendingUp size={18} /> Market Price
        </li>
        <li onClick={() => setSelectedOption('Subscribers')}>
          <Users size={18} /> Subscribers
        </li>
      </ul>

      <div className="logout-wrapper">
        <Button
          title="Logout"
          onClick={handleOnLogout}
          bgColor="var(--bg-darkGreen)"
          textColor="var(--text-light)"
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
