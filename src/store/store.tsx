import { configureStore } from "@reduxjs/toolkit";

const index = configureStore({
    reducer: {

    },
});

export default index;

export { uploadWeatherData, trainModel, predict } from './thunks/weatherThunks';
export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;