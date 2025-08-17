import { useState, type FormEvent, type ChangeEvent } from 'react';
import { type ForecastEntry } from "../../utils/api.ts";
import { useThunk } from "../../hooks/useThunk.ts";
import { predict } from "../../store/thunks/weatherThunks.ts";

export default function PredictSection() {
    const [location, setLocation] = useState('');
    const [submittedLocation, setSubmittedLocation] = useState('');
    const [forecast, setForecast] = useState<ForecastEntry[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [doPredict, isPredicting] = useThunk(predict);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setForecast(null);

        const loc = location.trim();
        setSubmittedLocation(loc);

        try {
            const response = await doPredict(loc);
            if (response) {
                setForecast(response.forecast);
                setIsOpen(true);
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

    const closeModal = () => {
        setIsOpen(false);
        setForecast(null);
    };

    const fmtPretty = (isoDate: string) => {
        const d = new Date(isoDate);
        return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const fmtPercent = (v: number) => `${(v * 100).toFixed(1)}%`;

    return (
        <div className="rounded-xl bg-white shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Predict rainfall (7 days)</h2>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Modal */}
            {isOpen && forecast && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

                    {/* Panel */}
                    <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200">
                        {/* Header */}
                        <div className="flex items-center gap-2 px-5 pt-5">
                            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-purple-600 text-lg">☁️</span>
                            </div>
                            <h3 className="text-lg font-semibold">Predict Successful</h3>
                        </div>
                        <p className="px-5 text-sm text-gray-600 mt-1 mb-3">
                            Weather prediction completed for <span className="font-semibold">{submittedLocation || '—'}</span>
                        </p>

                        {/* Body */}
                        <div className="px-5">
                            <h4 className="text-sm font-semibold text-purple-700 mb-2">7-Day Forecast:</h4>

                            <div className="max-h-80 overflow-y-auto pr-1">
                                {forecast.map((f) => {
                                    const rain = f.rain_predicted;
                                    return (
                                        <div
                                            key={f.date}
                                            className="flex items-center justify-between gap-3 py-3 border-b last:border-b-0"
                                        >
                                            {/* Left: date */}
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-gray-900">{fmtPretty(f.date)}</div>
                                                <div className="text-xs text-gray-500">{f.date}</div>
                                            </div>

                                            {/* Middle: pill */}
                                            <div className="flex items-center gap-2 shrink-0">
                        <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
                          ${rain ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'}`}
                        >
                          <span className={`h-2 w-2 rounded-full ${rain ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                            {rain ? 'Rain' : 'No Rain'}
                        </span>
                                            </div>

                                            {/* Right: confidence */}
                                            <div className="text-right shrink-0">
                                                <div className="text-sm text-gray-800">{fmtPercent(f.confidence)}</div>
                                                <div className="text-[11px] text-gray-500">confidence</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Note */}
                            <div className="mt-4 mb-5 rounded-lg bg-purple-50 text-purple-800 text-xs px-3 py-3">
                                <span className="font-semibold">Note:</span> Confidence values represent the model&apos;s certainty in the prediction.
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end px-5 pb-5">
                            <button
                                onClick={closeModal}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


// import { useState, type FormEvent, type ChangeEvent } from 'react';
// import {type ForecastEntry} from "../../utils/api.ts";
// import {useThunk} from "../../hooks/useThunk.ts";
// import {predict} from "../../store/thunks/weatherThunks.ts";
//
// export default function PredictSection() {
//     const [location, setLocation] = useState('');
//     const [forecast, setForecast] = useState<ForecastEntry[] | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [doPredict, isPredicting] = useThunk(predict);
//
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setForecast(null);
//         setLocation('');
//
//         try {
//             const response = await doPredict(location);
//             if (response) {
//                 setForecast(response.forecast);
//             }
//         } catch (err: unknown) {
//             if (err instanceof Error) {
//                 console.error('Prediction failed:', err);
//                 setError(err.message || 'An error occurred during prediction');
//             } else {
//                 console.error('Prediction failed with unknown error:', err);
//                 setError('An unknown error occurred during prediction');
//             }
//         }
//
//     };
//
//     return (
//         <div className="rounded-xl bg-white shadow-lg p-6 border border-gray-200">
//             <h2 className="text-xl font-semibold mb-4">Predict rainfall (7 days)</h2>
//             <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
//                 <input
//                     value={location}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
//                     placeholder="Location"
//                     className="flex-1 border rounded px-3 py-2"
//                     required
//                 />
//                 <button
//                     className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
//                     disabled={isPredicting}
//                 >
//                     {isPredicting ? 'Predicting…' : 'Predict'}
//                 </button>
//             </form>
//
//             {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
//
//             {forecast && (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm">
//                         <thead>
//                         <tr className="bg-gray-100">
//                             <th className="px-4 py-2 text-left">Date</th>
//                             <th className="px-4 py-2 text-left">Rain?</th>
//                             <th className="px-4 py-2 text-left">Confidence</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {forecast.map((f) => (
//                             <tr key={f.date} className="border-b">
//                                 <td className="px-4 py-2">{f.date}</td>
//                                 <td className="px-4 py-2">{f.rain_predicted ? 'Yes' : 'No'}</td>
//                                 <td className="px-4 py-2">{(f.confidence * 100).toFixed(1)}%</td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }
