import "./style/publicSuggestionPage.css";
import PublicSuggestionForm from "../components/forms/publicSuggestionForm";
import CropRecommendationCard from "../components/cropRecomendationCard";
import { useState } from "react";
import AIResponseCard from "../components/AIResponseCard";

function publicSuggestionPage() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [showAIResponse, setShowAIResponse] = useState<boolean>(false);
  const handleOnSuggestion = (data: any[]) => {
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
      {/* {aiResponse && (
        <button className="show-ai-btn" onClick={() => setShowAIResponse(true)}>
          View AI Suggestion
        </button>
      )} */}
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
        {suggestions["cropSuggestions"] &&
        suggestions["cropSuggestions"].length > 0 ? (
          suggestions["cropSuggestions"].map((item, index) => (
            <CropRecommendationCard key={index} data={item} />
          ))
        ) : (
          <p className="no-suggestion">No suggestions yet.</p>
        )}
      </div>
    </div>
  );
}

export default publicSuggestionPage;
