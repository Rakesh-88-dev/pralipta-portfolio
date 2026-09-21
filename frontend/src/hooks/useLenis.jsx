import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(target, {
      duration: 1.2,
      ...options,
    });
  }, []);

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const context = useContext(LenisContext);

  if (!context) {
    throw new Error("useLenis must be used inside LenisProvider");
  }

  return context;
}