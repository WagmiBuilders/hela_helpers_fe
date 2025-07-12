export interface WeatherData {
    date: string;
    location: string;
    minTemp: number;
    maxTemp: number;
    rainfall: number;
}

export interface TrainResponse {
    message: string;
    test_accuracy: number;
    training_accuracy?: number;
    test_precision?: number;
    test_recall?: number;
}

export interface ForecastEntry {
    date: string;
    rain_predicted: boolean;
    confidence: number;
}

export interface PredictResponse {
    location: string;
    forecast: ForecastEntry[];
}

const BASE = '/admin/weather';

export async function uploadRow(payload: WeatherData): Promise<void> {
    const res = await fetch(`${BASE}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Upload failed');
}

export async function trainModel(): Promise<TrainResponse> {
    const res = await fetch(`${BASE}/train`, { method: 'POST' });
    if (!res.ok) throw new Error('Training failed');
    return res.json();
}

export async function predict(location: string): Promise<PredictResponse> {
    const res = await fetch(`${BASE}/predict?location=${encodeURIComponent(location)}`);
    if (!res.ok) throw new Error('Prediction failed');
    return res.json();
}
