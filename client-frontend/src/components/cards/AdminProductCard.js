import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import blank from "../images/blank-laptop.png";

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;

  return (
    <div>
      <Card
        hoverable
        className="mt-2"
        cover={
          <img
            src={images && images.length ? images[0].url : blank}
            alt=""
            style={{ height: 170, objectFit: "cover" }}
          />
        }
      >
        <Meta
          title={title}
          description={
            description.length >= 53
              ? `${description && description.substring(0, 53)} . . .`
              : description.length < 50
              ? `${description}\n . . .`
              : description
          }
        />
      </Card>
    </div>
  );
};

export default AdminProductCard;
