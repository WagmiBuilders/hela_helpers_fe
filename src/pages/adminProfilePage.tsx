import './style/adminProfilePage.css';
import '../constants/colors.css';
import AdminNavbar from '../components/adminNavbar';
import { useState, useEffect } from 'react';
import CropCard from '../components/cropCard';
import Button from '../components/button';
import AddCropForm from '../components/forms/addCropFrom';
import { deleteCrop, getAllCrops, updateCrop } from '../services/cropService';

function profile() {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [showAddCropPopup, setShowAddCropPopup] = useState(false);
  const [cropList, setCropList] = useState([]);

  useEffect(() => {
    if (selectedOption === 'Crop') {
      fetchCropList();
    }
  }, [selectedOption]);

  const fetchCropList = async () => {
    try {
      const crops = await getAllCrops();
      setCropList(crops);
    } catch (error) {
      alert('Failed to load crops');
    }
  };

  const handleOnEditCrop = async (id: number, newName: string) => {
    try {
      await updateCrop(id, newName);
      fetchCropList();
    } catch (error) {
      alert('Failed to update crop');
    }
  };

  const handleOnDeleteCrop = async (id: number) => {
    try {
      await deleteCrop(id);
      fetchCropList();
    } catch (error) {
      alert('Failed to delete crop');
    }
  };

  const handleOnAddCrop = () => {
    setShowAddCropPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddCropPopup(false);
    fetchCropList(); 
  };

  return (
    <div className='admin-profile'>
      <div className='admin-navbar'>
        <AdminNavbar setSelectedOption={setSelectedOption} />
      </div>

      <div className='admin-body'>
        {selectedOption === 'Dashboard' && <h2>Dashboard</h2>}

        {selectedOption === 'Crop' && (
          <>
            <div className='admin-body-header'>
              <h2>Crop Content</h2>
              <Button
                title='Add Crop +'
                onClick={handleOnAddCrop}
                bgColor='var(--text-light)'
                textColor='var(--text-dark)'
              />
            </div>

            <div className='admin-body-content'>
              {cropList.map((crop: any) => (
                <CropCard key={crop.id} crop={crop} onEdit={handleOnEditCrop} onDelete={handleOnDeleteCrop}/>
              ))}
            </div>

            {showAddCropPopup && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <AddCropForm />
                  <button onClick={handleClosePopup} className='close-btn'>X</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default profile;
