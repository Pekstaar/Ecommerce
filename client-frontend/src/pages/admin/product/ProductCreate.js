import React, { useEffect, useState } from "react";
import Navigation from "../../../components/forms/ProductNavigation";
import AdminNav from "../../../components/nav/AdminNav";
import Axios from "axios";
import "./product.css";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { CreateForm } from "../../../components/forms/ProductCreateForm";
import { initialState } from "./data";

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // loadBrands();
    loadCategories();
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const loadBrands = () => readBrands().then((c) => console.log(c));
  const fetch = async (e) => {
    const c = await Axios.get(`${process.env.REACT_APP_API}/product/brands`);
    setValues({ ...values, brands: c.data });
  };

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  //  setBrands(c.data)
  let loading = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        // NotificationManager.success(
        //   "Product created Sucessfully!",
        //   "Success",
        //   1000
        // );
        window.alert(`${res.data.title} created Successfully`);
        window.location.reload();
      })
      .catch((e) => {
        if (e.response.status === 400) {
          NotificationManager.error(e.response.data, 2000);
        }
      });
  };

  // cats.map((c) => console.log(c.name));
  // console.log("brands", brands);

  const handleChange = (e) => {
    //   handle input
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* side List nav */}
        <div className="col-md-2">
          <AdminNav prop={"product"} />
        </div>

        {/* main page display */}
        <div className="col-md-8 mt-4 " style={{ margin: "0 auto" }}>
          {/* Product create From */}

          {/* title display */}
          <Navigation loading={loading} />

          {/* create product form */}
          <div className="product_create__form_container bg-light mt-2">
            <CreateForm
              handleSubmit={handleSubmit}
              values={values}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              subOptions={subOptions}
              showSub={showSub}
              setValues={setValues}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
