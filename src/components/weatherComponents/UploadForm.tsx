import React, {useState, type FormEvent} from 'react';
import {useThunk} from "../../hooks/useThunk";
import {uploadWeatherData} from "../../store/store.tsx";

interface WeatherFormData {
    date: string;
    location: string;
    minTemp: string;
    maxTemp: string;
    rainfall: string;
    evaporation: string;
    sunshine: string;
    windGustDir: string;
    windGustSpeed: string;
    windDir9am: string;
    windDir3pm: string;
    windSpeed9am: string;
    windSpeed3pm: string;
    humidity9am: string;
    humidity3pm: string;
    pressure9am: string;
    pressure3pm: string;
    cloud9am: string;
    cloud3pm: string;
    temp9am: string;
    temp3pm: string;
    rainToday: 'Yes' | 'No';
    rainTomorrow: 'Yes' | 'No';
}

const initialState: WeatherFormData = {
    date: '',
    location: '',
    minTemp: '',
    maxTemp: '',
    rainfall: '',
    evaporation: '',
    sunshine: '',
    windGustDir: '',
    windGustSpeed: '',
    windDir9am: '',
    windDir3pm: '',
    windSpeed9am: '',
    windSpeed3pm: '',
    humidity9am: '',
    humidity3pm: '',
    pressure9am: '',
    pressure3pm: '',
    cloud9am: '',
    cloud3pm: '',
    temp9am: '',
    temp3pm: '',
    rainToday: 'No',
    rainTomorrow: 'No',
};

const placeholders: Partial<Record<keyof WeatherFormData, string>> = {
    date: 'e.g., 2023-01-01',
    location: 'e.g., Sydney',
    minTemp: 'Minimum Temperature °C',
    maxTemp: 'Maximum Temperature °C',
    rainfall: 'Rainfall mm',
    evaporation: 'Evaporation mm',
    sunshine: 'Sunshine hours',
    windGustDir: 'e.g., SE',
    windGustSpeed: 'Speed in km/h',
    windDir9am: 'e.g., E',
    windDir3pm: 'e.g., SE',
    windSpeed9am: 'Speed in km/h',
    windSpeed3pm: 'Speed in km/h',
    humidity9am: 'Percentage %',
    humidity3pm: 'Percentage %',
    pressure9am: 'Pressure hPa',
    pressure3pm: 'Pressure hPa',
    cloud9am: 'Cloud cover 0–8',
    cloud3pm: 'Cloud cover 0–8',
    temp9am: 'Temperature °C',
    temp3pm: 'Temperature °C',
};

const WeatherUploadForm: React.FC = () => {
    const [form, setForm] = useState<WeatherFormData>(initialState);
    const [status, setStatus] = useState<string | null>(null);
    const [doUpload, isUploading, uploadError] = useThunk(uploadWeatherData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(null); // Clear any previous status

        const result = await doUpload({
            Date: form.date,
            Location: form.location,
            MinTemp: parseFloat(form.minTemp),
            MaxTemp: parseFloat(form.maxTemp),
            Rainfall: parseFloat(form.rainfall),
            Evaporation: parseFloat(form.evaporation),
            Sunshine: parseFloat(form.sunshine),
            WindGustDir: form.windGustDir,
            WindGustSpee: parseFloat(form.windGustSpeed),
            WindDir9am: form.windDir9am,
            WindDir3pm: form.windDir3pm,
            WindSpeed9am: parseFloat(form.windSpeed9am),
            WindSpeed3pm: parseFloat(form.windSpeed3pm),
            Humidity9am: parseFloat(form.humidity9am),
            Humidity3pm: parseFloat(form.humidity3pm),
            Pressure9am: parseFloat(form.pressure9am),
            Pressure3pm: parseFloat(form.pressure3pm),
            Cloud9am: parseFloat(form.cloud9am),
            Cloud3pm: parseFloat(form.cloud3pm),
            Temp9am: parseFloat(form.temp9am),
            Temp3pm: parseFloat(form.temp3pm),
            RainToday: form.rainToday,
            RainTomorrow: form.rainTomorrow,
        });

        if (result) {
            setStatus('✅ Upload successful!');
        } else if (uploadError) {
            const { code, message, data } = result.error || {};
            setStatus(`❌ [${code || 'ERR'}] ${message}${data ? `: ${data}` : ''}`);
            console.error('Detailed upload error:', result.error);
        } else {
            setStatus('❌ Unknown error occurred.');
        }
    };


    return (
        <div className="p-6 bg-white mx-auto rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Weather Data Upload</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4">
                {Object.entries(form).map(([key, value]) => {
                    const fieldKey = key as keyof WeatherFormData;
                    return fieldKey === 'rainToday' || fieldKey === 'rainTomorrow' ? (
                        <div key={key} className="flex flex-col">
                            <label className="font-medium capitalize">{key}</label>
                            <select
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    ) : (
                        <div key={key} className="flex flex-col">
                            <label className="font-medium capitalize">{key}</label>
                            <input
                                type={key === 'date' ? 'date' : 'text'}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="border p-2 rounded"
                                placeholder={placeholders[fieldKey] || ''}
                            />
                        </div>
                    );
                })}
                <div className="col-span-6 flex items-center gap-4 mt-4">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`px-6 py-2 rounded text-white font-semibold flex items-center gap-2
                        ${isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                        `}>
                        {isUploading && (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        )}
                        {isUploading ? 'Uploading...' : 'Upload Row'}
                    </button>
                    {status && (
                        <span
                            className={`text-sm ${
                                status.startsWith('✅')
                                    ? 'text-green-700'
                                    : status.startsWith('❌')
                                        ? 'text-red-600'
                                        : 'text-gray-700'
                            }`}>{status}</span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default WeatherUploadForm;
