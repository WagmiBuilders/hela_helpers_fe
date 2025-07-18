import { useState, type FormEvent, type ChangeEvent } from 'react';
import {type ForecastEntry} from "../../utils/api.ts";
import {useThunk} from "../../hooks/useThunk.ts";
import {predict} from "../../store/thunks/weatherThunks.ts";

export default function PredictSection() {
    const [location, setLocation] = useState('');
    const [forecast, setForecast] = useState<ForecastEntry[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [doPredict, isPredicting] = useThunk(predict);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setForecast(null);
        setLocation('');

        try {
            const response = await doPredict(location);
            if (response) {
                setForecast(response.forecast);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Prediction failed:', err);
                setError(err.message || 'An error occurred during prediction');
            } else {
                console.error('Prediction failed with unknown error:', err);
                setError('An unknown error occurred during prediction');
            }
        }

    };

    return (
        <div className="rounded-xl bg-white shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Predict rainfall (7 days)</h2>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    value={location}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="flex-1 border rounded px-3 py-2"
                    required
                />
                <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                    disabled={isPredicting}
                >
                    {isPredicting ? 'Predicting…' : 'Predict'}
                </button>
            </form>

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            {forecast && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Rain?</th>
                            <th className="px-4 py-2 text-left">Confidence</th>
                        </tr>
                        </thead>
                        <tbody>
                        {forecast.map((f) => (
                            <tr key={f.date} className="border-b">
                                <td className="px-4 py-2">{f.date}</td>
                                <td className="px-4 py-2">{f.rain_predicted ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-2">{(f.confidence * 100).toFixed(1)}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
