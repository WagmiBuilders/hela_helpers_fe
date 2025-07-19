import React from 'react';
import './style/adminNavbar.css';
import profile from '../images/profile.jpeg';
import Button from './button';
import '../constants/colors.css';

interface AdminNavbarProps {
  setSelectedOption: (option: string) => void;
}

const adminNavbar: React.FC<AdminNavbarProps> = ({ setSelectedOption }) => {
  const handleOnLogout = () => {
    alert('Logout');
  };

  return (
    <div className='admin-nb'>
      <div className='profile-image'>
        <img src={profile} alt='Profile' />
        <div className='user-name'>
          <p>Username</p>
        </div>
      </div>

      <div className='options'>
        <ul>
          <li onClick={() => setSelectedOption('Dashboard')}>Dashboard</li>
          <li onClick={() => setSelectedOption('Crop')}>Crop</li>
          <li onClick={() => setSelectedOption('NPK')}>NPK</li>
          <li onClick={() => setSelectedOption('Zone')}>Zone</li>
          <li onClick={() => setSelectedOption('Variety')}>Crop-Variety</li>
          <li onClick={() => setSelectedOption('MarketPrice')}>Market Price</li>
          <li onClick={() => setSelectedOption('Subscribers')}>Subscribers</li>
        </ul>
      </div>

      <div className='logout-button'>
        <Button
          title='Logout'
          onClick={handleOnLogout}
          bgColor='var(--bg-darkGreen)'
          textColor='var(--text-light)'
        />
      </div>
    </div>
  );
};

export default adminNavbar;
