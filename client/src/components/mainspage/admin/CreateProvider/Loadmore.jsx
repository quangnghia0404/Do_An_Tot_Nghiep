import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

function Loadmore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.couponsAPI.page;
  const [result] = state.couponsAPI.result;

  return (
    <div>
      {result < page * 10 ? (
        ""
      ) : (
        <button
          className="btn btn-gradient container d-flex"
          onClick={() => setPage(page + 2)}
        >
          Xem thêm...
        </button>
      )}
    </div>
  );
}

export default Loadmore;
