import { useState, useEffect } from "react";
import axios from "axios";

function CouponsAPI() {
  const [coupons, setCoupons] = useState([]);
  const [callback, setCallback] = useState(false);
  const [provider, setProvider] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getCoupons = async () => {
      const res = await axios.get(
        `/api/coupons?limit=${
          page * 12
        }&${provider}&${sort}&name_product[regex]=${search}`
      );
      setCoupons(res.data.coupons);
      setResult(res.data.result);
    };
    getCoupons();
  }, [callback, provider, sort, search, page]);

  return {
    coupons: [coupons, setCoupons],
    callback: [callback, setCallback],
    provider: [provider, setProvider],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default CouponsAPI;
