import '../style/addCropFrom.css';
import { useState } from 'react';
import Button from '../button';
import '../../constants/colors.css';
import { addCrop } from '../../services/cropService';
import '../../constants/commonStyle.css'

function addCropForm() {
  const [crop, setCrop] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrop(e.target.value);
  };

  const handleOnAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addCrop(crop);
      console.log(result);
      alert('Crop added successfully!');
      setCrop('');
    } catch (error) {
      alert('Failed to add crop');
    }
  };

  return (
    <form className='add-crop' onSubmit={handleOnAddCrop}>
      <input
        type="text"
        name="crop"
        value={crop}
        onChange={handleChange}
        placeholder="Crop Name"
        required
      />

      <Button
        type='submit'
        title='Add Crop'
        onClick={() => {}} 
        bgColor='var(--bg-dark)'
        textColor='var(--text-light)'
      />
    </form>
  );
}

export default addCropForm;
