import { Button } from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import Search from "../../../components/forms/Search";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        NotificationManager.success(
          `${res.data.name} created successfully!`,
          "Success"
        );
        setName("");
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.status === 400)
          NotificationManager.error(err.response.data, "Error!", 2000);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete Category?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          NotificationManager.warning(
            `${res.data.name} Deleted successfully!`,
            "Complete"
          );
          setLoading(false);
          setName("");
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          if (err.status === 400) {
            NotificationManager.error(err.response.data);
          }
        });
    }
  };

  const searched = (k) => (c) => c.name.toLowerCase().includes(k);

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav prop="category" />
        </div>

        <div className="col-md-8 mt-4 " style={{ margin: "0 auto" }}>
          <nav
            className="navbar mb-1 bg-light form-inline"
            style={{ borderRadius: "10px 10px 0 0", width: "100%" }}
          >
            {loading ? (
              <h5
                className="navbar-brand "
                style={{ fontFamily: "Roboto", margin: "auto 0" }}
              >
                <strong className="text-warning">Loading...</strong>
              </h5>
            ) : (
              <h4
                className="navbar-brand"
                style={{ fontFamily: "Roboto", margin: "auto 0" }}
              >
                new-category
              </h4>
            )}

            <Search setKeyword={setKeyword} keyword={keyword} />
          </nav>
          <div className="bg-light p-2">
            {/* {categoryForm()} */}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            {/* reload buttton */}

            {categories.filter(searched(keyword)).map((c) => (
              <div
                className="alert alert-primary "
                style={{ fontSize: "16px", color: "#2f2f2f" }}
                key={c._id}
              >
                {c.name}{" "}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size={"medium"}
                  className="float-right mx-3"
                  onClick={() => handleRemove(c.slug)}
                  danger
                />
                <Link to={`/admin/category/${c.slug}`}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    size={"medium"}
                    className="float-right"
                    // onClick={handleClick}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
