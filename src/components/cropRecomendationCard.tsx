import React, { useState } from "react";
import "./style/cropRecomendationCard.css";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; 


interface Props {
  data: any;
}

const cropRecommendationCard: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const { cropVariety, estimatedSeedPrice, estimatedFertilizerPrice, previousYearPriceAverages } = data;

  return (
    <>
      <div className="suggestion-card" onClick={() => setShowModal(true)}>
        <div className="card-row">
          <div className="card-top">
            <h3>{cropVariety.crop.name}</h3>
            <p className="sub">{cropVariety.variety}</p>

            <button
              className="download-btn"
              onClick={async (e) => {
                e.stopPropagation(); 
                setShowModal(true); 

                setTimeout(async () => {
                  const modalElement = document.querySelector(".modal");
                  if (!modalElement) return;

                  const canvas = await html2canvas(modalElement as HTMLElement);
                  const imgData = canvas.toDataURL("image/png");
                  const pdf = new jsPDF("p", "mm", "a4");

                  const imgProps = pdf.getImageProperties(imgData);
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                  pdf.save(`${cropVariety.crop.name}_${cropVariety.variety}.pdf`);
                }, 500); 
              }}
            >
              <FaDownload />
            </button>
          </div>

          <div className="card-bottom">
            <table>
                <tbody>
                <tr>
                    <td className="label">Yield</td>
                    <td className="value">{cropVariety.yieldKgPerHa} kg/ha</td>
                </tr>
                <tr>
                    <td className="label">Seed</td>
                    <td className="value">Rs {estimatedSeedPrice}</td>
                </tr>
                <tr>
                    <td className="label">Fertilizer</td>
                    <td className="value">Rs {estimatedFertilizerPrice}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        <div className="card-footer">Click to view full details →</div>
      </div>

      {showModal && (
        <div className="modal-overlay">
            <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h2>{cropVariety.crop.name} - {cropVariety.variety}</h2>

           
            <section>
                <h4>General Info</h4>
                <table className="detailed-table">
                <tbody>
                    <tr><td>Soil Compatibility</td><td>{cropVariety.soilCompatibility}</td></tr>
                    <tr><td>Maturity Days</td><td>{cropVariety.maturityDays}</td></tr>
                    <tr><td>Water Needs (mm)</td><td>{cropVariety.waterNeedsMm}</td></tr>
                    <tr><td>Seed Rate (kg/ha)</td><td>{cropVariety.seedRateKgPerHa}</td></tr>
                    <tr><td>Pest/Disease Index</td><td>{cropVariety.pestDiseaseIndex}</td></tr>
                    <tr><td>Rotation Options</td><td>{cropVariety.rotationOptions}</td></tr>
                </tbody>
                </table>
            </section>

          
            <section>
                <h4>NPK Schedule</h4>
                <table className="detailed-table">
                <tbody>
                    <tr><td>Name</td><td>{cropVariety.npkSchedule.name}</td></tr>
                    <tr><td>Nitrogen</td><td>{cropVariety.npkSchedule.nitrogen}</td></tr>
                    <tr><td>Phosphorus</td><td>{cropVariety.npkSchedule.phosphorus}</td></tr>
                    <tr><td>Potassium</td><td>{cropVariety.npkSchedule.potassium}</td></tr>
                </tbody>
                </table>
            </section>


            <section>
                <h4>Zone Fit</h4>
                {cropVariety.zoneFit.map((zone: any, i: number) => (
                <table className="detailed-table" key={i}>
                    <tbody>
                    <tr><td>Zone Code</td><td>{zone.zoneCode}</td></tr>
                    <tr><td>Avg Rainfall (mm)</td><td>{zone.avgRainfallMm}</td></tr>
                    <tr><td>Avg Temperature (°C)</td><td>{zone.avgTempC}</td></tr>
                    <tr><td>Soil Series</td><td>{zone.soilSeries}</td></tr>
                    <tr><td>Districts</td><td>{zone.districts.map((d: any) => d.name).join(", ")}</td></tr>
                    </tbody>
                </table>
                ))}
            </section>
         
            <section>
              <h4>Previous Year Prices</h4>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>District</th>
                    <th>Period</th>
                    <th>Farm Gate Price (Rs/kg)</th>
                    <th>Wholesale Price (Rs/kg)</th>
                    <th>Retail Price (Rs/kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {previousYearPriceAverages.map((price: any, i: number) => (
                    <tr key={i}>
                      <td>{price.district}</td>
                      <td>{price.start} to {price.end}</td>
                      <td>{price.farmGatePriceLkrPerKg}</td>
                      <td>{price.wholesalePriceLkrPerKg}</td>
                      <td>{price.retailPriceLkrPerKg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            </div>
        </div>
        )}

    </>
  );
};

export default cropRecommendationCard;
