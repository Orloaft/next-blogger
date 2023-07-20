import { useEffect, useRef } from "react";

function useDocumentRef() {
  const docRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Ensures this code will only run in a browser environment
    if (typeof window !== "undefined") {
      docRef.current = document.documentElement;
    }
  }, []);

  return docRef;
}

export default useDocumentRef;
