// CRUD OPERATIONS FOR CATEGORIES
import axios from "axios";

// get list of categories
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

//   get single category
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

// category deletion - must contain tiken since its protected
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

// category update - must contain token
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
