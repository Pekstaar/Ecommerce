import React, { useEffect, useState } from "react";
import Navigation from "../../../components/nav/TitleNavigation";
import AdminNav from "../../../components/nav/AdminNav";
import Axios from "axios";
import axios from "axios";
import Avatar from "antd/lib/avatar/avatar";
import FileUpload from "../../../components/forms/FileUpload";
import "./product.css";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { CreateForm } from "../../../components/forms/ProductCreateForm";
import { initialState } from "./data";
import { Badge } from "antd";

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleImageRemove = (public_id) => {
    //delete function
    setLoading(true);
    // console.log("remove image", id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        const { images } = values;

        let filtImages = images.filter((item) => {
          return item.public_id !== public_id;
        });

        setValues({ ...values, images: filtImages });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
          <Navigation heading="CREATE NEW PRODUCT :" loading={loading} />

          {/* create product form */}
          <div className="product_create__form_container bg-light mt-2">
            {/* {JSON.stringify(values.images)} */}

            {/* image upload form */}
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
