import { PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form style={{ padding: ".3em 3em" }} onSubmit={handleSubmit}>
    <div className="form-group form-inline">
      <strong className="mx-2" style={{ fontSize: "16px" }}>
        NAME:
      </strong>
      <Input
        style={{
          height: "3em",
          maxWidth: "40em",
          background: "#fff",
        }}
        type="text"
        placeholder="Input category name . . . to display button"
        className=""
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        required
      />

      <span></span>
      <Button
        style={{ height: "3em", borderRadius: " 0 5px 5px 0" }}
        type="primary"
        onClick={handleSubmit}
        disabled={name.length < 2}
      >
        <PlusOutlined
          style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
        />
      </Button>
    </div>
  </form>
);

export default CategoryForm;
