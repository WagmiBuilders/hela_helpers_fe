import { useState } from 'react';
import { districts, soilTypes } from '../../constants/dummyData';
import '../style/publicSuggestionForm.css';
import Button from '../button';
import '../../constants/colors.css'
import { getCropSuggestion } from '../../services/publicService';


interface Props {
  onSuggest: (data: any[]) => void;
}

function publicSuggestionForm({onSuggest} : Props) {

  const [formData, setFormData] = useState({
    district: '',
    soilType: '',
    cultivableArea: '',
    budget: '',
    irrigationCapacity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await getCropSuggestion(formData);
      onSuggest(result); 
    } catch (err) {
      alert('Error fetching suggestions.');
      console.error(err);
    }
  };

  const handleOnGetSuggestion = () => {
    alert('Suggestion');
  };

  return (
    <div>
        <p className="form-title">Input Your Requirements</p>
        <form className="suggestion-form" onSubmit={handleSubmit}>
            <select name="district" value={formData.district} onChange={handleChange} required>
              <option value="">Select District</option>
              {districts.map((district, idx) => (
                <option key={idx} value={district} className="option">{district}</option>
              ))}
            </select>

            <select name="soilType" value={formData.soilType} onChange={handleChange} required>
              <option value="">Select Soil Type</option>
              {soilTypes.map((type, idx) => (
                <option key={idx} value={type} className="option">{type}</option>
              ))}
            </select>

            <input
              type="number"
              name="cultivableArea"
              value={formData.cultivableArea}
              onChange={handleChange}
              placeholder="Cultivable Area (in acres)"
              required
            />
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Budget (in LKR)"
              required
            />
            <input
              type="number"
              name="irrigationCapacity"
              value={formData.irrigationCapacity}
              onChange={handleChange}
              placeholder="Irrigation Capacity (L/day)"
              required
            />

            <div className='form-button'>
              <Button 
                title='Get Suggestion'
                onClick={handleOnGetSuggestion}
                bgColor='var(--bg-dark)'
                textColor='var(--text-light)'
            />
            </div>
        </form>
    </div>
  );
}

export default publicSuggestionForm;
