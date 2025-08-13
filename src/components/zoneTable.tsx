import './style/zoneTable.css';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import '../constants/commonStyle.css'

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

interface Props {
  zoneList: Zone[];
  onEdit: (id: number, updatedZone: Zone) => void;
  onDelete: (id: number) => void;
}

function ZoneTable({ zoneList, onEdit, onDelete }: Props) {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredZones, setFilteredZones] = useState<Zone[]>(zoneList);
  const [allDistricts, setAllDistricts] = useState<string[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Zone | null>(null);

  useEffect(() => {
    const uniqueDistricts = Array.from(
      new Set(zoneList.flatMap((zone) => zone.districts.map((d) => d.name)))
    );
    setAllDistricts(uniqueDistricts);
  }, [zoneList]);

  useEffect(() => {
    if (selectedDistrict === '') {
      setFilteredZones(zoneList);
    } else {
      const result = zoneList.filter((zone) =>
      zone.districts.some((d) => d.name === selectedDistrict)
      );
      setFilteredZones(result);
    }
  }, [selectedDistrict, zoneList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name.includes("Rainfall") || name.includes("Temp")
        ? parseFloat(value)
        : value,
    });
  };

  const handleSave = () => {
    if (editData) {
      onEdit(editData.id, editData);
      setEditId(null);
      setEditData(null);
    }
  };

  return (
    <div className="table-container">
      <div className="filter-bar">
        <label>Filter by District:</label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">All</option>
          {allDistricts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <table className="zone-table">
        <thead>
          <tr>
            <th>Zone Code</th>
            <th>Avg Rainfall (mm)</th>
            <th>Avg Temp (°C)</th>
            <th>Soil Series</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredZones.map((zone) => (
            <tr key={zone.id}>
              <td>
                {editId === zone.id ? (
                  <input
                    name="zoneCode"
                    value={editData?.zoneCode || ''}
                    onChange={handleChange}
                  />
                ) : (
                  zone.zoneCode
                )}
              </td>
              <td>
                {editId === zone.id ? (
                  <input
                    name="avgRainfallMm"
                    type="number"
                    value={editData?.avgRainfallMm || ''}
                    onChange={handleChange}
                  />
                ) : (
                  zone.avgRainfallMm
                )}
              </td>
              <td>
                {editId === zone.id ? (
                  <input
                    name="avgTempC"
                    type="number"
                    step="0.1"
                    value={editData?.avgTempC || ''}
                    onChange={handleChange}
                  />
                ) : (
                  zone.avgTempC
                )}
              </td>
              <td>
                {editId === zone.id ? (
                  <input
                    name="soilSeries"
                    value={editData?.soilSeries || ''}
                    onChange={handleChange}
                  />
                ) : (
                  zone.soilSeries
                )}
              </td>
              <td className="actions">
                {editId === zone.id ? (
                    <>
                    <button onClick={handleSave} className='save-btn'>
                        <FaSave />
                    </button>
                    <button
                        className='edit-btn'
                        onClick={() => {
                        setEditId(null);
                        setEditData(null);
                        }}
                    >
                        <FaTimes />
                    </button>
                    </>
                ) : (
                    <>
                    <button
                        className='edit-btn'
                        onClick={() => {
                        setEditId(zone.id);
                        setEditData({ ...zone });
                        }}
                    >
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(zone.id)} className='delete-btn'>
                        <FaTrash />
                    </button>
                    </>
                )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ZoneTable;
