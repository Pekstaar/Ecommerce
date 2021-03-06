import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCard = ({ count }) => {
  const card = () => {
    let totalCards = [];

    for (let c = 0; c < count; c++) {
      //   add card to total cards
      totalCards.push(
        <Card key={c} className="col-md-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className="row mb-3">{card()}</div>;
};

export default LoadingCard;
