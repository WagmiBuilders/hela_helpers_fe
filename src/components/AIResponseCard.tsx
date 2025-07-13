// components/AIResponseCard.tsx
import React from 'react';
import './style/AIResponseCard.css'; // Optional styling

interface Props {
  response: string;
}

function AIResponseCard({ response }: Props) {
  if (!response) return null;

  return (
    <div className="ai-response-card">
      <h3>AI Suggestion Summary</h3>
      <p>{response}</p>
    </div>
  );
}

export default AIResponseCard;
