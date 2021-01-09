import axios from "axios";

// product create
export const createProduct = async (prod, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, prod, {
    headers: {
      authtoken,
    },
  });

//get products by list
export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

//get brands
export const readBrands = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product/brands`);

// delete product
export const remove = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
