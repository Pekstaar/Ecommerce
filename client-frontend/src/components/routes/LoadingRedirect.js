import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const LoadingRedirect = () => {
  const [count, setCount] = useState(5);

  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((cnt) => --cnt);
    }, 1000);

    // redirection once count is equal to 0
    count === 0 && history.push("/");

    // clear inteval
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <div className="container text-center p-5">
      <strong>Redirecting you in {count} seconds</strong>
    </div>
  );
};

export default LoadingRedirect;
