'use client';

// context
import { LoadingContext } from './context/LoadingContext';

// hooks
import { useState, useEffect } from 'react';

// components
import Loading from './loading';

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const loadingValue = { loading, setLoading };

  return (
    <LoadingContext.Provider value={loadingValue}>
      {children}
    </LoadingContext.Provider>
  );
}
