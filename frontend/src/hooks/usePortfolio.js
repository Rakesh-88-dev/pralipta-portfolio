import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { getPortfolio } from "../services/portfolioService";

const SOCKET_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") ||
  "http://localhost:5000";

const CACHE_KEY = "portfolio_cache";
const CACHE_TIME_KEY = "portfolio_cache_time";
const CACHE_DURATION = 5 * 60 * 1000;

function usePortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isMountedRef = useRef(true);
  const isFetchingRef = useRef(false);
  const portfolioRef = useRef(null);

  const loadPortfolio = useCallback(async (showLoading = false) => {
    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;

    try {
      if (showLoading) {
        setLoading(true);
      }

      setError("");

      const data = await getPortfolio();
      const freshPortfolio = data?.data || data;

      if (!isMountedRef.current) {
        return;
      }

      portfolioRef.current = freshPortfolio;
      setPortfolio(freshPortfolio);

      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify(freshPortfolio)
        );

        sessionStorage.setItem(
          CACHE_TIME_KEY,
          Date.now().toString()
        );
      } catch (storageError) {
        console.warn(
          "Unable to cache portfolio data:",
          storageError
        );
      }
    } catch (err) {
      console.error("Failed to load portfolio:", err);

      if (!isMountedRef.current) {
        return;
      }

      if (!portfolioRef.current) {
        setError(
          "Unable to load portfolio data. Please try again later."
        );
      }
    } finally {
      isFetchingRef.current = false;

      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    let hasValidCache = false;

    try {
      const cachedPortfolio = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

      if (cachedPortfolio && cachedTime) {
        const cacheAge = Date.now() - Number(cachedTime);

        if (cacheAge < CACHE_DURATION) {
          const parsedPortfolio = JSON.parse(cachedPortfolio);

          portfolioRef.current = parsedPortfolio;
          setPortfolio(parsedPortfolio);
          setLoading(false);

          hasValidCache = true;
        }
      }
    } catch (storageError) {
      console.warn(
        "Unable to read cached portfolio data:",
        storageError
      );
    }

    loadPortfolio(!hasValidCache);

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    const handlePortfolioUpdate = () => {
      loadPortfolio(false);
    };

    socket.on(
      "portfolio_updated",
      handlePortfolioUpdate
    );

    socket.on("connect_error", (socketError) => {
      console.warn(
        "Portfolio realtime connection failed:",
        socketError.message
      );
    });

    return () => {
      isMountedRef.current = false;

      socket.off(
        "portfolio_updated",
        handlePortfolioUpdate
      );

      socket.off("connect_error");

      socket.disconnect();
    };
  }, [loadPortfolio]);

  return {
    portfolio,
    loading,
    error,
  };
}

export default usePortfolio;