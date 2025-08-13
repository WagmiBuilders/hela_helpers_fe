import { useState } from 'react';
import './style/npkTable.css';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import '../constants/commonStyle.css'

interface Npk {
  id: number;
  name: string;
  potassium: number;
  nitrogen: number;
  phosphorus: number;
}

interface Props {
  npkList: Npk[];
  onEdit: (id: number, updatedData: Npk) => void;
  onDelete: (id: number) => void;
}

function NpkTable({ npkList,  onEdit, onDelete }: Props) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Npk | null>(null);

  const handleEditClick = (npk: Npk) => {
    setEditId(npk.id);
    setEditData({ ...npk });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === 'name' ? value : parseFloat(value),
    });
  };

  const handleSave = async () => {
    if (editData) {
      await onEdit(editData.id, editData);
      setEditId(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData(null);
  };

  return (
    <div className="npk-table table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Potassium</th>
            <th>Nitrogen</th>
            <th>Phosphorus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {npkList.map((npk) => (
            <tr key={npk.id}>
              <td>
                {editId === npk.id ? (
                  <input
                    name="name"
                    value={editData?.name || ''}
                    onChange={handleChange}
                  />
                ) : (
                  npk.name
                )}
              </td>
              <td>
                {editId === npk.id ? (
                  <input
                    name="potassium"
                    type="number"
                    value={editData?.potassium || ''}
                    onChange={handleChange}
                  />
                ) : (
                  npk.potassium
                )}
              </td>
              <td>
                {editId === npk.id ? (
                  <input
                    name="nitrogen"
                    type="number"
                    value={editData?.nitrogen || ''}
                    onChange={handleChange}
                  />
                ) : (
                  npk.nitrogen
                )}
              </td>
              <td>
                {editId === npk.id ? (
                  <input
                    name="phosphorus"
                    type="number"
                    value={editData?.phosphorus || ''}
                    onChange={handleChange}
                  />
                ) : (
                  npk.phosphorus
                )}
              </td>
              <td className="actions">
                {editId === npk.id ? (
                  <>
                    <button onClick={handleSave} title="Save" className='save-btn'>
                      <FaSave />
                    </button>
                    <button onClick={handleCancel} title="Cancel" className='cancel-btn'>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(npk)} title="Edit" className='edit-btn'>
                      <FaEdit />
                    </button>
                    <button
                      className='delete-btn'
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete "${npk.name}"?`
                          )
                        ) {
                          onDelete(npk.id);
                        }
                      }}
                      title="Delete"
                    >
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

export default NpkTable;
