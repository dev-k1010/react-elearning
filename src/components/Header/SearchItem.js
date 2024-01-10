import { AudioOutlined } from "@ant-design/icons";
import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchItem = () => (
  <Search
    placeholder="input search text"
    allowClear
    onSearch={onSearch}
    style={{
      width: 200,
    }}
  />
);
export default SearchItem;
