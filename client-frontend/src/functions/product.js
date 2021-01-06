import axios from "axios";

// product create
export const createProduct = async (prod, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, prod, {
    headers: {
      authtoken,
    },
  });

export const readBrands = async () => {
  await axios.get(`${process.env.REACT_APP_API}/product/brands`);
};
