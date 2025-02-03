import { useCallback, useState } from 'react';
import { useAppDispatch } from './hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useThunk = (thunk: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const runThunk = useCallback(
    // Accept optional arguments
    async (...args: any[]) => {
      setIsLoading(true);
      setError(null);
      try {
        await dispatch(thunk(...args)).unwrap();
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, thunk]);

  return [runThunk, isLoading, error, setError];
};

export default useThunk;
