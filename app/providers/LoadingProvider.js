'use client';

// context
import { LoadingContext } from '../context/LoadingContext';

// hooks
import { useState } from 'react';

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const loadingValue = { loading, setLoading };

  return (
    <LoadingContext.Provider value={loadingValue}>
      {children}
    </LoadingContext.Provider>
  );
}
