import { createAsyncThunk } from '@reduxjs/toolkit';

export interface StandardResponse<T = unknown> {
    code: number;
    status: 'Success' | 'Error';
    data: T;
}

export type UploadWeatherDataResponse = StandardResponse<string>;

export const uploadWeatherData = createAsyncThunk<
    UploadWeatherDataResponse, // response type (update as needed)
    {
        Date: string;
        Location: string;
        MinTemp: number;
        MaxTemp: number;
        Rainfall: number;
        Evaporation: number;
        Sunshine: number;
        WindGustDir: string;
        WindGustSpee: number;
        WindDir9am: string;
        WindDir3pm: string;
        WindSpeed9am: number;
        WindSpeed3pm: number;
        Humidity9am: number;
        Humidity3pm: number;
        Pressure9am: number;
        Pressure3pm: number;
        Cloud9am: number;
        Cloud3pm: number;
        Temp9am: number;
        Temp3pm: number;
        RainToday: 'Yes' | 'No';
        RainTomorrow: 'Yes' | 'No';
    },
    {
        rejectValue: {
            code?: number;
            message: string;
            data?: unknown;
        };
    }
>(
    'weather/uploadWeatherData',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8084/admin/weather/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);

                console.error('❌ Upload failed:', {
                    code: response.status,
                    message: errorBody?.message || response.statusText,
                    data: errorBody?.data || errorBody,
                });

                return rejectWithValue({
                    code: response.status,
                    message: errorBody?.message || 'Upload failed',
                    data: errorBody?.data || null,
                });
            }

            const success = await response.json();
            console.log('✅ Upload success:', success);
            return success;

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);

            console.error('❌ Network or unexpected error:', message);

            return rejectWithValue({
                message: 'Network or unexpected error',
                data: message,
            });
        }

    }
);


export const trainModel = createAsyncThunk<
    {
        message: string;
        test_accuracy: number;
        training_accuracy?: number;
    },
    void,
    {
        rejectValue: {
            code?: number;
            message: string;
            data?: unknown;
        };
    }
>(
    'weather/trainModel',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8084/admin/weather/train', {
                method: 'POST',
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);

                console.error('❌ Training failed:', {
                    code: response.status,
                    message: errorBody?.message || response.statusText,
                    data: errorBody?.data || errorBody,
                });

                return rejectWithValue({
                    code: response.status,
                    message: errorBody?.message || 'Training failed',
                    data: errorBody?.data || null,
                });
            }

            const resJson  = await response.json();
            console.log('✅ Training success:', resJson);
            return resJson.data;

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);

            console.error('❌ Network or unexpected error:', message);
            return rejectWithValue({
                message: 'Network or unexpected error',
                data: message,
            });
        }
    }
);

export const predict = createAsyncThunk<
    {
        location: string;
        forecast: {
            date: string;
            rain_predicted: boolean;
            confidence: number;
        }[];
    },
    string,
    {
        rejectValue: {
            code?: number;
            message: string;
            data?: unknown;
        }
    }
>(
    'weather/predict',
    async (location, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8084/admin/weather/predict?location=${encodeURIComponent(location)}`);

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);

                console.error('❌ Prediction failed:', {
                    code: response.status,
                    message: errorBody?.message || response.statusText,
                    data: errorBody?.data || errorBody,
                });

                return rejectWithValue({
                    code: response.status,
                    message: errorBody?.message || 'Prediction failed',
                    data: errorBody?.data || null,
                });
            }

            const resJson = await response.json();
            console.log('✅ Prediction success:', resJson);
            return resJson.data;

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);

            console.error('❌ Network or unexpected error:', message);
            return rejectWithValue({
                message: 'Network or unexpected error',
                data: message,
            });
        }
    }
);
