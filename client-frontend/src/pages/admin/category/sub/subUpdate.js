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
import { getSub, updateSub } from "../../../../functions/subCategory";
import CategoryForm from "../../../../components/forms/CategoryForm";
import AdminNav from "../../../../components/nav/AdminNav";

const SubCategory = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let selected;

  useEffect(() => {
    loadSubs();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  // subcategories loading function
  const loadSubs = () => {
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
  };

  // subcategory create function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (parent.trim() !== "") {
      setLoading(true);
      updateSub(match.params.slug, { name, parent }, user.token)
        .then((res) => {
          setLoading(false);
          setName("");
          NotificationManager.success(
            `${res.data.name} Updated successfully!`,
            "Success"
          );
          setName("");
          history.push("/admin/sub");
        })
        .catch((err) => {
          setLoading(false);
          if (err.status === 400)
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
                update Subcategory
              </h4>
            )}
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
              value={selected}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">. . . click to change parent</option>
              {categories.length > 0 &&
                categories.map((s) => (
                  <option value={s._id} key={s._id} selected={s._id === parent}>
                    {s.name}
                  </option>
                ))}
            </select>

            {/* input new subcategory */}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
