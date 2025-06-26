import { useEffect, useState } from 'react';
import '../style/addZoneForm.css';
import { getAllDistricts } from '../../services/publicService';
import Button from '../button';
import '../../constants/colors.css'
import { addZone } from '../../services/zoneService';
import '../../constants/commonStyle.css'

function addZoneForm() {
  const [districts, setDistricts] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    zoneCode: '',
    avgRainfallMm: '',
    avgTempC: '',
    soilSeries: '',
    districtNames: [] as string[],
  });

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const data = await getAllDistricts();
      setDistricts(data);
    } catch (error) {
      console.error('Failed to fetch districts');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDistrictCheckbox = (name: string) => {
    const updatedDistricts = formData.districtNames.includes(name)
      ? formData.districtNames.filter(d => d !== name)
      : [...formData.districtNames, name];

    setFormData({ ...formData, districtNames: updatedDistricts });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      avgRainfallMm: parseFloat(formData.avgRainfallMm),
      avgTempC: parseFloat(formData.avgTempC),
    };

    try {
      const result = await addZone(payload);
      console.log(result);
      alert('Zone added successfully!');
    } catch (error) {
      alert('Failed to add Zone');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          name="zoneCode"
          placeholder="Zone Code"
          value={formData.zoneCode}
          onChange={handleChange}
        />
        <input
          type="number"
          name="avgRainfallMm"
          placeholder="Avg Rainfall (mm)"
          value={formData.avgRainfallMm}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="avgTempC"
          placeholder="Avg Temp (°C)"
          value={formData.avgTempC}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <input
          type="text"
          name="soilSeries"
          placeholder="Soil Series"
          value={formData.soilSeries}
          onChange={handleChange}
        />
      </div>

      <div className="form-row checkbox-group">
        <label>Select Districts:</label>
        <div className="checkbox-scroll">
          {districts.map((district) => (
            <label key={district.id} className="checkbox-item">
              <input
                type="checkbox"
                value={district.name}
                checked={formData.districtNames.includes(district.name)}
                onChange={() => handleDistrictCheckbox(district.name)}
              />
              {district.name}
            </label>
          ))}
        </div>
      </div>

      {formData.districtNames.length > 0 && (
        <div className="selected-districts">
          {formData.districtNames.join(', ')}
        </div>
      )}

      <Button
        title='Add Zone'
        onClick={() => {}}
        bgColor='var(--bg-dark)'
        textColor='var(--text-light)'
        type='submit'
      />
    </form>
  );
}

export default addZoneForm;
