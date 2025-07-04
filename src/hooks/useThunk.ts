// hooks/useThunk.ts
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import type {AsyncThunk} from '@reduxjs/toolkit';
import type {AppDispatch} from "../store/store.tsx";

/**
 * Turns an RTK thunk into `[run, isLoading, hasError]`.
 *
 * @example
 * const [doUpload, isUploading, isError] = useThunk(uploadWeatherData);
 */
export function useThunk<Arg, Returned, Rejected>(
    thunk: AsyncThunk<Returned, Arg, { rejectValue: Rejected }>
): [(arg: Arg) => Promise<Returned | undefined>, boolean, boolean] {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const run = useCallback(
        async (arg: Arg) => {
            setLoading(true);
            setError(false);
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                 // success payload
                return await dispatch(thunk(arg)).unwrap();
            } catch {
                setError(true);
                return undefined;
            } finally {
                setLoading(false);
            }
        },
        [dispatch, thunk]
    );

    return [run, loading, error];
}
