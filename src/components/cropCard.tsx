import './style/cropCard.css';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import '../constants/commonStyle.css'

interface CropCardProps {
  crop: {
    id: number;
    name: string;
  };
  onEdit: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}

function cropCard({ crop, onEdit, onDelete }: CropCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(crop.name);

  const handleSave = () => {
    if (newName.trim() && newName !== crop.name) {
      onEdit(crop.id, newName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(crop.name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${crop.name}"?`)) {
      onDelete(crop.id);
    }
  };

  return (
    <div className="crop-card">
      {isEditing ? (
        <input
          className="crop-edit-input"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          autoFocus
        />
      ) : (
        <span className="crop-name">{crop.name}</span>
      )}

      <div className="actions">
        {isEditing ? (
          <>
            <button className="edit-btn" onClick={handleSave}>
              <FaCheck />
            </button>
            <button className="delete-btn" onClick={handleCancel}>
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default cropCard;
