import "./style/publicSuggestionPage.css";
import PublicSuggestionForm from "../components/forms/publicSuggestionForm";
import CropRecommendationCard from "../components/cropRecomendationCard";
import { useState } from "react";
import AIResponseCard from "../components/AIResponseCard";

// ---- Types ----

export interface District {
    name: string;
}

export interface ZoneFit {
    zoneCode: string;
    avgRainfallMm: number;
    avgTempC: number;
    soilSeries: string;
    districts: District[];
}

export interface NpkSchedule {
    name: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
}

export interface Crop {
    name: string;
}

export interface CropVariety {
    crop: Crop;
    variety: string;
    yieldKgPerHa: number;
    soilCompatibility: string;
    maturityDays: number;
    waterNeedsMm: number;
    seedRateKgPerHa: number;
    pestDiseaseIndex: string;
    rotationOptions: string;
    npkSchedule: NpkSchedule;
    zoneFit: ZoneFit[];
}

export interface PriceAverage {
    district: string;
    start: string;   // ISO date string
    end: string;     // ISO date string
    farmGatePriceLkrPerKg: number;
    wholesalePriceLkrPerKg: number;
    retailPriceLkrPerKg: number;
}

interface CropRecommendation {
    cropVariety: CropVariety;
    estimatedSeedPrice: number;
    estimatedFertilizerPrice: number;
    previousYearPriceAverages: PriceAverage[];
}

export interface SuggestionPayload {
    cropSuggestions: CropRecommendation[];
}

function PublicSuggestionPage() {
    const [suggestions, setSuggestions] = useState<SuggestionPayload | null>(null);
    const [aiResponse, setAiResponse] = useState<string>("");
    const [showAIResponse, setShowAIResponse] = useState<boolean>(false);

    const handleOnSuggestion = (data: SuggestionPayload) => {
        setSuggestions(data);
    };

    const handleAISuggestion = (data: string) => {
        setAiResponse(data);
    };

    return (
        <div className="public-suggestion">
            <div className="request">
                <PublicSuggestionForm
                    onAiResponse={handleAISuggestion}
                    onSuggest={handleOnSuggestion}
                    setShowAIResponse={setShowAIResponse}
                    showAIResponse={showAIResponse}
                />
            </div>

            {showAIResponse && (
                <div className="ai-response-overlay">
                    <div className="ai-response-modal">
                        <button
                            className="close-btn"
                            onClick={() => setShowAIResponse(false)}
                        >
                            ×
                        </button>
                        <AIResponseCard response={aiResponse} />
                    </div>
                </div>
            )}

            <div className="response">
                {suggestions?.cropSuggestions?.length ? (
                    suggestions.cropSuggestions.map((item, index) => (
                        <CropRecommendationCard key={index} data={item} />
                    ))
                ) : (
                    <p className="no-suggestion">No suggestions yet.</p>
                )}
            </div>
        </div>
    );
}

export default PublicSuggestionPage;
