import './style/adminProfilePage.css';
import '../constants/colors.css';
import AdminNavbar from '../components/adminNavbar';
import { useState, useEffect } from 'react';
import Button from '../components/button';
import CropVarietyDetail from '../components/cropVarietyDetail';
import '../constants/commonStyle.css'
import SubscribedUsersList from '../components/SubscribedUsersList';

import AddCropForm from '../components/forms/addCropFrom';
import AddNpkForm from '../components/forms/addNpkFrom';
import AddZoneForm from '../components/forms/addZoneForm';
import AddVarietyForm from '../components/forms/addVarietyForm';
import AddMarketPriceForm from '../components/forms/addMarketPriceForm';

import {
  deleteCrop,
  getAllCrops,
  updateCrop
} from '../services/cropService';
import {
  getAllNpkSchedules,
  updateNpkSchedule,
  deleteNpkSchedule,
} from '../services/npkService';
import {
  deleteZone,
  getAllZones,
  updateZone
} from '../services/zoneService';
import {
  getAllCropVarieties,
  deleteCropVariety,
  getCropVarietyById
} from '../services/cropVarietyService';
import { 
  getAllMarketPrice, 
  deleteMarketPrice,
  getMarketPriceById 
} from '../services/marketPriceService';
import { getAllSubscribedUsers } from '../services/subscribeService';

import NpkTable from '../components/npkTable';
import CropCard from '../components/cropCard';
import ZoneTable from '../components/zoneTable';
import CropVarietyTable from '../components/cropVarietyTable';
import MarketPriceTable from '../components/marketPriceTable';
import DashboardStats from '../components/DashboardStats';

interface Crop {
  id: number;
  name: string;
}

interface NpkSchedule {
  id: number;
  name: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface District {
  id: number;
  name: string;
}


interface Zone {
  id: number;
  zoneCode: string;
  avgRainfallMm: number;
  avgTempC: number;
  soilSeries: string;
  // If your API sometimes omits districts, make this optional OR default to []
  districts: District[];
}

interface MarketPrice {
  id: number;
  cropVarietyId: number;
  cropVarietyName: string;
  date: string;
  district: string;
  farmGatePriceLkrPerKg: number;
  wholesalePriceLkrPerKg: number;
  retailPriceLkrPerKg: number;
}

interface CropVariety {
  id: number;
  variety: string;
  crop: {
    id: number;
    name: string;
  };
  zoneFit: {
    id: number;
    zoneCode: string;
    avgRainfallMm: number;
    avgTempC: number;
    soilSeries: string;
    districts: {
      id: number;
      name: string;
    }[];
  }[];
  soilCompatibility: string;
  maturityDays: number;
  waterNeedsMm: number;
  yieldKgPerHa: number;
  pestDiseaseIndex: number;
  rotationOptions: string[] | string;
  seedRateKgPerHa: number;
  npkSchedule: {
    id: number;
    name: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

// interface CropVariety {
//   id: number;
//   variety: string;
//   soilCompatibility: string;
//   maturityDays: number;
//   waterNeedsMm: number;
//   yieldKgPerHa: number;
//   pestDiseaseIndex: number;
//   rotationOptions: string;
//   seedRateKgPerHa: number;
// }

const Profile=()=> {
  const [viewVarietyData, setViewVarietyData] = useState<CropVariety | null>(null);
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [cropList, setCropList] = useState<Crop[]>([]);
  const [npkList, setNpkList] = useState<NpkSchedule[]>([]);
  const [zoneList, setZoneList] = useState<Zone[]>([]);
  const [cropVarietyList, setCropVarietyList] = useState<CropVariety[]>([]);
  const [marketPriceList, setMarketPriceList] = useState<MarketPrice[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    subscribedUsers: 0,
    crops: 0,
    varieties: 0,
    zones: 0,
    lastPredictionTime: ''
  });

  const [editVarietyData, setEditVarietyData] = useState(null);
  const [editMarketPriceData, setEditMarketPriceData] = useState(null);

  useEffect(() => {
    if (selectedOption === 'Crop') {
      fetchCropList();
    } else if (selectedOption === 'NPK') {
      fetchNpkScheduleList();
    } else if (selectedOption === 'Zone') {
      fetchZoneList();
    } else if (selectedOption === 'Variety') {
      fetchCropVarietyList();
    } else if (selectedOption === 'MarketPrice') {
      fetchMarketPriceList();
    } else if (selectedOption === 'Dashboard') {
      fetchDashboardStats();
    }
  }, [selectedOption]);

  const fetchDashboardStats = async () => {
    try {
      const [users, cropsData, varietiesData, zonesData] = await Promise.all([
        getAllSubscribedUsers(),
        getAllCrops(),
        getAllCropVarieties(),
        getAllZones()
      ]);

      setDashboardStats({
        subscribedUsers: users.length,
        crops: cropsData.length,
        varieties: varietiesData.length,
        zones: zonesData.length,
        lastPredictionTime: new Date().toLocaleString()
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  //----------------Crop---------------------------------------------
  const fetchCropList = async () => {
    try {
      const crops = await getAllCrops();
      setCropList(crops);
    } catch (error) {
      console.error(error);
      alert('Failed to load crops');
    }
  };

  const handleOnEditCrop = async (id: number, newName: string) => {
    try {
      await updateCrop(id, newName);
      fetchCropList();
    } catch (error) {
      console.error(error);
      alert('Failed to update crop');
    }
  };

  const handleOnDeleteCrop = async (id: number) => {
    try {
      await deleteCrop(id);
      fetchCropList();
    } catch (error) {
      console.error(error);
      alert('Failed to delete crop');
    }
  };

  //-----------NPK Schedule-------------------
  const fetchNpkScheduleList = async () => {
    try {
      const NPKs = await getAllNpkSchedules();
      setNpkList(NPKs);
    } catch (error) {
      console.error(error);
      alert('Failed to load NPK schedules');
    }
  };

  const handleOnEditNpk = async (id: number, newData: unknown) => {
    try {
      await updateNpkSchedule(id, newData);
      fetchNpkScheduleList();
    } catch (error) {
      console.error(error);
      alert('Failed to update NPK schedule');
    }
  };

  const handleOnDeleteNpk = async (id: number) => {
    try {
      await deleteNpkSchedule(id);
      fetchNpkScheduleList();
    } catch (error) {
      console.error(error);
      alert('Failed to delete NPK schedule');
    }
  };

  //--------------Zone------------------
  const fetchZoneList = async () => {
    try {
      const zones = await getAllZones();
      setZoneList(zones);
    } catch (error) {
      console.error(error);
      alert('Failed to load Zones');
    }
  };

  const handleOnEditZone = async (id: number, newData: unknown) => {
    try {
      await updateZone(id, newData);
      fetchZoneList();
    } catch (error) {
      console.error(error);
      alert('Failed to update zone');
    }
  };

  const handleOnDeleteZone = async (id: number) => {
    try {
      await deleteZone(id);
      fetchZoneList();
    } catch (error) {
      console.error(error);
      alert('Failed to delete zone');
    }
  };

  //------------crop-variety-----------
  const fetchCropVarietyList = async () => {
    try {
      const cropVarieties = await getAllCropVarieties();
      setCropVarietyList(cropVarieties);
    } catch (error) {
      console.error(error);
      alert('Failed to load Crop Varieties');
    }
  };

  const handleOnEditCropVariety = async (id: number) => {
  try {
    const existingData = await getCropVarietyById(id);
    setEditVarietyData(existingData);
    setShowAddPopup(true);
  } catch (error) {
    console.error(error);
    alert('Failed to load crop variety details');
  }
};


  const handleOnDeleteCropVariety = async (id: number) => {
    try {
      await deleteCropVariety(id);
      fetchCropVarietyList();
    } catch (error) {
      console.error(error);
      alert('Failed to delete crop variety');
    }
  };

  const handleOnViewCropVariety = (data: CropVariety) => {
    setViewVarietyData(data);
  };


  //-------------market-price----------------
  const fetchMarketPriceList = async () => {
    try {
      const marketPrices = await getAllMarketPrice();
      setMarketPriceList(marketPrices);
    } catch (error) {
      console.error(error);
      alert('Failed to load Market Prices');
    }
  };

  const handleOnEditMarketPrice = async (id: number) => {
  try {
    console.log(id);
    const existingData = await getMarketPriceById(id);
    console.log(existingData);
    setEditMarketPriceData(existingData);
    setShowAddPopup(true);
  } catch (error) {
    console.error(error);
    alert('Failed to load market price');
  }
};


  const handleOnDeleteMarketPrice = async (id: number) => {
    try {
      await deleteMarketPrice(id);
      fetchMarketPriceList();
    } catch (error) {
      console.error(error);
      alert('Failed to delete market price');
    }
  };

  //Pop
  const handleOnAdd = () => {
  setEditVarietyData(null);
  setEditMarketPriceData(null);
  setShowAddPopup(true);
  };


  const handleClosePopup = () => {
    setShowAddPopup(false);
    setEditVarietyData(null);
    if (selectedOption === 'Crop') {
      fetchCropList();
    } else if (selectedOption === 'NPK') {
      fetchNpkScheduleList();
    } else if (selectedOption === 'Zone') {
      fetchZoneList();
    } else if (selectedOption === 'Variety') {
      fetchCropVarietyList();
    } else if (selectedOption === 'MarketPrice') {
      fetchMarketPriceList();
    }
  };

  return (
    <div className='admin-profile'>
      <div className='admin-navbar'>
        <AdminNavbar setSelectedOption={setSelectedOption} />
      </div>

      <div className='admin-body'>
        {selectedOption === 'Dashboard' && (
          <div className='section-container'>
            <DashboardStats {...dashboardStats} />
          </div>
        )}

        {selectedOption === 'Crop' && (
          <>
            <div className='admin-body-header'>
              <h2>Crop Content</h2>
              <Button title='Add Crop +' onClick={handleOnAdd} bgColor='var(--text-light)' textColor='var(--text-dark)' />
            </div>

            <div className='admin-body-content-grid-layout'>
              {cropList.map((crop) => (
                <CropCard key={crop.id} crop={crop} onEdit={handleOnEditCrop} onDelete={handleOnDeleteCrop} />
              ))}
            </div>

            {showAddPopup && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <AddCropForm />
                  <button onClick={handleClosePopup} className='close-btn'>X</button>
                </div>
              </div>
            )}
          </>
        )}

        {selectedOption === 'NPK' && (
          <>
            <div className='admin-body-header'>
              <h2>NPK Content</h2>
              <Button title='Add NPK Schedule +' onClick={handleOnAdd} bgColor='var(--text-light)' textColor='var(--text-dark)' />
            </div>

            <div className='admin-body-content'>
              <NpkTable npkList={npkList} onEdit={handleOnEditNpk} onDelete={handleOnDeleteNpk} />
            </div>

            {showAddPopup && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <AddNpkForm />
                  <button onClick={handleClosePopup} className='close-btn'>X</button>
                </div>
              </div>
            )}
          </>
        )}

        {selectedOption === 'Zone' && (
          <>
            <div className='admin-body-header'>
              <h2>Zone Content</h2>
              <Button title='Add Zone +' onClick={handleOnAdd} bgColor='var(--text-light)' textColor='var(--text-dark)' />
            </div>

            <div className='admin-body-content'>
              <ZoneTable zoneList={zoneList} onEdit={handleOnEditZone} onDelete={handleOnDeleteZone} />
            </div>

            {showAddPopup && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <AddZoneForm />
                  <button onClick={handleClosePopup} className='close-btn'>X</button>
                </div>
              </div>
            )}
          </>
        )}

        {selectedOption === 'Variety' && (
          <>
            <div className='admin-body-header'>
              <h2>Crop-Variety Content</h2>
              <Button title='Add Variety +' onClick={handleOnAdd} bgColor='var(--text-light)' textColor='var(--text-dark)' />
            </div>

            <div className='admin-body-content'>
              <CropVarietyTable
                cropVarietyList={cropVarietyList}
                onEdit={handleOnEditCropVariety}
                onDelete={handleOnDeleteCropVariety}
                onView={handleOnViewCropVariety}
              />
            </div>

            {showAddPopup && (
              <div className='modal-overlay'>
                <div className='modal-content-large'>
                  <AddVarietyForm existingData={editVarietyData || undefined} />
                  <button onClick={handleClosePopup} className='close-btn'>X</button>
                </div>
              </div>
            )}


            {viewVarietyData && (
              <CropVarietyDetail data={viewVarietyData} onClose={() => setViewVarietyData(null)} />
            )}
          </>
        )}


        {selectedOption === 'MarketPrice' && (
        <>
          <div className='admin-body-header'>
            <h2>Market-Price Content</h2>
            <Button title='Add Market Price +' onClick={handleOnAdd} bgColor='var(--text-light)' textColor='var(--text-dark)' />
          </div>

          <div className='admin-body-content'>
            <MarketPriceTable 
              marketPriceList={marketPriceList}
              onEdit={handleOnEditMarketPrice} 
              onDelete={handleOnDeleteMarketPrice}
              onAdd={handleOnAdd}
            />
          </div>

          {showAddPopup && (
            <div className='modal-overlay'>
              <div className='modal-content-large'>
                <AddMarketPriceForm existingData={editMarketPriceData || undefined} />
                <button onClick={handleClosePopup} className='close-btn'>X</button>
              </div>
            </div>
          )}
       </>
        )}

        {selectedOption === 'Subscribers' && (
          <>
            <div className='admin-body-header'>
              <h2>Subscribed Users Management</h2>
            </div>

            <div className='admin-body-content'>
              <SubscribedUsersList />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Profile;
