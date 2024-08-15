import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import DutiesAPI from "./api/DutiesAPI";
import MembersAPI from "./api/MembersAPI";
import ProvidersAPI from "./api/ProvidersAPI";
import ContactsAPI from "./api/ContactsAPI";
import CouponsAPI from "./api/CouponsAPI";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    membersAPI: MembersAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
    dutiesAPI: DutiesAPI(),
    providersAPI: ProvidersAPI(),
    contactAPI: ContactsAPI(),
    couponsAPI: CouponsAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
