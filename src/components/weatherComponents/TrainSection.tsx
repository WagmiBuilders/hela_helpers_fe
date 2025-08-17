import { useState } from 'react';
import {type TrainResponse} from "../../utils/api.ts";
import {trainModel} from "../../store/store.tsx";
import {useThunk} from "../../hooks/useThunk.ts";

export default function TrainSection() {
    const [metrics, setMetrics] = useState<TrainResponse | null>(null);
    const [lastTrained, setLastTrained] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [doTrain, isTraining] = useThunk(trainModel);

    const handleTrain = async () => {
        setError(null);
        setMetrics(null);
        setLastTrained(null);

        try {
            const response = await doTrain();
            if (response) {
                setMetrics(response);
                setLastTrained(new Date());
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Training failed:', err);
                setError(err.message);
            } else {
                console.error('Training failed with unknown error:', err);
                setError('An unknown error occurred during training');
            }
        }

    };

    return (
        <div className="rounded-xl bg-white shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Train model</h2>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    onClick={handleTrain}
                    disabled={isTraining}
                >
                    {isTraining ? 'Training…' : 'Train'}
                </button>
            </div>

            {lastTrained && (
                <p className="text-sm text-gray-600">
                    Last trained: {lastTrained.toLocaleString()}
                </p>
            )}

            {metrics && (
                <div className="grid grid-cols-1 gap-4 text-sm">
                    {Object.entries(metrics).map(([k, v]) => (
                        <div key={k} className="border rounded p-2">
                            <span className="font-medium">{k.replace('_', ' ')}:</span> {v}
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
}
