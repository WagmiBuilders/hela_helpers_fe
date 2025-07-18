import { useEffect, useState } from 'react';
import '../style/addVarietyForm.css';
import Button from '../button';
import '../../constants/colors.css';
import { getAllCrops } from '../../services/cropService';
import { getAllNpkSchedules } from '../../services/npkService';
import { getAllZones } from '../../services/zoneService';
import { addCropVariety, updateCropVarieties } from '../../services/cropVarietyService';
import '../../constants/commonStyle.css'

interface District {
  id: number;
  name: string;
}

interface Props {
  existingData?: Partial<FormData> & { id?: number };
}

interface Crop {
  id: number;
  name: string;
}

interface Zone {
  id: number;
  zoneCode: string;
  avgRainfallMm: number;
  avgTempC: number;
  soilSeries: string;
  districts: District[];
}

interface NpkSchedule {
  id: number;
  name?: string;
}

interface FormData {
  cropId: number | '';
  variety: string;
  zoneFitIds: number[];
  soilCompatibility: string;
  maturityDays: number | '';
  waterNeedsMm: number | '';
  yieldKgPerHa: number | '';
  pestDiseaseIndex: number | '';
  rotationOptions: string[];
  seedRateKgPerHa: number | '';
  npkScheduleId: number | '';
}

function addVarietyForm({ existingData }: Props) {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [npkSchedules, setNpkSchedules] = useState<NpkSchedule[]>([]);
  const [formData, setFormData] = useState<FormData>({
  cropId: existingData?.cropId || '',
  variety: existingData?.variety || '',
  zoneFitIds: existingData?.zoneFitIds || [],
  soilCompatibility: existingData?.soilCompatibility || '',
  maturityDays: existingData?.maturityDays || '',
  waterNeedsMm: existingData?.waterNeedsMm || '',
  yieldKgPerHa: existingData?.yieldKgPerHa || '',
  pestDiseaseIndex: existingData?.pestDiseaseIndex || '',
  rotationOptions: existingData?.rotationOptions || [],
  seedRateKgPerHa: existingData?.seedRateKgPerHa || '',
  npkScheduleId: existingData?.npkScheduleId || ''
});
  const [rotationInput, setRotationInput] = useState('');

 useEffect(() => {
  if (
    existingData &&
    crops.length > 0 &&
    zones.length > 0 &&
    npkSchedules.length > 0
  ) {
    setFormData({
      cropId: existingData.cropId ?? '',
      variety: existingData.variety ?? '',
      zoneFitIds: existingData.zoneFitIds ?? [],
      soilCompatibility: existingData.soilCompatibility ?? '',
      maturityDays: existingData.maturityDays ?? '',
      waterNeedsMm: existingData.waterNeedsMm ?? '',
      yieldKgPerHa: existingData.yieldKgPerHa ?? '',
      pestDiseaseIndex: existingData.pestDiseaseIndex ?? '',
      rotationOptions: existingData.rotationOptions ?? [],
      seedRateKgPerHa: existingData.seedRateKgPerHa ?? '',
      npkScheduleId: existingData.npkScheduleId ?? ''
    });
  } else if (!existingData) {
  
    setFormData({
      cropId: '',
      variety: '',
      zoneFitIds: [],
      soilCompatibility: '',
      maturityDays: '',
      waterNeedsMm: '',
      yieldKgPerHa: '',
      pestDiseaseIndex: '',
      rotationOptions: [],
      seedRateKgPerHa: '',
      npkScheduleId: ''
    });
  }
}, [existingData, crops, zones, npkSchedules]);




  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [cropData, zoneData, npkData] = await Promise.all([
          getAllCrops(),
          getAllZones(),
          getAllNpkSchedules()
        ]);

        setCrops(Array.isArray(cropData) ? cropData : []);
        setZones(Array.isArray(zoneData) ? zoneData : []);
        setNpkSchedules(Array.isArray(npkData) ? npkData : []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleZoneSelection = (id: number) => {
    setFormData(prev => {
      const updatedZones = prev.zoneFitIds.includes(id)
        ? prev.zoneFitIds.filter(zid => zid !== id)
        : [...prev.zoneFitIds, id];
      return { ...prev, zoneFitIds: updatedZones, soilCompatibility: '' };
    });
  };

  const handleSoilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, soilCompatibility: e.target.value });
  };

  const handleAddRotation = () => {
    if (rotationInput.trim()) {
      setFormData({
        ...formData,
        rotationOptions: [...formData.rotationOptions, rotationInput.trim()]
      });
      setRotationInput('');
    }
  };

  const handleRemoveRotation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rotationOptions: prev.rotationOptions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (existingData?.id) {
      await updateCropVarieties(existingData.id, formData);
      alert('Crop variety updated successfully!');
    } else {
      await addCropVariety(formData);
      alert('Crop variety added successfully!');
    }
  } catch (error) {
    alert('Failed to save crop variety');
  }
};


  const zoneSoilOptions = zones
    .filter(zone => formData.zoneFitIds.includes(zone.id))
    .map(zone => zone.soilSeries);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <select name="cropId" onChange={handleChange} value={formData.cropId || ''}>
              <option value="">Select Crop</option>
              {crops.map(crop => (
                <option key={crop.id} value={crop.id}>{crop.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input type="text" name="variety" value={formData.variety} onChange={handleChange} placeholder='Variety Name'/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Zone Fit:</label>
            <div className="checkbox-grid">
              {zones.map(zone => (
                <label key={zone.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.zoneFitIds.includes(zone.id)}
                    onChange={() => toggleZoneSelection(zone.id)}
                  />
                  {zone.zoneCode}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <select name="soilCompatibility" onChange={handleSoilChange} value={formData.soilCompatibility}>
              <option value="">Select SoilCompatibility</option>
              {[...new Set(zoneSoilOptions)].map((soil, index) => (
                <option key={index} value={soil}>{soil}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select name="npkScheduleId" onChange={handleChange} value={formData.npkScheduleId || ''}>
              <option value="">Select NPK Schedule</option>
              {npkSchedules.map(sched => (
                <option key={sched.id} value={sched.id}>{sched.name || `Schedule ${sched.id}`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="number" name="maturityDays" value={formData.maturityDays} onChange={handleChange} placeholder='Maturity Days'/>
          </div>
          <div className="form-group">
            <input type="number" name="waterNeedsMm" value={formData.waterNeedsMm} onChange={handleChange} placeholder='Water Needs (mm)'/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="number" step="0.1" name="yieldKgPerHa" value={formData.yieldKgPerHa} onChange={handleChange} placeholder='Yield (Kg/Ha)'/>
          </div>
          <div className="form-group">
            <input type="number" step="0.1" name="pestDiseaseIndex" value={formData.pestDiseaseIndex} onChange={handleChange} placeholder='Pest/Disease Index'/>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Rotation Options:</label>
            <div className="rotation-inline">
              <input type="text" value={rotationInput} onChange={(e) => setRotationInput(e.target.value)} />
              <Button title='Add +' onClick={handleAddRotation} bgColor='var(--text-light)' textColor='var(--text-dark)'/>
            </div>
            <div className="rotation-tags">
             {Array.isArray(formData.rotationOptions) &&
                formData.rotationOptions.map((opt, idx) => (
                  <span className="rotation-tag" key={idx}>
                    {opt}
                    <button type="button" onClick={() => handleRemoveRotation(idx)}>×</button>
                  </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="number" step="0.1" name="seedRateKgPerHa" value={formData.seedRateKgPerHa} onChange={handleChange} placeholder='Seed Rate (Kg/Ha)'/>
          </div>
        </div>

        <Button
          title='Add Variety'
          onClick={() => {}}
          type='submit'
          bgColor='var(--bg-darkGreen)'
          textColor='var(--text-light)'
        />
      </form>
    </div>
  );
}

export default addVarietyForm;