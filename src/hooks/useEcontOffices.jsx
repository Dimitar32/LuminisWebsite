import { useState, useEffect } from "react";
import { fetchEcontOffices } from "../api/api";

const useEcontOffices = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOffices = async () => {
      try {
        const data = await fetchEcontOffices();
        setOffices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOffices();
  }, []);

  return { offices, loading, error };
};

export default useEcontOffices;
