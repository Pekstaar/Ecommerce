import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
// import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;
const { Item } = Menu;

const AdminNav = (props) => {
  const [current, setCurrent] = useState("");

  const handleClick = (e) => {
    setCurrent(props.prop);
  };

  useEffect(() => {
    setCurrent(props.prop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <Sider width={200} className="mt-3 site-layout-background">
      <Menu
        mode="inline"
        // defaultSelectedKeys={""}
        style={{
          height: "100%",
          borderRight: 0,
          textAlign: "left",
          fontSize: "16px",
        }}
        onClick={handleClick}
        selectedKeys={current}
      >
        <Item key="dashboard">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Item>
        <Item key="product">
          <Link to="/admin/product">Product</Link>
        </Item>
        <Item key="products">
          <Link to="/admin/products">Products</Link>
        </Item>
        <Item key="category">
          <Link to="/admin/category">Category</Link>
        </Item>
        <Item key="sub">
          <Link to="/admin/sub">SubCategory</Link>
        </Item>
        <Item key="coupon">
          <Link to="/admin/coupon">Coupon</Link>
        </Item>
        <Item key="password">
          <Link to="/admin/password">Password Update</Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
