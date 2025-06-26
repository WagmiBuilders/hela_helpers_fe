import { useEffect, useState } from 'react';
import '../style/marketPriceForm.css';
import { getAllCropVarieties } from '../../services/cropVarietyService';
import { getAllDistricts } from '../../services/publicService';
import { addMarketPrice, updateMarketPrice } from '../../services/marketPriceService';
import '../../constants/commonStyle.css';
import Button from '../button';
import '../../constants/colors.css';

interface CropVariety {
  id: number;
  variety: string;
}

interface District {
  id: number;
  name: string;
}

interface MarketPriceEntry {
  id: number;
  cropVarietyId: number;
  cropVarietyName: string;
  date: string;
  district: string;
  farmGatePriceLkrPerKg: number | string;
  wholesalePriceLkrPerKg: number | string;
  retailPriceLkrPerKg: number | string;
}

interface Props {
  existingData?: MarketPriceEntry;
}

function AddMarketPriceForm({ existingData }: Props) {
  const [cropVarieties, setCropVarieties] = useState<CropVariety[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [formData, setFormData] = useState<MarketPriceEntry>({
    id: existingData?.id || 0,
    cropVarietyId: existingData?.cropVarietyId || 0,
    cropVarietyName: existingData?.cropVarietyName || '',
    date: existingData?.date || '',
    district: existingData?.district || '',
    farmGatePriceLkrPerKg: existingData?.farmGatePriceLkrPerKg || 0,
    wholesalePriceLkrPerKg: existingData?.wholesalePriceLkrPerKg || 0,
    retailPriceLkrPerKg: existingData?.retailPriceLkrPerKg || 0
  });

  useEffect(() => {
    if (
      existingData &&
      cropVarieties.length > 0 &&
      districts.length > 0
    ) {
      setFormData({
        id: existingData.id ?? 0,
        cropVarietyId: existingData.cropVarietyId ?? 0,
        cropVarietyName: existingData.cropVarietyName  ?? '',
        date: existingData.date ?? '',
        district: existingData.district ?? '',
        farmGatePriceLkrPerKg: existingData.farmGatePriceLkrPerKg ?? 0,
        wholesalePriceLkrPerKg: existingData.wholesalePriceLkrPerKg ?? 0,
        retailPriceLkrPerKg: existingData.retailPriceLkrPerKg ?? 0
      })
    } else if (!existingData) {
      setFormData({
        id: 0,
        cropVarietyId: 0,
        cropVarietyName:'',
        date: '',
        district:  '',
        farmGatePriceLkrPerKg:  '',
        wholesalePriceLkrPerKg:  '',
        retailPriceLkrPerKg: ''
      });
    }
  }, [existingData, cropVarieties, districts]);

  useEffect(() => {
    const fetchInitialData = async () => {
    try {
      const [cropVarietyData, districtData] = await Promise.all([
        getAllCropVarieties(),
        getAllDistricts()
      ]);

      setCropVarieties(Array.isArray(cropVarietyData) ? cropVarietyData : []);
      setDistricts(Array.isArray(districtData) ? districtData : []);
    } catch (error) {
      console.log('Error fetching initial data : ', error);
    }
    };
    fetchInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Price') ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (existingData?.id) {
        await updateMarketPrice(existingData.id, formData);
        alert('Market Price updated successfully');
      } else {
        await addMarketPrice(formData);
        alert('Market Price added successfully');
      }
    } catch (err) {
      alert("Failed to save market price");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="market-price-form">
        <div className="form-row single">
          <select
            name="cropVarietyId"
            value={formData.cropVarietyId}
            onChange={handleChange}
            required
          >
            <option value="">Select Crop Variety</option>
            {cropVarieties.map(v => (
              <option key={v.id} value={v.id}>
                {v.variety}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <input
            type="number"
            name="farmGatePriceLkrPerKg"
            value={formData.farmGatePriceLkrPerKg}
            onChange={handleChange}
            step="0.1"
            placeholder="Farm Gate Price (LKR/Kg)"
            required
          />
          <input
            type="number"
            name="wholesalePriceLkrPerKg"
            value={formData.wholesalePriceLkrPerKg}
            onChange={handleChange}
            step="0.1"
            placeholder="Wholesale Price (LKR/Kg)"
            required
          />
        </div>

        <div className="form-row single">
          <input
            type="number"
            name="retailPriceLkrPerKg"
            value={formData.retailPriceLkrPerKg}
            onChange={handleChange}
            step="0.1"
            placeholder="Retail Price (LKR/Kg)"
            required
          />
        </div>

        <Button
          title={formData.id ? 'Update Market Price' : 'Add Market Price'}
          type="submit"
          bgColor='var(--bg-dark)'
          textColor='var(--text-light)'
          onClick={()=>{}}
        />
      </form>
    </div>
  );
}

export default AddMarketPriceForm;
