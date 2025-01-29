import { useCallback, useState } from 'react';
import { useAppDispatch } from './hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useThunk = (thunk: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .then(() => setIsLoading(false))
      .catch((error: string) => {
        setIsLoading(false);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  return [runThunk, isLoading, error, setError];
};

export default useThunk;
