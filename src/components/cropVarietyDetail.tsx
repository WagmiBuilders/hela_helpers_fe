import './style/cropVarietyDetail.css';
import '../constants/commonStyle.css';

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
  districts: District[];
}

interface NpkSchedule {
  id: number;
  name: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface Crop {
  id: number;
  name: string;
}

interface VarietyData {
  id: number;
  crop: Crop;
  variety: string;
  soilCompatibility: string;
  maturityDays: number;
  waterNeedsMm: number;
  yieldKgPerHa: number;
  pestDiseaseIndex: number;
  rotationOptions: string[] | string;
  seedRateKgPerHa: number;
  zoneFit: Zone[];
  npkSchedule: NpkSchedule;
}

interface Props {
  data: VarietyData;
  onClose: () => void;
}

function cropVarietyDetail({ data, onClose }: Props) {
  const rotations = Array.isArray(data.rotationOptions)
    ? data.rotationOptions
    : [data.rotationOptions];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data.variety} - Details</h2>

        <table className="detail-table">
          <tbody>
            <tr>
              <th>Crop</th>
              <td>{data.crop.name}</td>
            </tr>
            <tr>
              <th>Soil Compatibility</th>
              <td>{data.soilCompatibility}</td>
            </tr>
            <tr>
              <th>Maturity Days</th>
              <td>{data.maturityDays}</td>
            </tr>
            <tr>
              <th>Water Needs (mm)</th>
              <td>{data.waterNeedsMm}</td>
            </tr>
            <tr>
              <th>Yield (Kg/Ha)</th>
              <td>{data.yieldKgPerHa}</td>
            </tr>
            <tr>
              <th>Pest/Disease Index</th>
              <td>{data.pestDiseaseIndex}</td>
            </tr>
            <tr>
              <th>Seed Rate (Kg/Ha)</th>
              <td>{data.seedRateKgPerHa}</td>
            </tr>
            <tr>
              <th>Rotation Options</th>
              <td>
                <ul>
                  {rotations.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Zone Fit</h3>
        <table className="zone-table">
          <thead>
            <tr>
              <th>Zone Code</th>
              <th>Soil Series</th>
              <th>Avg Temp (°C)</th>
              <th>Avg Rainfall (mm)</th>
              <th>Districts</th>
            </tr>
          </thead>
          <tbody>
            {data.zoneFit.map((zone, idx) => (
              <tr key={idx}>
                <td>{zone.zoneCode}</td>
                <td>{zone.soilSeries}</td>
                <td>{zone.avgTempC}</td>
                <td>{zone.avgRainfallMm}</td>
                <td>{zone.districts.map(d => d.name).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>NPK Schedule</h3>
        <table className="npk-table">
          <tbody>
            <tr><th>Name</th><td>{data.npkSchedule.name}</td></tr>
            <tr><th>Nitrogen</th><td>{data.npkSchedule.nitrogen}</td></tr>
            <tr><th>Phosphorus</th><td>{data.npkSchedule.phosphorus}</td></tr>
            <tr><th>Potassium</th><td>{data.npkSchedule.potassium}</td></tr>
          </tbody>
        </table>

        <button onClick={onClose} className="close-btn">X</button>
      </div>
    </div>
  );
}

export default cropVarietyDetail;
