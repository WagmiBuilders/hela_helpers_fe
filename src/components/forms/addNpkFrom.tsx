import { useState } from 'react';
import '../style/addNpkForm.css';
import Button from '../button';
import '../../constants/colors.css'
import { addNpkSchedule } from '../../services/npkService';
import '../../constants/commonStyle.css'

function addNpkForm() {
  const [formData, setFormData] = useState({
    name: '',
    potassium: '',
    nitrogen: '',
    phosphorus: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'name' ? value : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addNpkSchedule(formData);
      console.log(result);
      alert('NPK Schedule added successfully!');
    } catch (error) {
      alert('Failed to add NPK Schedule');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Schedule Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="potassium"
          placeholder="Potassium (%)"
          value={formData.potassium}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="nitrogen"
          placeholder="Nitrogen (%)"
          value={formData.nitrogen}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="phosphorus"
          placeholder="Phosphorus (%)"
          value={formData.phosphorus}
          onChange={handleChange}
          required
        />

        <Button
          title='Add NPK'
          onClick={() => {}}
          type='submit'
          bgColor='var(--bg-darkGreen)'
          textColor='var(--text-light)'
        />
      </form>
    </div>
  );
}

export default addNpkForm;
