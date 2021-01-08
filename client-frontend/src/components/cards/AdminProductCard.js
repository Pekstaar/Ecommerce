import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  return (
    <Card
      hoverable
      //   style={{ width: 240 }}
      cover={<img src={images && images.length ? images[0].url : ""} alt="" />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
