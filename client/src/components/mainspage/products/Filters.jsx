import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="container d-flex mb-4">
      <div className="filter_menu ">
        <div className="filter flex-item">
          <select
            className="form-control"
            name="category"
            value={category}
            onChange={handleCategory}
          >
            <option value="">Tất cả sản phẩm</option>
            {categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
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
            <option value="sort=-sold">Bán chạy nhất</option>
            <option value="sort=-price">Giá: Giảm dần</option>
            <option value="sort=price">Giá: Tăng dần</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
