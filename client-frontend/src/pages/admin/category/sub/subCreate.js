// import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";
import {
  // createCategory,
  getCategories,
  // removeCategory,
} from "../../../../functions/category";
// import { Link } from "react-router-dom";
import {
  createSub,
  getSubs,
  removeSub,
} from "../../../../functions/subCategory";
import CategoryForm from "../../../../components/forms/CategoryForm";
import Search from "../../../../components/forms/Search";
import AdminNav from "../../../../components/nav/AdminNav";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Link } from "react-router-dom";

const SubCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSubs();
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  // subcategories loading function
  const loadSubs = () => {
    getSubs().then((c) => setSubs(c.data));
  };

  // subcategory create function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (category.trim() !== "") {
      setLoading(true);
      createSub({ name, parent: category }, user.token)
        .then((res) => {
          setLoading(false);
          setName("");
          NotificationManager.success(
            `${res.data.name} created successfully!`,
            "Success"
          );
          setName("");
          loadSubs();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400)
            NotificationManager.error(err.response.data, "Error!", 2000);
        });
    } else {
      NotificationManager.error(
        "Please select a parent Category",
        "SELECT PARENT!",
        2000
      );
    }
  };

  // delete function
  const handleRemove = async (slug) => {
    if (window.confirm("Delete Subcategory?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          NotificationManager.warning(
            `${res.data.name} Deleted successfully!`,
            "Complete"
          );
          setLoading(false);
          setName("");
          loadSubs();
        })
        .catch((err) => {
          setLoading(false);
          if (err.status === 400) {
            NotificationManager.error(err.data);
          }
        });
    }
  };

  // subcategory filter function
  const searched = (k) => (c) => c.name.toLowerCase().includes(k);

  return (
    <div className="container-fluid ">
      <div className="row ">
        {/* side navigation list */}
        <div className="col-md-2">
          <AdminNav prop="sub" />
        </div>

        {/* main page display */}
        <div className="col-md-8 mt-4 " style={{ margin: "0 auto" }}>
          {/* main navbar containing search and Title */}
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
                Sub-category
              </h4>
            )}

            <Search setKeyword={setKeyword} keyword={keyword} />
          </nav>
          {/* subnav containing create input and reload button */}
          <div className="bg-light p-2">
            {/* {categoryForm()} */}

            {/* parent category select */}
            <select
              className=" col-md-6 mb-3 mx-5 btn border "
              style={{
                background: "#fff",
                borderRadius: "0 12px 0 12px",
                margin: "10px 0",
              }}
              // value={secondCity}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">. . . click to Select Category</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            {/* reload buttton */}
            <Tooltip placement="top" title={"Reload list"}>
              <Button
                type="primary"
                shape="circle"
                icon={<ReloadOutlined />}
                size={"middle"}
                onClick={() => loadSubs()}
              />
            </Tooltip>

            {/* input new subcategory */}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {/* display filtered(according to search) list */}
            {subs.filter(searched(keyword)).map((sub) => (
              // map list of subcategories
              <div
                className="alert alert-primary "
                style={{ fontSize: "16px", color: "#2f2f2f" }}
                key={sub._id}
              >
                {sub.name}{" "}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size={"medium"}
                  className="float-right mx-3"
                  onClick={() => handleRemove(sub.slug)}
                  danger
                />
                <Link to={`/admin/sub/${sub.slug}`}>
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

export default SubCreate;
