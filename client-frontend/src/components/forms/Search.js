import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const Search = ({ setKeyword, keyword }) => {
  const handleSearch = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div>
      <input
        className="form-control px-2"
        placeholder="Filter Category"
        style={{ background: "#fff", width: "18em" }}
        onChange={handleSearch}
        value={keyword}
        type="search"
      />

      <Button type="primary" icon={<SearchOutlined />} />
    </div>
  );
};

export default Search;
