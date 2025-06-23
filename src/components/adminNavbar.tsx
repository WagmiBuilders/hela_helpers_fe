import React from 'react';
import './style/adminNavbar.css';
import profile from '../images/profile.avif';
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
        </ul>
      </div>

      <div className='logout-button'>
        <Button
          title='Logout'
          onClick={handleOnLogout}
          bgColor='var(--bg-dark)'
          textColor='var(--text-light)'
        />
      </div>
    </div>
  );
};

export default adminNavbar;
