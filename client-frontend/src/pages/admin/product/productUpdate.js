import React, { useEffect, useState } from "react";
import Navigation from "../../../components/nav/TitleNavigation";
import AdminNav from "../../../components/nav/AdminNav";
import "./product.css";

import { initialState } from "./data";
import { getProduct } from "../../../functions/product";
import { ProductUpdateForm } from "../../../components/forms/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subsArray, setSubsArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Hello");

  useEffect(() => {
    loadProduct(slug);
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("Product Category", values.category);
    console.log("Categories", categories);
  }, []);

  const { slug } = match.params;
  // const { user } = useSelector((state) => ({ ...state }));

  // db Functions
  // getProduct
  const loadProduct = (slug) => {
    //populate values state
    getProduct(slug).then((r) => {
      setValues({ ...values, ...r.data });
      console.log("Values after product load", values);

      console.log("prodcut category", r.data.category);

      // get category subs
      getCategorySubs(r.data.category._id).then((s) => {
        setSubOptions(s.data);
      });

      // sub_Ids array preparations
      let sArray = [];
      r.data.subs.map((s) => {
        return sArray.push(s._id);
      });

      // console.log(sArray);
      // set subids array state
      setSubsArray(sArray);
    });
  };

  // load Categories
  const loadCategories = () => {
    getCategories().then((c) => {
      // console.log(c.data);
      setCategories(c.data);
    });
  };

  // handle Category change
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);

    setValues({ ...values, subs: [] });

    setSelectedCategory(values.category);

    getCategorySubs(e.target.value).then((res) => {
      console.log("Subs on category click", res);
      setSubOptions(res.data);
    });
    console.log("Selected existing category", values.category);

    // load categories back if user clicks the original product category
    if (values.category._id === e.target.value) {
      loadProduct();
      console.log("Product category on selected change: ", values.category);
    }

    //set previous array of selection to 0
    setSubsArray([]);
  };

  // handleChange
  const handleChange = (e) => {
    e.preventDefault();
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
          <Navigation heading="UPDATE PRODUCT :" loading={false} />

          {/* create product form */}
          <div className="product_create__form_container bg-light mt-2">
            {JSON.stringify(values)}
            <ProductUpdateForm
              handleSubmit={null}
              handleChange={handleChange}
              handleCategoryChange={handleCategoryChange}
              values={values}
              setValues={setValues}
              categories={categories}
              subOptions={subOptions}
              subsArray={subsArray}
              setSubsArray={setSubsArray}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
