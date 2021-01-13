import React, { useEffect, useState } from "react";
import Navigation from "../../../components/nav/TitleNavigation";
import AdminNav from "../../../components/nav/AdminNav";
import "./product.css";

import { initialState } from "./data";
import { getProduct } from "../../../functions/product";
import { ProductUpdateForm } from "../../../components/forms/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import Avatar from "antd/lib/avatar/avatar";
import { Badge } from "antd";
import FileUpload from "../../../components/forms/FileUpload";
import { useSelector } from "react-redux";

const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subsArray, setSubsArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // console.log("Product Category", values.category);
    // console.log("Categories", categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { slug } = match.params;
  // const { user } = useSelector((state) => ({ ...state }));

  // db Functions
  // getProduct
  const loadProduct = () => {
    //populate values state

    getProduct(slug).then((r) => {
      setValues({ ...values, ...r.data });

      // get category subs
      getCategorySubs(r.data.category._id).then((s) => {
        setSubOptions(s.data);
      });

      // sub_Ids array preparations
      let sArray = [];
      // eslint-disable-next-line array-callback-return
      r.data.subs.map((s) => {
        sArray.push(s._id);
      });

      // console.log(sArray);
      // set subids array state
      setSubsArray(sArray);
    });
  };

  // load Categories
  const loadCategories = () => {
    getCategories().then((c) => {
      console.log("getCategories in Product update: ", c.data);
      setCategories(c.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // handle Category change
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);

    setValues({ ...values });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log("Subs on category click", res);
      setSubOptions(res.data);
    });
    console.log("Selected existing category", values.category);

    // load categories back if user clicks the original product category
    if (values.category._id === e.target.value) {
      loadProduct();
      // console.log("Product category on selected change: ", values.category);
    }

    //set previous array of selection to 0
    setSubsArray([]);
  };

  // handle remove image
  const handleImageRemove = () => {
    //  handle image remove
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
            <div className="border p-2 ">
              <div className="row pl-2 ">
                {values.images &&
                  values.images.map((image) => (
                    <Badge
                      key={image.public_id}
                      count={"x"}
                      className="ml-3 mb-2"
                      title="Delete?"
                      size="default"
                      style={{
                        background: "#F32013",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      onClick={() => handleImageRemove(image.public_id)}
                    >
                      <Avatar src={image.url} size={158} shape="square" />
                    </Badge>
                  ))}
              </div>
              <FileUpload
                user={user}
                setLoading={setLoading}
                values={values}
                setValues={setValues}
              />
            </div>

            {/* {JSON.stringify(values)} */}

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
