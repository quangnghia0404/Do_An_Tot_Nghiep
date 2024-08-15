import { useState, useEffect } from "react";
import axios from "axios";

function ProvidersAPI() {
  const [providers, setProviders] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getProviders = async () => {
      const res = await axios.get("/api/providers");

      setProviders(res.data);
    };

    getProviders();
  }, [callback]);
  return {
    providers: [providers, setProviders],
    callback: [callback, setCallback],
  };
}

export default ProvidersAPI;
