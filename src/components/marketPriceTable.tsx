import './style/marketPriceTable.css';
import { FaEdit, FaTrash} from 'react-icons/fa';
import '../constants/commonStyle.css'

interface MarketPriceEntry {
  id: number; 
  cropVarietyId: number;
  cropVarietyName: string;
  date: string;
  district: string;
  farmGatePriceLkrPerKg: number;
  wholesalePriceLkrPerKg: number;
  retailPriceLkrPerKg: number;
}


interface Props {
  marketPriceList: MarketPriceEntry[];
  onEdit: (id: number, data: MarketPriceEntry) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

function marketPriceTable({ marketPriceList, onEdit, onDelete}: Props) {
  return (
    <div className="table-container">
      <table className="market-price-table">
        <thead>
          <tr>
            <th>Crop Variety</th>
            <th>Date</th>
            <th>District</th>
            <th>Farm Gate Price (LKR/Kg)</th>
            <th>Wholesale Price (LKR/Kg)</th>
            <th>Retail Price (LKR/Kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marketPriceList.map((entry) => (
            <tr key={entry.id}>
                    <td>{entry.cropVarietyName}</td>
                    <td>{entry.date}</td>
                    <td>{entry.district}</td>
                    <td>{entry.farmGatePriceLkrPerKg}</td>
                    <td>{entry.wholesalePriceLkrPerKg}</td>
                    <td>{entry.retailPriceLkrPerKg}</td>
                    <td className='actions'>
                      <FaEdit title='Edit' onClick={() => onEdit(entry.id, entry)} className='edit-btn' />
                      <FaTrash title='Delete' onClick={() => onDelete(entry.id)} className='delete-btn' />
                    </td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default marketPriceTable;
