import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [providers] = state.providersAPI.providers;

  const [provider, setProvider] = state.couponsAPI.provider;
  const [sort, setSort] = state.couponsAPI.sort;
  const [search, setSearch] = state.couponsAPI.search;

  const handleCategory = (e) => {
    setProvider(e.target.value);
    setSearch("");
  };

  return (
    <div className="container d-flex mb-4">
      <div className="filter_menu ">
        <div className="filter flex-item">
          <select
            className="form-control"
            name="category"
            value={provider}
            onChange={handleCategory}
          >
            <option value="">Tất cả các nhà cung cấp</option>
            {providers.map((provider) => (
              <option value={"provider=" + provider._id} key={provider._id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        <input
          className="flex-item form-control"
          type="search"
          value={search}
          placeholder=" Tìm kiếm"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        {/* <i className="fa fa-search"></i> */}

        <div className="sort flex-item">
          <select
            className="form-control"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Mới nhất</option>
            <option value="sort=oldest">Cũ nhất</option>
            <option value="sort=-price">Giá nhập: Giảm dần</option>
            <option value="sort=price">Giá nhập: Tăng dần</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
