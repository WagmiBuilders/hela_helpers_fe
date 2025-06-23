import './style/publicSuggestionPage.css'
import PublicSuggestionForm from '../components/forms/publicSuggestionForm'
import CropRecommendationCard from '../components/cropRecomendationCard'
import { useState } from 'react'
import { testRecommendation } from '../constants/dummyData';


function publicSuggestionPage() {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleOnSuggestion = (data: any[]) => {
     setSuggestions(data);
  }
  return (
    <div className='public-suggestion'>
        <div className='request'>
           <PublicSuggestionForm onSuggest={handleOnSuggestion}/>
        </div>
        <div className='response'>
          {suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <CropRecommendationCard key={index} data={item} />
          ))
        ) : (
          <p className='no-suggestion'>No suggestions yet.</p>
        )}
        <CropRecommendationCard data={testRecommendation}/>
        </div>
    </div>
  )
}

export default publicSuggestionPage