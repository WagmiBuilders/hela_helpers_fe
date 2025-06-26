import './style/cropVarietyTable.css';
import { FaEdit, FaTrash, FaEye} from 'react-icons/fa';
import '../constants/commonStyle.css'

interface CropVariety {
  id: number;
  variety: string;
  soilCompatibility: string;
  maturityDays: number;
  waterNeedsMm: number;
  yieldKgPerHa: number;
  pestDiseaseIndex: number;
  rotationOptions: string;
  seedRateKgPerHa: number;
}

interface Props {
  cropVarietyList: CropVariety[];
  onEdit: (id: number, data: CropVariety) => void;
  onDelete: (id: number) => void;
  onView: (data: CropVariety) => void;
}

function CropVarietyTable({ cropVarietyList, onEdit, onDelete, onView }: Props) {
  return (
    <div className="crop-variety-table-wrapper table-container">
      <table className="crop-variety-table">
        <thead>
          <tr>
            <th className="sticky-col left">Variety</th>
            <th>Soil</th>
            <th>Maturity</th>
            <th>Water</th>
            <th>Yield</th>
            <th>Pest Index</th>
            <th>Rotation</th>
            <th>Seed Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cropVarietyList.map((v) => (
            <tr key={v.id}>
              <td className="sticky-col left">{v.variety}</td>
              <td>{v.soilCompatibility}</td>
              <td>{v.maturityDays}</td>
              <td>{v.waterNeedsMm}</td>
              <td>{v.yieldKgPerHa}</td>
              <td>{v.pestDiseaseIndex}</td>
              <td>{v.rotationOptions}</td>
              <td>{v.seedRateKgPerHa}</td>
              <td className="sticky-col right action-buttons actions">
                <FaEye title="View" onClick={() => onView(v)} className='view-btn' />
                <FaEdit title="Edit" onClick={() => onEdit(v.id, v)} className='edit-btn' />
                <FaTrash title="Delete" onClick={() => onDelete(v.id)} className='delete-btn' />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CropVarietyTable;
