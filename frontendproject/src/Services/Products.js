import axios from "axios";
import { API } from "../axios";

const URL =
  "https://frontend-api-dypw.onrender.com/api/146b2ece-1cf9-4b3a-adbe-d2f0c6cc37e5/site/products";

export const getSiteProducts = async (filters) => {
  const page = 1;
  const perPage = 40;
  const search = "";

  try {
    let res = await API.get(
      `/site/products?page=${page}&perPage=${perPage}&search=${search}`,
      { params: filters }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleProduct = async (_id) => {
  const res = await API.get(`site/products/${_id}`);
  console.log(res);
  return res;
};
