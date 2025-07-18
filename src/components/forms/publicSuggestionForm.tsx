import { useState, useEffect } from "react";
import "../style/publicSuggestionForm.css";
import Button from "../button";
import "../../constants/colors.css";
import {
  getCropSuggestion,
  getAllDistricts,
  getAllSoilType,
} from "../../services/publicService";

interface Props {
  onSuggest: (data: any[]) => void;
  onAiResponse: (data: string) => void;
  showAIResponse: boolean;
  setShowAIResponse: (data: boolean) => void;
}

function PublicSuggestionForm({
  onSuggest,
  onAiResponse,
  showAIResponse,
  setShowAIResponse,
}: Props) {
  const [formData, setFormData] = useState({
    district: "",
    soilType: "",
    cultivableArea: "",
    budget: "",
    irrigationCapacity: "",
  });

  const [districtOptions, setDistrictOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [soilTypeOptions, setSoilTypeOptions] = useState<string[]>([]);
  const [showAIButton, setShowAIButton] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["cultivableArea", "budget", "irrigationCapacity"].includes(name)
        ? parseFloat(value)
        : value,
    }));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const districts = await getAllDistricts();
        const soilTypes = await getAllSoilType();
        setDistrictOptions(districts);
        setSoilTypeOptions(soilTypes);
      } catch (err) {
        console.error("Error loading options:", err);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("request: ", formData);
    try {
      const result = await getCropSuggestion(formData);
      if (result.airesponse) {
        onAiResponse(result.airesponse);
        setShowAIButton(true)
      }
      onSuggest(result);
    } catch (err) {
      alert("Error fetching suggestions.");
      console.error(err);
    }
  };

  return (
    <div>
      <p className="form-title">Enter Your Farming Conditions Below</p>
      <form className="suggestion-form" onSubmit={handleSubmit}>
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">Select District</option>
          {districtOptions.map((district) => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>

        <select
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          required
        >
          <option value="">Select Soil Type</option>
          {soilTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="cultivableArea"
          value={formData.cultivableArea}
          onChange={handleChange}
          placeholder="Cultivable Area (in acres)"
          required
        />
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget (in LKR)"
          required
        />
        <input
          type="number"
          name="irrigationCapacity"
          value={formData.irrigationCapacity}
          onChange={handleChange}
          placeholder="Irrigation Capacity (L/day)"
          required
        />

        <div className="form-button">
          <Button
            onClick={() => {}}
            title="Get Suggestion"
            type="submit"
            bgColor="var(--bg-darkGreen)"
            textColor="var(--text-light)"
          />
        </div>
      </form>
      {showAIButton && (
        <div className="show-ai-button">
          <Button
            onClick={() => {
              setShowAIResponse(true);
            }}
            title="Show AI Response"
            type="button"
            style={{
              backgroundColor: "var(--bg-darkGreen)",
              color: "var(--text-light)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PublicSuggestionForm;
