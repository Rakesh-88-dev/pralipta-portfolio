import { useEffect, useState } from "react";
import { getPortfolio } from "../services/portfolioService";

function usePortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPortfolio = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPortfolio();

        if (!isMounted) return;

        setPortfolio(data?.data || data);
      } catch (err) {
        console.error("Failed to load portfolio:", err);

        if (!isMounted) return;

        setError(
          "Unable to load portfolio data. Please try again later."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    portfolio,
    loading,
    error,
  };
}

export default usePortfolio;