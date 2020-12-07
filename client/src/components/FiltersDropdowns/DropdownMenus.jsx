import React from "react";
import styled from "styled-components";

export const DropdownMenus = ({ data, setValue, value }) => {
  const handleChange = (ev) => {
    console.log(ev.target.value);
    setValue(ev.target.value);
  };
  console.log("value", value);

  return (
    <List
      defaultValue={"none"}
      onChange={(ev) => {
        // console.log(ev);
        handleChange(ev);
      }}
    >
      {data.map((item) => {
        // console.log(item);
        return (
          <Items key={item.name} value={item.name}>
            {item.name}
          </Items>
        );
      })}
    </List>
  );
};

const List = styled.select``;
const Items = styled.option``;
