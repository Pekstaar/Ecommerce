// CRUD OPERATIONS FOR CATEGORIES
import axios from "axios";

// get list of categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

//   get single category
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// category deletion - must contain tiken since its protected
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

// category update - must contain token
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });

//   get single category
export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
