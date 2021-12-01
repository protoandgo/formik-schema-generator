import { Select, Typography } from "antd";
import React from "react";
import { GenericInputComponentProps } from "../utils/types";
import RedErrorBelow from "./RedErrorBelow";

interface SelectInputProps extends GenericInputComponentProps {
  options: { [value: string]: string };
};

const SelectInput = (props: SelectInputProps) => {
  // const [field, meta, label] = useField(props);
  const { field, meta } = props;
  const { name, label, options } = props;

  const ShowOptions = (options: { [value: string]: string }) => {
    const list = [];
    for (let [key, value] of Object.entries(options)) {
      list.push (
        <Select.Option key={key} value={key}>
          {value}
        </Select.Option>
      );
    }
    return list;
  };

  return (
    <React.Fragment>
      <label htmlFor={name}>
        <Typography>{label}</Typography>
      </label>
      <Select style={{ width: "100%" }} {...field}>
        {ShowOptions(options)}
      </Select>
      {/* <RedErrorBelow meta={meta} /> */}
    </React.Fragment>
  );
};

export default SelectInput;
