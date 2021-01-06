import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
// import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;
const { Item } = Menu;

const UserNav = (props) => {
  const [current, setCurrent] = useState("history");

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
        // defaultSelectedKeys={"history"}
        style={{
          height: "100%",
          borderRight: 0,
          textAlign: "left",
          fontSize: "16px",
        }}
        onClick={handleClick}
        selectedKeys={current}
      >
        <Item key="history">
          <Link to="/user/history">History</Link>
        </Item>
        <Item key="password">
          <Link to="/user/password">Password</Link>
        </Item>
        <Item key="wishlist">
          <Link to="/user/wishList">WishList</Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default UserNav;
